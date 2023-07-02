"use client";

import CreateProject from "@src/components/createProject/createProject";
import { Button } from "@src/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@src/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover";
import { Box } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectSwitcher = ({ children }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showProjectDialog, setProjectDialog] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog open={showProjectDialog} onOpenChange={setProjectDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className="justify-between"
          >
            <div className="flex flex-row gap-2 items-center">
              <Box size={18} /> Select a project
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>{children}</CommandList>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setProjectDialog(true);
                  }}
                  className="font-semibold"
                >
                  <Box className="mr-2 h-5 w-5" />
                  Create Project
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">Create project</DialogTitle>
          <DialogDescription>
            Add a new project for your organization.
          </DialogDescription>
        </DialogHeader>
        <CreateProject closeDialog={() => setProjectDialog(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSwitcher;
