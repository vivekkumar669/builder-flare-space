import * as React from "react";
import { useState } from "react";
import { 
  Package, 
  Plus, 
  List, 
  MapPin, 
  Weight, 
  Calendar, 
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  ArrowRight,
  User
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import FarmerRequestForm from "@/components/FarmerRequestForm";

export default function FarmerRequests() {
  const { user, farmerRequests } = useAuth();
  const [activeTab, setActiveTab] = useState("my-requests");

  // Filter requests for current farmer
  const myRequests = farmerRequests.filter(req => req.farmerId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agrimove-purple-light via-background to-agrimove-pink-light p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-agrimove-purple to-agrimove-pink rounded-xl flex items-center justify-center">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-agrimove-purple to-agrimove-pink bg-clip-text text-transparent">
              My Transport Requests
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your transport requests and submit new ones
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="my-requests" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              My Requests ({myRequests.length})
            </TabsTrigger>
            <TabsTrigger value="submit-new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit New Request
            </TabsTrigger>
          </TabsList>

          {/* My Requests Tab */}
          <TabsContent value="my-requests" className="space-y-6">
            {myRequests.length === 0 ? (
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Transport Requests Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't submitted any transport requests. Click "Submit New Request" to get started.
                  </p>
                  <Button 
                    onClick={() => setActiveTab("submit-new")}
                    className="bg-gradient-to-r from-agrimove-purple to-agrimove-pink hover:from-agrimove-purple/90 hover:to-agrimove-pink/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <Card key={request.id} className="border-agrimove-purple/20 bg-background/90 backdrop-blur hover:bg-background/95 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          {/* Header with Status */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-agrimove-green to-agrimove-green/80 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{request.cargoType}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Request ID: {request.id.slice(-8).toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(request.status)} flex items-center gap-1`}>
                              {getStatusIcon(request.status)}
                              {request.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>

                          {/* Request Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Weight className="w-4 h-4" />
                                Weight
                              </div>
                              <p className="font-medium">{request.weight} kg</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                Submitted
                              </div>
                              <p className="font-medium">{formatTimeAgo(request.createdAt)}</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                Date
                              </div>
                              <p className="font-medium">{formatDate(request.createdAt)}</p>
                            </div>
                          </div>

                          {/* Route Information */}
                          <div className="bg-agrimove-purple/5 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                  <MapPin className="w-4 h-4 text-agrimove-green" />
                                  Pickup Point
                                </div>
                                <p className="font-medium">{request.pickupPoint}</p>
                              </div>
                              
                              <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                  <MapPin className="w-4 h-4 text-agrimove-pink" />
                                  Destination
                                </div>
                                <p className="font-medium">{request.destination}</p>
                              </div>
                            </div>
                          </div>

                          {/* Trucker Information (if accepted) */}
                          {request.status === 'accepted' && request.truckerName && (
                            <div className="bg-agrimove-green/5 p-4 rounded-lg border border-agrimove-green/20">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarFallback className="bg-agrimove-purple text-white">
                                    {request.truckerName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-agrimove-green">Accepted by {request.truckerName}</p>
                                  <p className="text-sm text-muted-foreground">Your request has been accepted by a trucker</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Submit New Request Tab */}
          <TabsContent value="submit-new">
            <FarmerRequestForm 
              onSuccess={() => {
                // Switch back to My Requests tab after successful submission
                setActiveTab("my-requests");
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Quick Actions Card */}
        <Card className="border-agrimove-green/20 bg-agrimove-green/5">
          <CardHeader>
            <CardTitle className="text-lg text-agrimove-green">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              • Your requests are visible to all verified truckers in your area
            </p>
            <p className="text-muted-foreground">
              • Truckers will send quotes directly to your inbox with rates and timing
            </p>
            <p className="text-muted-foreground">
              • You can track your shipment status in real-time once accepted
            </p>
            <p className="text-muted-foreground">
              • Contact support if you need to modify or cancel a request
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
