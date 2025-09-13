"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Plus, Settings, Trash2, X, DollarSign } from "lucide-react";

const personalizationSchema = z.object({
  brandVoice: z.enum(["professional", "friendly", "degen", "formal"]),
  toneModifiers: z.array(z.string()),
  targetAudience: z.string().min(10, "Please provide more details about your target audience"),
  channels: z.array(z.string()).min(1, "Select at least one channel"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  ctaStyle: z.enum(["direct", "soft", "urgent"]),
  contentLength: z.enum(["short", "medium", "long"]),
  hashtags: z.array(z.string()),
  disallowedTerms: z.array(z.string()),
  complianceNotes: z.string(),
  budgetToken: z.string().min(1, "Please select a budget token"),
  dailyBudget: z.number().min(0.01, "Daily budget must be at least 0.01"),
  totalBudget: z.number().min(0.1, "Total budget must be at least 0.1")
});

type PersonalizationFormData = z.infer<typeof personalizationSchema>;

const toneModifierOptions = [
  "Casual", "Formal", "Exciting", "Urgent", "Educational", "Humorous", "Technical", "Conversational"
];

const channelOptions = [
  { id: "defi", label: "DeFi" },
  { id: "nft", label: "NFT" },
  { id: "gaming", label: "Gaming" },
  { id: "social", label: "Social" }
];

const languageOptions = [
  "English", "Spanish", "French", "German", "Japanese", "Korean", "Chinese", "Portuguese"
];

const budgetTokens = [
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
  },
  {
    id: "ETH",
    name: "ETH",
    symbol: "ETH",
    icon: "⟠", 
    description: "Ethereum"
  }
];

export default function AgentsPage() {
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [hashtagInput, setHashtagInput] = useState("");
  const [disallowedTermInput, setDisallowedTermInput] = useState("");

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<PersonalizationFormData>({
    resolver: zodResolver(personalizationSchema),
    defaultValues: {
      brandVoice: "professional",
      toneModifiers: [],
      targetAudience: "",
      channels: [],
      languages: ["English"],
      ctaStyle: "direct",
      contentLength: "medium",
      hashtags: [],
      disallowedTerms: [],
      complianceNotes: "",
      budgetToken: "USDC",
      dailyBudget: 100,
      totalBudget: 1000
    }
  });

  const watchedValues = watch();

  const addHashtag = () => {
    if (hashtagInput.trim() && !watchedValues.hashtags.includes(hashtagInput.trim())) {
      const newHashtags = [...watchedValues.hashtags, hashtagInput.trim()];
      setValue("hashtags", newHashtags);
      setHashtagInput("");
    }
  };

  const removeHashtag = (tag: string) => {
    setValue("hashtags", watchedValues.hashtags.filter(t => t !== tag));
  };

  const addDisallowedTerm = () => {
    if (disallowedTermInput.trim() && !watchedValues.disallowedTerms.includes(disallowedTermInput.trim())) {
      const newTerms = [...watchedValues.disallowedTerms, disallowedTermInput.trim()];
      setValue("disallowedTerms", newTerms);
      setDisallowedTermInput("");
    }
  };

  const removeDisallowedTerm = (term: string) => {
    setValue("disallowedTerms", watchedValues.disallowedTerms.filter(t => t !== term));
  };

  const onSubmit = async (data: PersonalizationFormData) => {
    setIsCreatingAgent(true);
    console.log("Creating agent with data:", data);
    
    // Simulate agent creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCreatingAgent(false);
    // Here you would typically navigate to the agent or show success message
  };

  return (
    <AppShell title="Agents">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
            <p className="text-gray-500">Create and manage your personalized advertising agents</p>
          </div>
          
          <Button 
            onClick={() => setIsCreatingAgent(!isCreatingAgent)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </div>

        {/* Create Agent Form */}
        {isCreatingAgent && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Create New Agent</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsCreatingAgent(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Brand Voice */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Brand Voice</Label>
                <Controller
                  name="brandVoice"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-4 gap-4"
                    >
                      {["professional", "friendly", "degen", "formal"].map((voice) => (
                        <div key={voice} className="flex items-center space-x-2">
                          <RadioGroupItem value={voice} id={voice} />
                          <Label htmlFor={voice} className="capitalize">{voice}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Tone Modifiers */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tone Modifiers</Label>
                <div className="grid grid-cols-4 gap-2">
                  {toneModifierOptions.map((modifier) => (
                    <div key={modifier} className="flex items-center space-x-2">
                      <Checkbox
                        id={modifier}
                        checked={watchedValues.toneModifiers.includes(modifier)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setValue("toneModifiers", [...watchedValues.toneModifiers, modifier]);
                          } else {
                            setValue("toneModifiers", watchedValues.toneModifiers.filter(t => t !== modifier));
                          }
                        }}
                      />
                      <Label htmlFor={modifier} className="text-sm">{modifier}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      {...register("targetAudience")}
                      placeholder="Describe your target audience demographics, interests, and behavior..."
                      rows={4}
                    />
                    {errors.targetAudience && (
                      <p className="text-sm text-red-600">{errors.targetAudience.message}</p>
                    )}
                  </div>

                  {/* Channels */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Channels</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {channelOptions.map((channel) => (
                        <div key={channel.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={channel.id}
                            checked={watchedValues.channels.includes(channel.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("channels", [...watchedValues.channels, channel.id]);
                              } else {
                                setValue("channels", watchedValues.channels.filter(c => c !== channel.id));
                              }
                            }}
                          />
                          <Label htmlFor={channel.id}>{channel.label}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.channels && (
                      <p className="text-sm text-red-600">{errors.channels.message}</p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Languages</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={watchedValues.languages.includes(language)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("languages", [...watchedValues.languages, language]);
                              } else {
                                setValue("languages", watchedValues.languages.filter(l => l !== language));
                              }
                            }}
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.languages && (
                      <p className="text-sm text-red-600">{errors.languages.message}</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* CTA Style */}
                  <div className="space-y-2">
                    <Label>CTA Style</Label>
                    <Controller
                      name="ctaStyle"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="direct">Direct</SelectItem>
                            <SelectItem value="soft">Soft</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Content Length */}
                  <div className="space-y-2">
                    <Label>Content Length</Label>
                    <Controller
                      name="contentLength"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="long">Long</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-2">
                    <Label>Hashtags</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={hashtagInput}
                        onChange={(e) => setHashtagInput(e.target.value)}
                        placeholder="Enter hashtag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                      />
                      <Button type="button" onClick={addHashtag} variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {watchedValues.hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeHashtag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Disallowed Terms */}
                  <div className="space-y-2">
                    <Label>Disallowed Terms</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={disallowedTermInput}
                        onChange={(e) => setDisallowedTermInput(e.target.value)}
                        placeholder="Enter term to avoid"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDisallowedTerm())}
                      />
                      <Button type="button" onClick={addDisallowedTerm} variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {watchedValues.disallowedTerms.map((term) => (
                        <Badge key={term} variant="destructive" className="flex items-center gap-1">
                          {term}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeDisallowedTerm(term)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Compliance Notes */}
                <div className="space-y-2">
                  <Label htmlFor="complianceNotes">Compliance Notes</Label>
                  <Textarea
                    id="complianceNotes"
                    {...register("complianceNotes")}
                    placeholder="Any compliance requirements or guidelines..."
                    rows={3}
                  />
                </div>

                {/* Budget Caps */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Budget Caps</Label>
                  
                  {/* Budget Token Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Budget Token</Label>
                    <Controller
                      name="budgetToken"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-3 gap-3">
                          {budgetTokens.map((token) => (
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
                                <p className="font-medium text-xs">{token.symbol}</p>
                                <p className="text-xs opacity-70">{token.name}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    />
                    {errors.budgetToken && (
                      <p className="text-sm text-red-600">{errors.budgetToken.message}</p>
                    )}
                  </div>

                  {/* Budget Amounts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dailyBudget" className="text-sm">Daily Budget</Label>
                      <div className="relative mt-1">
                        <Input
                          id="dailyBudget"
                          type="number"
                          step="0.01"
                          {...register("dailyBudget", { valueAsNumber: true })}
                          placeholder={watchedValues.budgetToken === "IDRX" ? "100000" : "100"}
                          className="pr-16"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 text-sm font-medium">
                            {budgetTokens.find(t => t.id === watchedValues.budgetToken)?.symbol}
                          </span>
                        </div>
                      </div>
                      {errors.dailyBudget && (
                        <p className="text-sm text-red-600">{errors.dailyBudget.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="totalBudget" className="text-sm">Total Budget</Label>
                      <div className="relative mt-1">
                        <Input
                          id="totalBudget"
                          type="number"
                          step="0.1"
                          {...register("totalBudget", { valueAsNumber: true })}
                          placeholder={watchedValues.budgetToken === "IDRX" ? "1000000" : "1000"}
                          className="pr-16"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 text-sm font-medium">
                            {budgetTokens.find(t => t.id === watchedValues.budgetToken)?.symbol}
                          </span>
                        </div>
                      </div>
                      {errors.totalBudget && (
                        <p className="text-sm text-red-600">{errors.totalBudget.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsCreatingAgent(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Bot className="h-4 w-4 mr-2" />
                  Create Agent
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Existing Agents - Empty State for now */}
        {!isCreatingAgent && (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents yet</h3>
            <p className="text-gray-500 mb-6">Create your first advertising agent to get started</p>
            <Button 
              onClick={() => setIsCreatingAgent(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}