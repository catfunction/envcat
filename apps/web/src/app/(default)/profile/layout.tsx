import useUser from "@src/application/user/hooks/useUser";
import { Avatar, AvatarFallback } from "@src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { KeyRound, LogOut } from "lucide-react";
import { ReactNode } from "react";

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const user = await useUser();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4 flex-1">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="font-semibold text-3xl">
            {user.email.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="flex flex-row gap-6 h-32">
        <Card className="min-w-[240px]">
          <CardHeader className="py-3 px-2">
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="px-2 text-sm flex flex-col gap-1">
            <div className="flex flex-row gap-2 items-center bg-slate-100 rounded px-2 py-1 font-semibold">
              <KeyRound size={16} /> Access Token
            </div>
            <div className="flex flex-row gap-2 items-center px-2 py-1">
              <LogOut size={16} />
              Logout
            </div>
          </CardContent>
        </Card>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
