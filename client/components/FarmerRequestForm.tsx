import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Package, 
  MapPin, 
  Weight, 
  User, 
  Phone, 
  Navigation,
  Calendar,
  Send,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

interface FarmerRequestFormData {
  // Personal Information
  farmerName: string;
  phone: string;
  location: string;
  
  // Product Information
  cargoType: string;
  weight: number;
  pickupPoint: string;
  destination: string;
  pickupDate: string;
  additionalNotes?: string;
}

interface FarmerRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const cargoTypes = [
  "Wheat", "Rice", "Corn", "Barley", "Vegetables", "Fruits", 
  "Cotton", "Sugarcane", "Pulses", "Oilseeds", "Other"
];

export default function FarmerRequestForm({ onSuccess, onCancel }: FarmerRequestFormProps) {
  const { user, addFarmerRequest } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FarmerRequestFormData>({
    defaultValues: {
      farmerName: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      pickupDate: new Date().toISOString().split('T')[0] // Today's date
    }
  });

  const selectedCargoType = watch("cargoType");

  const onSubmit = async (data: FarmerRequestFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Create the farmer request
      const requestData = {
        farmerId: user.id,
        farmerName: data.farmerName,
        cargoType: data.cargoType,
        weight: data.weight,
        pickupPoint: data.pickupPoint,
        destination: data.destination,
      };

      addFarmerRequest(requestData);

      setSubmitMessage({
        type: 'success',
        text: 'Transport request submitted successfully! Truckers will receive your request and can contact you with quotes.'
      });

      // Reset form after successful submission
      reset();
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess?.();
      }, 2000);

    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-agrimove-purple/20 bg-background/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Send className="w-5 h-5 text-agrimove-purple" />
            Submit Transport Request
          </CardTitle>
          <CardDescription>
            Fill out your information and product details to request transport services from available truckers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-agrimove-purple/20">
                <User className="w-4 h-4 text-agrimove-purple" />
                <h3 className="font-semibold text-agrimove-purple">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmerName">Full Name *</Label>
                  <Input
                    id="farmerName"
                    {...register("farmerName", { required: "Name is required" })}
                    placeholder="Enter your full name"
                    className="border-agrimove-purple/20 focus:border-agrimove-purple"
                  />
                  {errors.farmerName && (
                    <p className="text-sm text-red-500">{errors.farmerName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[\d\s\-()]+$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      placeholder="+91 98765 43210"
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Your Location *</Label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      {...register("location", { required: "Location is required" })}
                      placeholder="City, State"
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-agrimove-purple/20">
                <Package className="w-4 h-4 text-agrimove-purple" />
                <h3 className="font-semibold text-agrimove-purple">Product Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Type of Cargo *</Label>
                  <Select onValueChange={(value) => setValue("cargoType", value)}>
                    <SelectTrigger className="border-agrimove-purple/20 focus:border-agrimove-purple">
                      <SelectValue placeholder="Select cargo type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargoTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.cargoType && (
                    <p className="text-sm text-red-500">Please select a cargo type</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="number"
                      {...register("weight", { 
                        required: "Weight is required",
                        min: { value: 1, message: "Weight must be at least 1 kg" },
                        max: { value: 50000, message: "Weight cannot exceed 50,000 kg" }
                      })}
                      placeholder="Enter weight in kg"
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.weight && (
                    <p className="text-sm text-red-500">{errors.weight.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupPoint">Pickup Point *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-agrimove-green" />
                    <Input
                      id="pickupPoint"
                      {...register("pickupPoint", { required: "Pickup point is required" })}
                      placeholder="Farm location or pickup address"
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.pickupPoint && (
                    <p className="text-sm text-red-500">{errors.pickupPoint.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-agrimove-pink" />
                    <Input
                      id="destination"
                      {...register("destination", { required: "Destination is required" })}
                      placeholder="Market, warehouse, or delivery address"
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.destination && (
                    <p className="text-sm text-red-500">{errors.destination.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Preferred Pickup Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="pickupDate"
                      type="date"
                      {...register("pickupDate", { required: "Pickup date is required" })}
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 border-agrimove-purple/20 focus:border-agrimove-purple"
                    />
                  </div>
                  {errors.pickupDate && (
                    <p className="text-sm text-red-500">{errors.pickupDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    {...register("additionalNotes")}
                    placeholder="Special handling requirements, time constraints, etc."
                    className="border-agrimove-purple/20 focus:border-agrimove-purple"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <Alert className={`${
                submitMessage.type === 'success' 
                  ? 'border-agrimove-green/20 bg-agrimove-green/10' 
                  : 'border-red-200 bg-red-50'
              }`}>
                <AlertDescription className={
                  submitMessage.type === 'success' 
                    ? 'text-agrimove-green' 
                    : 'text-red-600'
                }>
                  {submitMessage.text}
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-agrimove-purple to-agrimove-pink hover:from-agrimove-purple/90 hover:to-agrimove-pink/90 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Transport Request
                  </>
                )}
              </Button>
              
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-agrimove-purple/20 hover:bg-agrimove-purple/5"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="border-agrimove-green/20 bg-agrimove-green/5">
        <CardContent className="pt-6">
          <div className="text-sm text-agrimove-green space-y-2">
            <p className="font-medium">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Your request will be visible to available truckers in your area</li>
              <li>Truckers will review your requirements and send quotes</li>
              <li>You'll receive messages in your inbox with rate and time estimates</li>
              <li>Choose the best offer and confirm your transport booking</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
