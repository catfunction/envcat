"use client";

import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@src/components/ui/sheet";
import { Button } from "@src/components/ui/button";
import { Plus } from "lucide-react";
import AddVariableForm from "@src/application/project/components/addVariableForm";

export default function VariablesSheet({
  environments,
  projectId,
}: {
  environments: any[];
  projectId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="flex gap-2 items-center">
          <Plus size={18} />
          Add variables
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="max-w-3xl w-full min-w-[700px] gap-6 flex-col flex overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <SheetHeader>
          <SheetTitle>Add variables</SheetTitle>
        </SheetHeader>
        <AddVariableForm
          environments={environments}
          projectId={projectId}
          closeSheet={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
