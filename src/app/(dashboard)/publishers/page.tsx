"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Column } from "@/components/common/DataTable";
import { usePublisherStore } from "@/stores/publisherStore";
import { Publisher } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";

const publisherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  wallet: z.string().optional()
});

type PublisherFormData = z.infer<typeof publisherSchema>;

export default function PublishersPage() {
  const { publishers, addPublisher } = usePublisherStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PublisherFormData>({
    resolver: zodResolver(publisherSchema)
  });

  const onSubmit = (data: PublisherFormData) => {
    addPublisher({
      name: data.name,
      wallet: data.wallet
    });
    
    reset();
    setDialogOpen(false);
  };

  const getScoreBadge = (score?: number) => {
    if (!score) return <span className="text-gray-400">-</span>;
    
    let className = "text-gray-700 bg-gray-50";
    if (score >= 90) className = "text-green-700 bg-green-50";
    else if (score >= 70) className = "text-blue-700 bg-blue-50";
    else if (score >= 50) className = "text-yellow-700 bg-yellow-50";
    else className = "text-red-700 bg-red-50";
    
    return (
      <Badge variant="outline" className={`${className} font-medium border-0`}>
        {score}
      </Badge>
    );
  };

  const columns: Column<Publisher>[] = [
    {
      key: "name",
      header: "Publisher",
      render: (value, publisher) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{publisher.id}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: "trafficViews",
      header: "Views",
      render: (value) => (
        <span className="text-gray-900">{value.toLocaleString()}</span>
      ),
      sortable: true
    },
    {
      key: "ctr",
      header: "CTR",
      render: (value) => (
        <span className="text-gray-900">{(value * 100).toFixed(1)}%</span>
      ),
      sortable: true
    },
    {
      key: "wallet",
      header: "Wallet",
      render: (value) => value 
        ? <span className="font-mono text-gray-600">{value.slice(0, 6)}...{value.slice(-4)}</span>
        : <span className="text-gray-400">Not connected</span>
    },
    {
      key: "score",
      header: "Score",
      render: (value) => getScoreBadge(value),
      sortable: true
    }
  ];

  const totalTraffic = publishers.reduce((sum, p) => sum + p.trafficViews, 0);
  const avgCtr = publishers.length > 0 ? (publishers.reduce((sum, p) => sum + p.ctr, 0) / publishers.length) * 100 : 0;
  const avgScore = publishers.length > 0 ? publishers.reduce((sum, p) => sum + (p.score || 0), 0) / publishers.length : 0;

  return (
    <AppShell title="Publishers">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Publishers</h1>
            <p className="text-gray-500">{publishers.length} total publishers</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Publisher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Publisher</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Publisher name"
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="wallet" className="text-sm font-medium">Wallet (Optional)</Label>
                  <Input
                    id="wallet"
                    {...register("wallet")}
                    placeholder="0x..."
                    className="mt-1"
                  />
                  {errors.wallet && (
                    <p className="text-red-500 text-xs mt-1">{errors.wallet.message}</p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    Add
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Publishers</p>
            <p className="text-2xl font-bold text-gray-900">{publishers.length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Traffic</p>
            <p className="text-2xl font-bold text-gray-900">{totalTraffic.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Average CTR</p>
            <p className="text-2xl font-bold text-gray-900">{avgCtr.toFixed(1)}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-2xl font-bold text-blue-600">{avgScore.toFixed(0)}</p>
          </div>
        </div>

        {/* Publishers Table */}
        <div className="space-y-4">
          <DataTable data={publishers} columns={columns} className="border-0 shadow-none" />
        </div>
      </div>
    </AppShell>
  );
}