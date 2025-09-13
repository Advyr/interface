"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Zap, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const campaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  budgetLocked: z.number().min(0.001, "Budget must be at least 0.001"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  aiAgent: z.string().min(1, "Please select an AI Agent"),
  paymentToken: z.string().min(1, "Please select a payment token")
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface Agent {
  id: string;
  name: string;
  description: string;
  aiModel: string;
  status: string;
  defaultSettings?: {
    title: string;
    description: string;
    budgetLocked: number;
    duration: number;
  };
}

interface CreateAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CampaignFormData) => void;
  availableAgents: Agent[];
}

const paymentTokens = [
  {
    id: "ETH",
    name: "ETH",
    symbol: "ETH", 
    icon: "⟠",
    description: "Ethereum"
  },
  {
    id: "USDC",
    name: "USDC",
    symbol: "USDC",
    icon: "$",
    description: "USD Coin"
  },
  {
    id: "IDRX",
    name: "IDRX",
    symbol: "IDRX", 
    icon: "₹",
    description: "Indonesian Rupiah X"
  }
];

export function CreateAdDialog({ open, onOpenChange, onSubmit, availableAgents }: CreateAdDialogProps) {
  const [customizeManually, setCustomizeManually] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      paymentToken: "ETH"
    }
  });

  const watchedAiAgent = watch("aiAgent");
  const watchedPaymentToken = watch("paymentToken");

  // Auto-fill fields when agent is selected and customize manually is off
  useEffect(() => {
    if (watchedAiAgent && !customizeManually) {
      const agent = availableAgents.find(a => a.id === watchedAiAgent);
      if (agent?.defaultSettings) {
        setValue("title", agent.defaultSettings.title);
        setValue("description", agent.defaultSettings.description);
        setValue("budgetLocked", agent.defaultSettings.budgetLocked);
        setValue("duration", agent.defaultSettings.duration);
      }
      setSelectedAgent(agent || null);
    }
  }, [watchedAiAgent, customizeManually, availableAgents, setValue]);

  // Reset customize manually when dialog closes
  useEffect(() => {
    if (!open) {
      setCustomizeManually(false);
      setSelectedAgent(null);
    }
  }, [open]);

  const handleFormSubmit = (data: CampaignFormData) => {
    onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 rounded-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span>Create Ad Campaign</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* AI Agent Selection - First */}
          <div>
            <Label htmlFor="aiAgent" className="text-sm font-medium">AI Agent</Label>
            <Controller
              name="aiAgent"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an AI Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center space-x-3 py-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Zap className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{agent.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{agent.description}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.aiAgent && (
              <p className="text-red-500 text-xs mt-1">{errors.aiAgent.message}</p>
            )}
          </div>

          {/* Agent Pre-filled Info */}
          {selectedAgent && !customizeManually && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Agent Settings Applied</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-xs font-medium text-blue-700 mb-1">Campaign Title</p>
                  <p className="text-sm text-gray-900 font-medium">{selectedAgent.defaultSettings?.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-xs font-medium text-blue-700 mb-1">Budget</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedAgent.defaultSettings?.budgetLocked} {watchedPaymentToken}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <p className="text-xs font-medium text-blue-700 mb-1">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedAgent.defaultSettings?.duration} days</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Token Selection */}
          <div>
            <Label className="text-sm font-medium">Payment Token</Label>
            <Controller
              name="paymentToken"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {paymentTokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      onClick={() => field.onChange(token.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        field.value === token.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg">{token.icon}</span>
                      <div className="text-left">
                        <p className="font-medium text-sm">{token.symbol}</p>
                        <p className="text-xs opacity-70">{token.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.paymentToken && (
              <p className="text-red-500 text-xs mt-1">{errors.paymentToken.message}</p>
            )}
          </div>

          {/* Customize Manually Toggle */}
          {selectedAgent && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-sm font-semibold text-gray-800">Custom Configuration</Label>
                  <p className="text-xs text-gray-500">Override agent settings</p>
                </div>
              </div>
              <Switch
                checked={customizeManually}
                onCheckedChange={setCustomizeManually}
              />
            </div>
          )}

          {/* Manual Fields - Only show if customizing manually */}
          {customizeManually && (
            <div className="space-y-5 p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-4 w-4 text-gray-600" />
                <h3 className="font-medium text-gray-800">Custom Configuration</h3>
              </div>
              
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Campaign Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter your campaign title"
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Campaign Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your campaign objectives and target audience"
                  rows={4}
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetLocked" className="text-sm font-semibold text-gray-700">
                    Budget ({watchedPaymentToken})
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="budgetLocked"
                      type="number"
                      step="0.001"
                      {...register("budgetLocked", { valueAsNumber: true })}
                      placeholder="0.000"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm font-medium">{watchedPaymentToken}</span>
                    </div>
                  </div>
                  {errors.budgetLocked && (
                    <p className="text-red-500 text-xs mt-1">{errors.budgetLocked.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">Duration</Label>
                  <div className="relative mt-2">
                    <Input
                      id="duration"
                      type="number"
                      {...register("duration", { valueAsNumber: true })}
                      placeholder="30"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm font-medium">days</span>
                    </div>
                  </div>
                  {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              {selectedAgent && !customizeManually ? "Using agent defaults" : "Custom configuration"}
            </div>
            <div className="flex space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}