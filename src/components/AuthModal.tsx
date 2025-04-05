import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AtSign, AlertCircle, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({ isOpen = false, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError("");
    setSuccess("");
    setIsVerifying(false);
  };

  const validateEmail = (email: string) => {
    return email.endsWith("@uwaterloo.ca");
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please use a valid @uwaterloo.ca email address");
      return;
    }

    // Mock successful sign-in
    setSuccess("Successfully signed in!");

    // In a real app, you would handle authentication here
    // For now, we'll just close the modal after a delay
    setTimeout(() => {
      if (onOpenChange) onOpenChange(false);
    }, 1500);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please use a valid @uwaterloo.ca email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Mock successful sign-up
    setIsVerifying(true);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please use a valid @uwaterloo.ca email address");
      return;
    }

    setSuccess("Password reset link sent to your email!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 bg-background">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold text-center">
            UW Marketplace
          </DialogTitle>
          <DialogDescription className="text-center">
            {!isVerifying
              ? "Join the exclusive marketplace for Waterloo students"
              : "Verify your email"}
          </DialogDescription>
        </DialogHeader>

        {!isVerifying ? (
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="p-6 pt-4">
              <form onSubmit={handleSignIn}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.name@uwaterloo.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                      <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs"
                        type="button"
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="py-2 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-6 pt-4">
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Waterloo Email</Label>
                    <div className="relative">
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.name@uwaterloo.ca"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                      <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Only @uwaterloo.ca email addresses are allowed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="border-0 shadow-none">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-blue-50 dark:bg-blue-900 p-3">
                  <AtSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Check your email</CardTitle>
                <CardDescription className="text-center">
                  We've sent a verification link to
                  <br />
                  <span className="font-medium">{email}</span>
                </CardDescription>
                <Alert className="bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                  <AlertDescription>
                    Please check your Waterloo email and click the verification
                    link to complete your registration.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pb-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsVerifying(false)}
              >
                Back to Sign Up
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Didn't receive an email? Check your spam folder or try again.
              </p>
            </CardFooter>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
