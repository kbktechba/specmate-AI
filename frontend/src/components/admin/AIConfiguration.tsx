"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";

export function AIConfiguration() {
  const [summarization, setSummarization] = useState(true);
  const [ticketDrafting, setTicketDrafting] = useState(true);
  const [sourceCitations, setSourceCitations] = useState(true);
  const [temperature, setTemperature] = useState([0.7]);
  const [confidence, setConfidence] = useState([85]);
  const [topK, setTopK] = useState([5]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">AI Configuration</h2>
          <p className="text-gray-500">Manage model parameters and feature flags.</p>
        </div>
        <Button className="bg-specsavers-green hover:bg-specsavers-green/90">
          <Save size={16} className="mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Parameters</CardTitle>
            <CardDescription>Adjust the core behavior of the AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">AI Provider</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>OpenAI</option>
                <option>Azure OpenAI</option>
                <option>Google Gemini</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Model Name</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>gpt-4-turbo</option>
                <option>gpt-3.5-turbo</option>
                <option>gemini-1.5-pro</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Temperature: {temperature[0]}</label>
              </div>
              <Slider value={temperature} onValueChange={setTemperature} max={1} step={0.1} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Max Tokens</label>
                <span className="text-sm text-gray-500">2048</span>
              </div>
              <Slider defaultValue={[2048]} max={4096} step={256} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RAG & Feature Flags</CardTitle>
            <CardDescription>Configure retrieval and assistant capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Retrieval Top-K: {topK[0]}</label>
              </div>
              <Slider value={topK} onValueChange={setTopK} max={20} step={1} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Confidence Threshold: {confidence[0]}%</label>
              </div>
              <Slider value={confidence} onValueChange={setConfidence} max={100} step={1} />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Enable AI Summarization</label>
                <p className="text-xs text-gray-500">Use AI to summarize long articles.</p>
              </div>
              <Switch checked={summarization} onCheckedChange={setSummarization} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Enable Ticket Drafting</label>
                <p className="text-xs text-gray-500">Auto-draft tickets for unresolved issues.</p>
              </div>
              <Switch checked={ticketDrafting} onCheckedChange={setTicketDrafting} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Enable Source Citations</label>
                <p className="text-xs text-gray-500">Append source links to answers.</p>
              </div>
              <Switch checked={sourceCitations} onCheckedChange={setSourceCitations} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
