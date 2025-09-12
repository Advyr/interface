import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Bell, 
  Shield, 
  Wallet, 
  Users, 
  Database,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const settingsItems = [
    {
      icon: Wallet,
      title: "Wallet & Payments",
      description: "Connected wallets and payment methods",
      status: "Connected",
      statusColor: "text-green-700 bg-green-50"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Email and push notification preferences", 
      status: "Enabled",
      statusColor: "text-blue-700 bg-blue-50"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Two-factor authentication and privacy",
      status: "Protected",
      statusColor: "text-green-700 bg-green-50"
    },
    {
      icon: Database,
      title: "API & Integrations",
      description: "API keys and third-party integrations",
      status: "Available",
      statusColor: "text-purple-700 bg-purple-50"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Invite members and manage permissions",
      status: "Soon",
      statusColor: "text-gray-700 bg-gray-50"
    },
    {
      icon: Settings,
      title: "Advanced Settings",
      description: "Campaign defaults and advanced options",
      status: "Default",
      statusColor: "text-gray-700 bg-gray-50"
    }
  ];

  return (
    <AppShell title="Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>

        {/* Account Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Account Type</span>
              <Badge className="bg-blue-100 text-blue-700">Pro Plan</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Member Since</span>
              <span className="text-gray-900">August 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Primary Wallet</span>
              <span className="text-gray-900 font-mono text-sm">0x1234...5678</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Campaign Limit</span>
              <span className="text-gray-900">Unlimited</span>
            </div>
          </div>
        </div>

        {/* Settings Items */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
          <div className="space-y-2">
            {settingsItems.map((setting) => {
              const Icon = setting.icon;
              return (
                <div 
                  key={setting.title} 
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">{setting.title}</h3>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className={`${setting.statusColor} border-0 font-medium`}>
                      {setting.status}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-12" disabled>
              <Database className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="justify-start h-12" disabled>
              <Shield className="h-4 w-4 mr-2" />
              Security Report
            </Button>
            <Button variant="outline" className="justify-start h-12" disabled>
              <Users className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
            <Button variant="outline" className="justify-start h-12" disabled>
              <Bell className="h-4 w-4 mr-2" />
              Test Notifications
            </Button>
          </div>
        </div>

        {/* Beta Notice */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Settings className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Beta Features</h3>
              <p className="text-sm text-gray-600 mb-3">
                As a Pro user, you have early access to new features as they become available.
              </p>
              <Button variant="outline" size="sm" disabled>
                View Beta Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}