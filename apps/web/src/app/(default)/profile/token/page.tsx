import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import { Textarea } from "@src/components/ui/textarea";
import { Label } from "@src/components/ui/label";
import CopyButton from "@src/components/copyButton/copyButton";

const ToknPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("ENVCAT_TOKEN").value;


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
