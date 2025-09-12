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
  budgetLocked: z.number().min(0.001, "Budget must be at least 0.001 ETH"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  aiAgent: z.string().min(1, "Please select an AI Agent")
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

export function CreateAdDialog({ open, onOpenChange, onSubmit, availableAgents }: CreateAdDialogProps) {
  const [customizeManually, setCustomizeManually] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema)
  });

  const watchedAiAgent = watch("aiAgent");

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Ad</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Agent Settings Applied</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-blue-700 font-medium">Title</p>
                  <p className="text-blue-600 truncate">{selectedAgent.defaultSettings?.title}</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Budget</p>
                  <p className="text-blue-600">{selectedAgent.defaultSettings?.budgetLocked} ETH</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Duration</p>
                  <p className="text-blue-600">{selectedAgent.defaultSettings?.duration} days</p>
                </div>
              </div>
            </div>
          )}

          {/* Customize Manually Toggle */}
          {selectedAgent && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-gray-600" />
                <Label className="text-sm font-medium text-gray-700">Customize manually</Label>
              </div>
              <Switch
                checked={customizeManually}
                onCheckedChange={setCustomizeManually}
              />
            </div>
          )}

          {/* Manual Fields - Only show if customizing manually */}
          {customizeManually && (
            <>
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Ad Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Ad title"
                  className="mt-1"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Ad Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Ad description"
                  rows={3}
                  className="mt-1"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="budgetLocked" className="text-sm font-medium">Budget (ETH)</Label>
                <Input
                  id="budgetLocked"
                  type="number"
                  step="0.001"
                  {...register("budgetLocked", { valueAsNumber: true })}
                  placeholder="0.000"
                  className="mt-1"
                />
                {errors.budgetLocked && (
                  <p className="text-red-500 text-xs mt-1">{errors.budgetLocked.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="duration" className="text-sm font-medium">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  {...register("duration", { valueAsNumber: true })}
                  placeholder="30"
                  className="mt-1"
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                )}
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}