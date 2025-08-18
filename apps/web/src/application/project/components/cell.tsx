import CopyButton from "@src/components/copyButton/copyButton";
import { Trash } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@src/components/ui/alert-dialog";
import { useState } from "react";

const Cell = ({
  value,
  hiddenValue,
  isEditing = false,
  editValue = "",
  onEdit,
  onChange,
  onBlur,
  onKeyDown,
  onDelete,
  deleting,
  variableName,
}: {
  value: string;
  hiddenValue: string;
  isEditing?: boolean;
  editValue?: string;
  onEdit?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  deleting?: boolean;
  variableName?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div
        className="items-center cursor-pointer font-semibold overflow-hidden text-ellipsis flex-1"
        onClick={onEdit}
      >
        {isEditing ? (
          <Input
            value={editValue}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            autoFocus
            className="max-w-full"
          />
        ) : (
          <span className="whitespace-nowrap max-w-full">{value}</span>
        )}
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="h-6 p-2"
            disabled={deleting}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <Trash size={14} className="text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the variable "
              {variableName ?? value}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                setOpen(false);
                if (onDelete) await onDelete();
              }}
              disabled={deleting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!isEditing && value !== "--" && <CopyButton value={hiddenValue} />}
    </div>
  );
};

export default Cell;
