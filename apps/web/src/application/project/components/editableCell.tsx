import { Copy } from "lucide-react";
import { Textarea } from "@src/components/ui/textarea";
import { useState } from "react";
import { Button } from "@src/components/ui/button";

const EditableCell = ({ value, originalValue }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <div className="flex flex-row gap-2 justify-between items-center">
        <div
          onClick={() => {
            setIsEditing(true);
          }}
          className="items-center cursor-pointer font-semibold overflow-hidden text-ellipsis"
        >
          <span className="whitespace-nowrap max-w-full">{value}</span>
        </div>
        {value !== "--" && (
          <Button variant="outline" className="h-6">
            <Copy size={14} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Textarea
      autoFocus={true}
      defaultValue={originalValue}
      onBlur={() => setIsEditing(false)}
      className="h-8"
    />
  );
};

export default EditableCell;
