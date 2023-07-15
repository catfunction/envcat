"use client";

import CreateProject from "@src/components/createProject/createProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";

import { useState } from "react";

const CreateProjectDialog = ({ children }) => {
  const [showProjectDialog, setProjectDialog] = useState(false);

  return (
    <Dialog open={showProjectDialog} onOpenChange={setProjectDialog}>
      <div onClick={() => setProjectDialog(true)}>{children}</div>
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

export default CreateProjectDialog;
