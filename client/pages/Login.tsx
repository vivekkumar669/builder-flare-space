import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Truck, 
  Leaf, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth, UserRole } from "@/contexts/AuthContext";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError("Please select your role (Farmer or Trucker)");
      return;
    }
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password, selectedRole);
      
      if (success) {
        // Navigate based on role
        if (selectedRole === 'farmer') {
          navigate('/farmer-dashboard');
        } else {
          navigate('/trucker-dashboard');
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agrimove-purple-light via-background to-agrimove-pink-light flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-agrimove-purple to-agrimove-pink rounded-xl flex items-center justify-center">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-agrimove-purple to-agrimove-pink bg-clip-text text-transparent">
              AgriMove
            </h1>
            <p className="text-muted-foreground mt-1">Smart Transport Network for Farmers</p>
          </div>
        </div>

        {/* Role Selection */}
        <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Choose Your Role</CardTitle>
            <CardDescription>Select whether you're a farmer or trucker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={selectedRole === 'farmer' ? 'default' : 'outline'}
                className={`h-20 flex-col gap-2 ${
                  selectedRole === 'farmer' 
                    ? 'bg-agrimove-green hover:bg-agrimove-green/90 text-white border-agrimove-green' 
                    : 'border-agrimove-green/30 hover:border-agrimove-green hover:bg-agrimove-green/10'
                }`}
                onClick={() => setSelectedRole('farmer')}
              >
                <Leaf className="w-6 h-6" />
                <span className="font-medium">Farmer</span>
              </Button>
              
              <Button
                variant={selectedRole === 'trucker' ? 'default' : 'outline'}
                className={`h-20 flex-col gap-2 ${
                  selectedRole === 'trucker' 
                    ? 'bg-agrimove-purple hover:bg-agrimove-purple/90 text-white border-agrimove-purple' 
                    : 'border-agrimove-purple/30 hover:border-agrimove-purple hover:bg-agrimove-purple/10'
                }`}
                onClick={() => setSelectedRole('trucker')}
              >
                <Truck className="w-6 h-6" />
                <span className="font-medium">Trucker</span>
              </Button>
            </div>
            
            {selectedRole && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-agrimove-green" />
                Selected: {selectedRole === 'farmer' ? 'Farmer' : 'Trucker'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-agrimove-purple to-agrimove-pink hover:from-agrimove-purple/90 hover:to-agrimove-pink/90 text-white"
                disabled={isLoading || !selectedRole}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Demo Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-agrimove-green text-agrimove-green">
                  Farmer
                </Badge>
                <span className="text-sm text-muted-foreground">farmer@test.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-agrimove-purple text-agrimove-purple">
                  Trucker
                </Badge>
                <span className="text-sm text-muted-foreground">trucker@test.com</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Password for both: <code className="bg-muted px-1 py-0.5 rounded">password</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
