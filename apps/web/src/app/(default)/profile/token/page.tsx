import { cookies } from "next/headers";
import { Textarea } from "@src/components/ui/textarea";
import { Label } from "@src/components/ui/label";
import CopyButton from "@src/components/copyButton/copyButton";

const TokenPage = () => {
  const token = cookies().get("ENVCAT_TOKEN").value;

  return (
    <div className="flex-1 gap-4 flex flex-col">
      <Label htmlFor="token" className="text-2xl">
        Token
      </Label>
      <div className="flex flex-row gap-2 flex-1">
        <Textarea id="token" value={token} className="h-52" />
        <CopyButton value={token} />
      </div>
    </div>
  );
};

export default TokenPage;
