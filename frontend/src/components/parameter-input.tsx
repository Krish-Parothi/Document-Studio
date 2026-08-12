"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface StyleParams {
  font_family?: string;
  font_size?: number;
  text_color?: string;
  background_color?: string;
  line_spacing?: number;
}

interface ParameterInputProps {
  onParamsChange?: (params: StyleParams) => void;
}

export function ParameterInput({ onParamsChange }: ParameterInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<StyleParams>({
    font_family: "Arial",
    font_size: 12,
    text_color: "#000000",
    background_color: "#FFFFFF",
    line_spacing: 1.0,
  });

  const handleChange = (key: keyof StyleParams, value: string | number) => {
    const updated = { ...params, [key]: value };
    setParams(updated);
    onParamsChange?.(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Document Style</CardTitle>
            <CardDescription>Customize formatting options</CardDescription>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Family</label>
              <select
                value={params.font_family}
                onChange={(e) => handleChange("font_family", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
              >
                <option>Arial</option>
                <option>Times</option>
                <option>Courier</option>
                <option>Helvetica</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <Input
                type="number"
                min="8"
                max="28"
                value={params.font_size}
                onChange={(e) => handleChange("font_size", parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Text Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={params.text_color}
                  onChange={(e) => handleChange("text_color", e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={params.text_color}
                  onChange={(e) => handleChange("text_color", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Line Spacing</label>
              <Input
                type="number"
                min="0.8"
                max="2.0"
                step="0.1"
                value={params.line_spacing}
                onChange={(e) => handleChange("line_spacing", parseFloat(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
