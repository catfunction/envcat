"use client";

import CreateProjectDialog from "@src/components/createProject/createProjectDialog";
import { Button } from "@src/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@src/components/ui/command";
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
  const [project, setProject] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);

    const documentTitle = document.title.split("|");
    if (documentTitle.length > 1) {
      const projectTitle = document.title.split("|")[1].trim();
      setProject(projectTitle);
    }
  }, [pathname]);

  return (
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
            <Box size={18} /> {project || "Select a project"}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>{children}</CommandList>
          <CommandList>
            <CommandGroup>
              <CreateProjectDialog>
                <CommandItem className="font-semibold">
                  <Box className="mr-2 h-5 w-5" />
                  Create Project
                </CommandItem>
              </CreateProjectDialog>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSwitcher;
