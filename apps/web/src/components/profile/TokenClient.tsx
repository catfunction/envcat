"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { Textarea } from "@src/components/ui/textarea";
import { Label } from "@src/components/ui/label";
import CopyButton from "@src/components/copyButton/copyButton";

const TokenClient = ({ token }: { token: string }) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <div className="flex-1 gap-4 flex flex-col">
      <Label htmlFor="token" className="text-2xl">
        Token
      </Label>
      <div className="flex flex-row gap-2 flex-1 items-start">
        <Textarea
          id="token"
          value={
            showToken
              ? token
              : "••••••••••••••••••••••••••••••••••••••••••••••••"
          }
          className="h-52"
          readOnly
        />
        <Button
          variant="outline"
          className="h-6 p-2 flex items-center gap-1"
          type="button"
          onClick={() => setShowToken((v) => !v)}
        >
          {showToken ? <EyeOff size={14} /> : <Eye size={14} />}
        </Button>
        <CopyButton value={token} />
      </div>
    </div>
  );
};

export default TokenClient;
