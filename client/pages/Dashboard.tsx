import * as React from "react";
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
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Truck, label: "Transport", href: "/transport" },
  { icon: Route, label: "Routes", href: "/routes" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Users, label: "Farmers", href: "/farmers" },
  { icon: Package, label: "Shipments", href: "/shipments" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Dashboard() {
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
                <p className="text-xs text-muted-foreground">Smart Transport Network</p>
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
                    isActive={item.href === "/"}
                  >
                    <a href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-agrimove-purple/20 px-4 bg-background/95 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 flex-1">
              <h2 className="text-lg font-semibold">Dashboard Overview</h2>
              <Badge variant="secondary" className="bg-agrimove-purple/10 text-agrimove-purple border-agrimove-purple/20">
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-agrimove-purple text-white text-xs">AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Farmers</CardTitle>
                  <Users className="w-4 h-4 text-agrimove-purple" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-purple">2,847</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Trucks</CardTitle>
                  <Truck className="w-4 h-4 text-agrimove-pink" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-pink">1,243</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    +8.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                  <IndianRupee className="w-4 h-4 text-agrimove-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-green">₹1.25L</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-agrimove-green" />
                    +25.4% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Delivery Time</CardTitle>
                  <Clock className="w-4 h-4 text-agrimove-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-agrimove-yellow">4.2h</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-agrimove-green" />
                    -15.3% faster delivery
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Impact Metrics Chart */}
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-agrimove-purple" />
                    Impact Metrics
                  </CardTitle>
                  <CardDescription>
                    Progress towards our improvement targets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                        <Bar dataKey="value" fill="hsl(var(--agrimove-purple))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="hsl(var(--agrimove-pink))" radius={[4, 4, 0, 0]} opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Monthly Growth */}
              <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-agrimove-green" />
                    Monthly Growth
                  </CardTitle>
                  <CardDescription>
                    Farmers, trips, and revenue trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="month" 
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
                        <Line 
                          type="monotone" 
                          dataKey="farmers" 
                          stroke="hsl(var(--agrimove-purple))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--agrimove-purple))", strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="trips" 
                          stroke="hsl(var(--agrimove-pink))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--agrimove-pink))", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Regional Distribution */}
            <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-agrimove-purple" />
                  Regional Distribution of Farmers
                </CardTitle>
                <CardDescription>
                  Farmer registration by state
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="farmers"
                          label={({ region, farmers }) => `${region}: ${farmers}`}
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--background))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <div key={region.region} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: region.color }}
                          />
                          <span className="font-medium">{region.region}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{region.farmers}</div>
                          <div className="text-xs text-muted-foreground">farmers</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-agrimove-purple" />
                  Recent Transport Activities
                </CardTitle>
                <CardDescription>
                  Latest transport requests and completions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { farmer: "Rajesh Kumar", crop: "Wheat", from: "Ludhiana", to: "Delhi", status: "Delivered", time: "2 hours ago" },
                    { farmer: "Sunita Devi", crop: "Rice", from: "Karnal", to: "Chandigarh", status: "In Transit", time: "4 hours ago" },
                    { farmer: "Mukesh Singh", crop: "Vegetables", from: "Hisar", to: "Gurgaon", status: "Picked Up", time: "6 hours ago" },
                    { farmer: "Priya Sharma", crop: "Fruits", from: "Amritsar", to: "Jalandhar", status: "Requested", time: "8 hours ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-agrimove-purple/10">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-agrimove-purple/20 text-agrimove-purple text-xs">
                            {activity.farmer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{activity.farmer}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.crop} • {activity.from} → {activity.to}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={
                            activity.status === "Delivered" ? "default" :
                            activity.status === "In Transit" ? "secondary" :
                            activity.status === "Picked Up" ? "outline" :
                            "destructive"
                          }
                          className="mb-1"
                        >
                          {activity.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
