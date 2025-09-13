"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { 
  Plus, 
  Play, 
  Pause, 
  Square, 
  RefreshCw,
  DollarSign,
  Target,
  Image,
  Video,
  FileText,
  MousePointer,
  BarChart3,
  Settings,
  Upload,
  Eye,
  Edit
} from "lucide-react";

// Campaign objectives
const campaignObjectives = [
  { id: "swap", name: "Token Swap", icon: "🔄", description: "Incentivize users to swap tokens on DEX" },
  { id: "stake", name: "Token Staking", icon: "🏦", description: "Encourage users to stake tokens" },
  { id: "mint", name: "NFT Mint", icon: "🎨", description: "Drive NFT collection minting" },
  { id: "connect", name: "Wallet Connect", icon: "👛", description: "Onboard new wallet connections" }
];

// Available tokens for escrow
const escrowTokens = [
  { id: "ETH", name: "ETH", symbol: "ETH", icon: "⟠" },
  { id: "USDC", name: "USDC", symbol: "USDC", icon: "$" },
  { id: "IDRX", name: "IDRX", symbol: "IDRX", icon: "₹" }
];

// Mock campaigns data
const mockCampaigns = [
  {
    id: "1",
    name: "DeFi Swap Campaign",
    objective: "swap",
    status: "active",
    budget: 5.0,
    spent: 2.3,
    cpaRate: 0.05,
    conversions: 46,
    createdAt: "2024-01-10",
    variants: 2
  },
  {
    id: "2",
    name: "NFT Mint Rewards",
    objective: "mint",
    status: "paused",
    budget: 3.0,
    spent: 1.8,
    cpaRate: 0.03,
    conversions: 60,
    createdAt: "2024-01-08",
    variants: 1
  },
  {
    id: "3",
    name: "Staking Incentives",
    objective: "stake",
    status: "draft",
    budget: 10.0,
    spent: 0.0,
    cpaRate: 0.08,
    conversions: 0,
    createdAt: "2024-01-12",
    variants: 3
  }
];

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // Form state
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    description: "",
    objective: "",
    budget: "",
    cpaRate: "",
    token: "ETH",
    adTitle: "",
    adDescription: "",
    ctaText: "",
    targetAudience: "",
    imageUrl: "",
    videoUrl: ""
  });

  const handleFormChange = (field: string, value: string) => {
    setCampaignForm(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-50 text-green-700 border-green-200",
      paused: "bg-yellow-50 text-yellow-700 border-yellow-200",
      draft: "bg-gray-50 text-gray-700 border-gray-200",
      completed: "bg-blue-50 text-blue-700 border-blue-200"
    };
    
    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getObjectiveIcon = (objective: string) => {
    const obj = campaignObjectives.find(o => o.id === objective);
    return obj ? obj.icon : "🎯";
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    console.log(`${action} campaign ${campaignId}`);
    // Here you would implement the actual campaign actions
  };

  const CreateCampaignForm = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Campaign</h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="metadata">Ad Content</TabsTrigger>
            <TabsTrigger value="budget">Budget & Escrow</TabsTrigger>
            <TabsTrigger value="testing">A/B Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={campaignForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Enter campaign name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={campaignForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    placeholder="Describe your campaign goals"
                    rows={3}
                  />
                </div>
              </div>
              
              <div>
                <Label>Campaign Objective</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {campaignObjectives.map((objective) => (
                    <button
                      key={objective.id}
                      type="button"
                      onClick={() => handleFormChange("objective", objective.id)}
                      className={`p-4 text-left border rounded-lg transition-colors ${
                        campaignForm.objective === objective.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{objective.icon}</span>
                        <span className="font-medium">{objective.name}</span>
                      </div>
                      <p className="text-sm text-gray-500">{objective.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metadata" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adTitle">Ad Title</Label>
                  <Input
                    id="adTitle"
                    value={campaignForm.adTitle}
                    onChange={(e) => handleFormChange("adTitle", e.target.value)}
                    placeholder="Compelling ad headline"
                  />
                </div>
                
                <div>
                  <Label htmlFor="adDescription">Ad Description</Label>
                  <Textarea
                    id="adDescription"
                    value={campaignForm.adDescription}
                    onChange={(e) => handleFormChange("adDescription", e.target.value)}
                    placeholder="Ad description text"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaText">Call-to-Action Text</Label>
                  <Input
                    id="ctaText"
                    value={campaignForm.ctaText}
                    onChange={(e) => handleFormChange("ctaText", e.target.value)}
                    placeholder="e.g., 'Swap Now', 'Start Staking'"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Ad Media</Label>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload image or enter URL</p>
                      <Input
                        value={campaignForm.imageUrl}
                        onChange={(e) => handleFormChange("imageUrl", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload video or enter URL</p>
                      <Input
                        value={campaignForm.videoUrl}
                        onChange={(e) => handleFormChange("videoUrl", e.target.value)}
                        placeholder="https://example.com/video.mp4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Escrow Token</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {escrowTokens.map((token) => (
                      <button
                        key={token.id}
                        type="button"
                        onClick={() => handleFormChange("token", token.id)}
                        className={`p-3 text-center border rounded-lg transition-colors ${
                          campaignForm.token === token.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-lg block mb-1">{token.icon}</span>
                        <span className="text-sm font-medium">{token.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="budget">Total Budget</Label>
                  <div className="relative">
                    <Input
                      id="budget"
                      type="number"
                      step="0.01"
                      value={campaignForm.budget}
                      onChange={(e) => handleFormChange("budget", e.target.value)}
                      placeholder="10.0"
                      className="pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm">{campaignForm.token}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cpaRate">CPA Rate (per conversion)</Label>
                  <div className="relative">
                    <Input
                      id="cpaRate"
                      type="number"
                      step="0.001"
                      value={campaignForm.cpaRate}
                      onChange={(e) => handleFormChange("cpaRate", e.target.value)}
                      placeholder="0.05"
                      className="pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm">{campaignForm.token}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Budget Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Budget:</span>
                    <span className="font-medium">{campaignForm.budget || "0"} {campaignForm.token}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CPA Rate:</span>
                    <span className="font-medium">{campaignForm.cpaRate || "0"} {campaignForm.token}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Max Conversions:</span>
                    <span className="font-medium">
                      {campaignForm.budget && campaignForm.cpaRate 
                        ? Math.floor(parseFloat(campaignForm.budget) / parseFloat(campaignForm.cpaRate))
                        : "0"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">A/B Test Variants</h4>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Variant A (Control)</h5>
                    <Badge variant="secondary">50% Traffic</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {campaignForm.adTitle || "Ad Title"}</p>
                    <p><strong>CTA:</strong> {campaignForm.ctaText || "Call to Action"}</p>
                  </div>
                </Card>
                
                <Card className="p-4 border-dashed border-gray-300">
                  <div className="text-center py-8">
                    <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Create variant B to test different ad content</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Variant
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={() => setIsCreatingCampaign(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Campaign
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AppShell title="Campaign Management">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Management</h1>
            <p className="text-gray-500">Core advertising management for onchain campaigns</p>
          </div>
          
          <Button 
            onClick={() => setIsCreatingCampaign(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {isCreatingCampaign ? (
          <CreateCampaignForm />
        ) : (
          <>
            {/* Campaign Stats */}
            <div className="grid grid-cols-4 gap-8">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCampaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCampaigns.reduce((sum, c) => sum + c.budget, 0).toFixed(1)} ETH
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCampaigns.reduce((sum, c) => sum + c.conversions, 0)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Avg CPA</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(mockCampaigns.reduce((sum, c) => sum + c.cpaRate, 0) / mockCampaigns.length).toFixed(3)} ETH
                </p>
              </div>
            </div>

            {/* Campaigns List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Campaigns</h2>
              
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getObjectiveIcon(campaign.objective)}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">
                            {campaignObjectives.find(o => o.id === campaign.objective)?.name}
                          </p>
                        </div>
                        {getStatusBadge(campaign.status)}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {campaign.status === 'active' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCampaignAction(campaign.id, 'pause')}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {campaign.status === 'paused' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCampaignAction(campaign.id, 'resume')}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {campaign.status === 'draft' && (
                          <Button
                            size="sm"
                            onClick={() => handleCampaignAction(campaign.id, 'start')}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500">Budget</p>
                        <p className="font-medium">{campaign.budget} ETH</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Spent</p>
                        <p className="font-medium">{campaign.spent} ETH</p>
                      </div>
                      <div>
                        <p className="text-gray-500">CPA Rate</p>
                        <p className="font-medium">{campaign.cpaRate} ETH</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Conversions</p>
                        <p className="font-medium">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">A/B Variants</p>
                        <p className="font-medium">{campaign.variants}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Budget Usage</span>
                        <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </AppShell>
  );
}