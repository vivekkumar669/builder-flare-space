import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'farmer' | 'trucker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
}

export interface Message {
  id: string;
  from: string;
  fromRole: UserRole;
  to: string;
  toRole: UserRole;
  content: string;
  timestamp: Date;
  requestId?: string;
  ratePerKm?: number;
  estimatedTime?: string;
  read: boolean;
}

export interface FarmerRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  cargoType: string;
  weight: number;
  pickupPoint: string;
  destination: string;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered';
  acceptedBy?: string;
  truckerName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (messageId: string) => void;
  farmerRequests: FarmerRequest[];
  addFarmerRequest: (request: Omit<FarmerRequest, 'id' | 'createdAt' | 'status'>) => void;
  acceptRequest: (requestId: string, truckerId: string, truckerName: string, ratePerKm: number, estimatedTime: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: 'farmer1',
    name: 'Rajesh Kumar',
    email: 'farmer@test.com',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Ludhiana, Punjab'
  },
  {
    id: 'trucker1',
    name: 'Vikram Singh',
    email: 'trucker@test.com',
    role: 'trucker',
    phone: '+91 87654 32109',
    location: 'Delhi'
  }
];

// Mock farmer requests
const mockRequests: FarmerRequest[] = [
  {
    id: 'req1',
    farmerId: 'farmer1',
    farmerName: 'Rajesh Kumar',
    cargoType: 'Wheat',
    weight: 2500,
    pickupPoint: 'Ludhiana, Punjab',
    destination: 'Delhi Mandi',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'pending'
  },
  {
    id: 'req2',
    farmerId: 'farmer2',
    farmerName: 'Sunita Devi',
    cargoType: 'Rice',
    weight: 1800,
    pickupPoint: 'Karnal, Haryana',
    destination: 'Chandigarh Market',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: 'pending'
  },
  {
    id: 'req3',
    farmerId: 'farmer3',
    farmerName: 'Mukesh Singh',
    cargoType: 'Vegetables',
    weight: 800,
    pickupPoint: 'Hisar, Haryana',
    destination: 'Gurgaon Market',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'pending'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [farmerRequests, setFarmerRequests] = useState<FarmerRequest[]>(mockRequests);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setMessages([]);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const addFarmerRequest = (request: Omit<FarmerRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: FarmerRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending'
    };
    setFarmerRequests(prev => [...prev, newRequest]);
  };

  const acceptRequest = (requestId: string, truckerId: string, truckerName: string, ratePerKm: number, estimatedTime: string) => {
    // Update request status
    setFarmerRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' as const, acceptedBy: truckerId, truckerName }
          : req
      )
    );

    // Find the request to get farmer details
    const request = farmerRequests.find(req => req.id === requestId);
    if (request) {
      // Send message to farmer
      addMessage({
        from: truckerId,
        fromRole: 'trucker',
        to: request.farmerId,
        toRole: 'farmer',
        content: `Your transport request for ${request.cargoType} (${request.weight}kg) from ${request.pickupPoint} to ${request.destination} has been accepted!`,
        requestId,
        ratePerKm,
        estimatedTime,
        read: false
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      messages,
      addMessage,
      markMessageAsRead,
      farmerRequests,
      addFarmerRequest,
      acceptRequest
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
