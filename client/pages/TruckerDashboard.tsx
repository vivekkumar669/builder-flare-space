import * as React from "react";
import { useState } from "react";
import { 
  Truck, 
  MapPin, 
  Clock, 
  Weight,
  Package,
  Settings,
  Home,
  Route,
  BarChart2,
  LogOut,
  Check,
  X,
  User,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TruckerDashboard() {
  const { user, logout, farmerRequests, acceptRequest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [ratePerKm, setRatePerKm] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);

  const pendingRequests = farmerRequests.filter(req => req.status === 'pending');
  const myAcceptedRequests = farmerRequests.filter(req => req.acceptedBy === user?.id);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/trucker-dashboard" },
    { icon: Package, label: "Available Requests", href: "/trucker-requests" },
    { icon: Truck, label: "My Trips", href: "/trucker-trips" },
    { icon: Route, label: "Route Optimizer", href: "/route-optimizer" },
    { icon: BarChart2, label: "Earnings", href: "/trucker-earnings" },
    { icon: Settings, label: "Settings", href: "/trucker-settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAcceptRequest = (requestId: string) => {
    setSelectedRequest(requestId);
    setIsAcceptDialogOpen(true);
  };

  const confirmAcceptRequest = () => {
    if (selectedRequest && ratePerKm && estimatedTime && user) {
      acceptRequest(selectedRequest, user.id, user.name, parseFloat(ratePerKm), estimatedTime);
      setIsAcceptDialogOpen(false);
      setRatePerKm("");
      setEstimatedTime("");
      setSelectedRequest(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-agrimove-purple-light via-background to-agrimove-pink-light">
        <Sidebar variant="inset" className="border-r border-agrimove-purple/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarHeader className="border-b border-agrimove-purple/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-agrimove-purple to-agrimove-pink rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-agrimove-purple to-agrimove-pink bg-clip-text text-transparent">
                  AgriMove
                </h1>
                <p className="text-xs text-muted-foreground">Trucker Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start gap-3 hover:bg-agrimove-purple/10 data-[active=true]:bg-agrimove-purple/20 data-[active=true]:text-agrimove-purple"
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full justify-start gap-3 hover:bg-red-50 text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-agrimove-purple/20 px-4 bg-background/95 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 flex-1">
              <h2 className="text-lg font-semibold">Trucker Dashboard</h2>
              <Badge variant="secondary" className="bg-agrimove-purple/10 text-agrimove-purple border-agrimove-purple/20">
                Welcome, {user?.name}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-agrimove-purple text-white text-xs">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Available Requests</CardTitle>
                  <Package className="w-4 h-4 text-agrimove-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-yellow">{pendingRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Waiting for acceptance</p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">My Accepted Trips</CardTitle>
                  <Truck className="w-4 h-4 text-agrimove-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-purple">{myAcceptedRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Active commitments</p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Potential Earnings</CardTitle>
                  <Package className="w-4 h-4 text-agrimove-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-green">₹15,240</div>
                  <p className="text-xs text-muted-foreground">From available requests</p>
                </CardContent>
              </Card>
            </div>

            {/* Available Farmer Requests */}
            <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-agrimove-purple" />
                  Available Farmer Requests
                </CardTitle>
                <CardDescription>
                  Transport requests from farmers waiting for truckers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No requests available</p>
                    <p>Check back later for new transport requests from farmers</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {pendingRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className="border border-agrimove-purple/20 rounded-lg p-6 bg-background/50 hover:bg-background/80 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            {/* Farmer Info */}
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-agrimove-green text-white">
                                  {request.farmerName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.farmerName}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  Farmer
                                </p>
                              </div>
                            </div>

                            {/* Request Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Cargo Type</Label>
                                <div className="flex items-center gap-2">
                                  <Package className="w-4 h-4 text-agrimove-purple" />
                                  <span className="font-medium">{request.cargoType}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Weight</Label>
                                <div className="flex items-center gap-2">
                                  <Weight className="w-4 h-4 text-agrimove-pink" />
                                  <span className="font-medium">{request.weight} kg</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Posted</Label>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-agrimove-yellow" />
                                  <span className="font-medium">
                                    {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                                      Math.floor((request.createdAt.getTime() - Date.now()) / (1000 * 60 * 60)),
                                      'hours'
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Status</Label>
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                            </div>

                            {/* Route Info */}
                            <div className="bg-agrimove-purple/5 p-4 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Label className="text-xs text-muted-foreground">Pickup Point</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-4 h-4 text-agrimove-green" />
                                    <span className="font-medium">{request.pickupPoint}</span>
                                  </div>
                                </div>
                                
                                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                
                                <div className="flex-1">
                                  <Label className="text-xs text-muted-foreground">Destination</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-4 h-4 text-agrimove-pink" />
                                    <span className="font-medium">{request.destination}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="bg-agrimove-green hover:bg-agrimove-green/90 text-white"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Accepted Requests */}
            {myAcceptedRequests.length > 0 && (
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-agrimove-purple" />
                    My Accepted Requests
                  </CardTitle>
                  <CardDescription>
                    Transport requests you have committed to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {myAcceptedRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className="border border-agrimove-green/20 rounded-lg p-4 bg-agrimove-green/5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{request.farmerName} - {request.cargoType}</h4>
                            <p className="text-sm text-muted-foreground">
                              {request.pickupPoint} → {request.destination} • {request.weight} kg
                            </p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </SidebarInset>
      </div>

      {/* Accept Request Dialog */}
      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Accept Transport Request</DialogTitle>
            <DialogDescription>
              Set your rate and estimated delivery time for this request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Rate per Kilometer (₹)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="e.g. 15"
                value={ratePerKm}
                onChange={(e) => setRatePerKm(e.target.value)}
                className="border-agrimove-purple/20 focus:border-agrimove-purple"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Estimated Time to Reach</Label>
              <Input
                id="time"
                placeholder="e.g. 2 hours, 45 minutes"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="border-agrimove-purple/20 focus:border-agrimove-purple"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAcceptDialogOpen(false)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={confirmAcceptRequest}
                disabled={!ratePerKm || !estimatedTime}
                className="flex-1 bg-agrimove-green hover:bg-agrimove-green/90 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm Accept
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
