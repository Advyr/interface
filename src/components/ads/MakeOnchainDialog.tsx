"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/types";
import { Zap, RefreshCw, ExternalLink, Link as LinkIcon } from "lucide-react";

interface MakeOnchainDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign | null;
  onDeploy: () => Promise<void>;
}

export function MakeOnchainDialog({ open, onOpenChange, campaign, onDeploy }: MakeOnchainDialogProps) {
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      await onDeploy();
    } finally {
      setIsDeploying(false);
    }
  };

  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-900">Make Onchain</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Campaign Info */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-gray-900">{campaign.title}</h3>
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              {campaign.budgetLocked} ETH Budget
            </div>
          </div>

          {/* Features - Minimalist */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-6 py-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <LinkIcon className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600">Smart Contract</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600">Auto Tracking</p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-xs text-gray-600">Base Network</p>
              </div>
            </div>
          </div>

          {/* Deployment Info - Clean */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-900 font-medium mb-2">Ready to Deploy</p>
            <p className="text-xs text-blue-700">Gas fee: ~0.002 ETH • Base Mainnet</p>
          </div>

          {/* Action Buttons - Clean */}
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isDeploying}
              className="flex-1 border-gray-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Deploy
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}