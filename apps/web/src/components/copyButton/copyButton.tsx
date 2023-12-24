"use client";

import { Copy } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { useToast } from "@src/components/ui/use-toast";

const CopyButton = ({ value }: { value: string }) => {
  const { toast } = useToast();

  const copyToClipboard = async (event) => {
    event.stopPropagation();

    await navigator?.clipboard?.writeText(value);

    toast({
      title: (
        <div className="flex gap-2 items-center">
          <Copy size={14} />
          <span>Copied to clipboard</span>
        </div>
      ) as any,
    });
  };

  return (
    <Button variant="outline" className="h-6" onClick={copyToClipboard}>
      <Copy size={14} />
    </Button>
  );
};

export default CopyButton;
