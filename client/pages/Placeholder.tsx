import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  Construction,
  ArrowLeft,
  Truck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1) || "page";
  const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agrimove-purple-light via-background to-agrimove-pink-light flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-agrimove-purple/20 bg-background/90 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-agrimove-purple to-agrimove-pink rounded-full flex items-center justify-center mb-4">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-agrimove-purple to-agrimove-pink bg-clip-text text-transparent">
            {capitalizedPageName} Page - Coming Soon
          </CardTitle>
          <CardDescription className="text-base mt-2">
            This page is part of the AgriMove smart transport network platform and is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3 p-6 bg-agrimove-purple/5 rounded-lg border border-agrimove-purple/20">
            <Construction className="w-6 h-6 text-agrimove-purple" />
            <div className="text-center">
              <p className="font-medium text-agrimove-purple">Under Construction</p>
              <p className="text-sm text-muted-foreground">
                This feature will help farmers and transporters optimize their logistics operations.
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Continue exploring the AgriMove platform to see our main dashboard with live metrics, 
              charts, and transport analytics that help optimize agricultural logistics.
            </p>
            
            <Button
              asChild
              className="bg-gradient-to-r from-agrimove-purple to-agrimove-pink hover:from-agrimove-purple/90 hover:to-agrimove-pink/90 text-white"
            >
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
