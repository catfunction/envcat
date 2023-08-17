import { cookies } from "next/headers";
import { Copy } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { Textarea } from "@src/components/ui/textarea";
import { Label } from "@src/components/ui/label";

const TokenPage = () => {
  return (
    <div className="flex-1 gap-4 flex flex-col">
      <Label htmlFor="token" className="text-2xl">
        Token
      </Label>
      <div className="flex flex-row gap-2 flex-1">
        <Textarea
          id="token"
          value={cookies().get("ENVCAT_TOKEN").value}
          className="h-52"
        />
        <Button variant="outline" className="h-10">
          <Copy size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TokenPage;
