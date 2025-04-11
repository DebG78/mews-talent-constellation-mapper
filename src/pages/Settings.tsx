
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [organizationName, setOrganizationName] = useState("Mews");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataExportEnabled, setDataExportEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSaveGeneral = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings updated",
        description: "Your general settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your organization and application settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Application Preferences</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-export">Enable data export</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow exporting data to Excel and PDF formats
                      </p>
                    </div>
                    <Switch
                      id="data-export"
                      checked={dataExportEnabled}
                      onCheckedChange={setDataExportEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="advanced-analytics">Advanced Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable advanced talent analytics and predictions
                      </p>
                    </div>
                    <Switch
                      id="advanced-analytics"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveGeneral} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Manage your application data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  These actions cannot be undone. Please be certain before proceeding.
                </p>
                
                <div className="flex space-x-2">
                  <Button variant="outline">Export All Data</Button>
                  <Button variant="destructive">Reset Application Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="talent-updates">Talent Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications when employee data changes
                      </p>
                    </div>
                    <Switch
                      id="talent-updates"
                      defaultChecked
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ready-now-alerts">Ready Now Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Alerts for employees classified as Ready Now
                      </p>
                    </div>
                    <Switch
                      id="ready-now-alerts"
                      defaultChecked
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly summary of talent management activities
                      </p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Appearance settings coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security settings and access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  Security settings coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Manage API keys and access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground pb-4">
                  API settings coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
