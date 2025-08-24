import * as React from "react";
import { useState } from "react";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Truck,
  MapPin,
  Clock,
  IndianRupee,
  Package,
  Leaf,
  Activity,
  Settings,
  Home,
  Route,
  BarChart2,
  Bell,
  MessageSquare,
  LogOut,
  Mail,
  X,
  Plus,
  Send,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Sample data for charts
const impactData = [
  { metric: "Cost Reduction", value: 25, target: 30, color: "hsl(var(--agrimove-green))" },
  { metric: "Spoilage Reduction", value: 38, target: 40, color: "hsl(var(--agrimove-purple))" },
  { metric: "Delivery Speed", value: 22, target: 25, color: "hsl(var(--agrimove-pink))" },
  { metric: "Truck Utilization", value: 75, target: 85, color: "hsl(var(--agrimove-yellow))" }
];

const monthlyData = [
  { month: "Jan", farmers: 120, trips: 480, revenue: 45000 },
  { month: "Feb", farmers: 145, trips: 580, revenue: 52000 },
  { month: "Mar", farmers: 180, trips: 720, revenue: 68000 },
  { month: "Apr", farmers: 220, trips: 880, revenue: 78000 },
  { month: "May", farmers: 280, trips: 1120, revenue: 95000 },
  { month: "Jun", farmers: 350, trips: 1400, revenue: 125000 }
];

const regionData = [
  { region: "Punjab", farmers: 450, color: "hsl(var(--agrimove-purple))" },
  { region: "Haryana", farmers: 380, color: "hsl(var(--agrimove-pink))" },
  { region: "UP", farmers: 320, color: "hsl(var(--agrimove-green))" },
  { region: "Rajasthan", farmers: 280, color: "hsl(var(--agrimove-yellow))" },
  { region: "Gujarat", farmers: 220, color: "hsl(var(--agrimove-purple-light))" }
];

const chartConfig = {
  farmers: {
    label: "Farmers",
    color: "hsl(var(--agrimove-purple))",
  },
  trips: {
    label: "Trips",
    color: "hsl(var(--agrimove-pink))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--agrimove-green))",
  },
} satisfies ChartConfig;

export default function FarmerDashboard() {
  const { user, logout, messages, markMessageAsRead, farmerRequests } = useAuth();
  const navigate = useNavigate();
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  const unreadMessages = messages.filter(msg => !msg.read && msg.to === user?.id);
  const myRequests = farmerRequests.filter(req => req.farmerId === user?.id);
  const pendingRequests = myRequests.filter(req => req.status === 'pending');
  const completedRequests = myRequests.filter(req => req.status === 'delivered');
  const recentRequests = myRequests.slice(0, 3); // Show latest 3 requests

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/farmer-dashboard" },
    { icon: Truck, label: "My Requests", href: "/farmer-requests" },
    { icon: Route, label: "Track Shipments", href: "/track-shipments" },
    { icon: BarChart2, label: "Analytics", href: "/farmer-analytics" },
    { icon: MessageSquare, label: "Inbox", action: () => setIsInboxOpen(true) },
    { icon: Settings, label: "Settings", href: "/farmer-settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-agrimove-purple-light via-background to-agrimove-pink-light">
        <Sidebar variant="inset" className="border-r border-agrimove-purple/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarHeader className="border-b border-agrimove-purple/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-agrimove-purple to-agrimove-pink rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-agrimove-purple to-agrimove-pink bg-clip-text text-transparent">
                  AgriMove
                </h1>
                <p className="text-xs text-muted-foreground">Farmer Dashboard</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    asChild={!item.action}
                    className="w-full justify-start gap-3 hover:bg-agrimove-purple/10 data-[active=true]:bg-agrimove-purple/20 data-[active=true]:text-agrimove-purple relative"
                    isActive={item.href === "/farmer-dashboard"}
                    onClick={item.action}
                  >
                    {item.action ? (
                      <div className="flex items-center gap-3 cursor-pointer">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.label === "Inbox" && unreadMessages.length > 0 && (
                          <Badge className="ml-auto bg-agrimove-pink text-white">
                            {unreadMessages.length}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <a href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    )}
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
              <h2 className="text-lg font-semibold">Farmer Dashboard</h2>
              <Badge variant="secondary" className="bg-agrimove-green/10 text-agrimove-green border-agrimove-green/20">
                Welcome, {user?.name}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setIsInboxOpen(true)}
              >
                <Mail className="w-4 h-4" />
                {unreadMessages.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-agrimove-pink text-white text-xs flex items-center justify-center">
                    {unreadMessages.length}
                  </Badge>
                )}
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-agrimove-green text-white text-xs">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'F'}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">My Requests</CardTitle>
                  <Package className="w-4 h-4 text-agrimove-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-purple">12</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    3 active requests
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Trips</CardTitle>
                  <Truck className="w-4 h-4 text-agrimove-pink" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-pink">47</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    +15% this month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Cost Saved</CardTitle>
                  <IndianRupee className="w-4 h-4 text-agrimove-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-green">₹28,450</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    25% cost reduction
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Delivery Time</CardTitle>
                  <Clock className="w-4 h-4 text-agrimove-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-yellow">3.8h</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-agrimove-green" />
                    20% faster delivery
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section - Same as before but smaller */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-agrimove-purple" />
                    My Transport Analytics
                  </CardTitle>
                  <CardDescription>
                    Your farming transport efficiency metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData.slice(0, 3)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="metric" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--background))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="value" fill="hsl(var(--agrimove-green))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-agrimove-pink" />
                    Recent Messages
                  </CardTitle>
                  <CardDescription>
                    Latest notifications from truckers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 h-[250px] overflow-y-auto">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No messages yet</p>
                        </div>
                      </div>
                    ) : (
                      messages.slice(0, 3).map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg border ${
                            message.read 
                              ? 'bg-muted/30 border-border' 
                              : 'bg-agrimove-purple/5 border-agrimove-purple/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              From {message.fromRole}
                            </Badge>
                            {!message.read && (
                              <Badge className="bg-agrimove-pink text-white text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm">{message.content}</p>
                          {message.ratePerKm && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Rate: ₹{message.ratePerKm}/km • ETA: {message.estimatedTime}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Inbox Dialog */}
      <Dialog open={isInboxOpen} onOpenChange={setIsInboxOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Inbox
            </DialogTitle>
            <DialogDescription>
              Messages from truckers and transport updates
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No messages in your inbox</p>
              </div>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    message.read 
                      ? 'bg-muted/30 border-border hover:bg-muted/50' 
                      : 'bg-agrimove-purple/5 border-agrimove-purple/20 hover:bg-agrimove-purple/10'
                  }`}
                  onClick={() => markMessageAsRead(message.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        From {message.fromRole}
                      </Badge>
                      {!message.read && (
                        <Badge className="bg-agrimove-pink text-white">New</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{message.content}</p>
                  {message.ratePerKm && (
                    <div className="flex items-center gap-4 text-sm bg-agrimove-green/10 p-2 rounded">
                      <span className="font-medium text-agrimove-green">
                        Rate: ₹{message.ratePerKm}/km
                      </span>
                      <span className="font-medium text-agrimove-purple">
                        ETA: {message.estimatedTime}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
