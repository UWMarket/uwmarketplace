import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ArrowLeft, Camera, Save } from "lucide-react";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@uwaterloo.ca");
  const [bio, setBio] = useState(
    "Computer Science student at University of Waterloo. Interested in buying and selling textbooks and electronics.",
  );
  const [notifications, setNotifications] = useState({
    messages: true,
    newListings: true,
    priceDrops: false,
    marketingEmails: false,
  });
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar isAuthenticated={true} />

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                          />
                          <p className="text-xs text-muted-foreground">
                            Your university email cannot be changed
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={4}
                          placeholder="Tell others about yourself..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visibility" className="block">
                          Profile Visibility
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow other users to see your profile
                        </p>
                      </div>
                      <Switch id="profile-visibility" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="contact-info" className="block">
                          Show Contact Info
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Display your email to potential buyers/sellers
                        </p>
                      </div>
                      <Switch id="contact-info" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deactivate Account</p>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable your account
                        </p>
                      </div>
                      <Button variant="outline">Deactivate</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all your data
                        </p>
                      </div>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-messages" className="block">
                            Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications for new messages
                          </p>
                        </div>
                        <Switch
                          id="notify-messages"
                          checked={notifications.messages}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              messages: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-listings" className="block">
                            New Listings
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new listings in your saved
                            categories
                          </p>
                        </div>
                        <Switch
                          id="notify-listings"
                          checked={notifications.newListings}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              newListings: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-price-drops" className="block">
                            Price Drops
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when prices drop on your saved items
                          </p>
                        </div>
                        <Switch
                          id="notify-price-drops"
                          checked={notifications.priceDrops}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              priceDrops: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-marketing" className="block">
                            Marketing Emails
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about UW Marketplace features and
                            promotions
                          </p>
                        </div>
                        <Switch
                          id="notify-marketing"
                          checked={notifications.marketingEmails}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              marketingEmails: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure push notifications in your browser settings
                    </p>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="theme-toggle" className="block">
                          Dark Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark mode
                        </p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Display Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="compact-view" className="block">
                            Compact View
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Show more items per page with smaller cards
                          </p>
                        </div>
                        <Switch id="compact-view" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-prices" className="block">
                            Always Show Prices
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Display prices on item cards even in compact view
                          </p>
                        </div>
                        <Switch id="show-prices" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
