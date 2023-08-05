import { Copy } from "lucide-react";
import { Textarea } from "@src/components/ui/textarea";
import { useState } from "react";
import { Button } from "@src/components/ui/button";
import updateVariable from "@src/application/project/actions/updateVariable";
import { useRouter } from "next/navigation";

const EditableCell = ({
  projectId,
  environmentName,
  name,
  value,
  original,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = async (event) => {
    if (original.value !== event.target.value) {
      await updateVariable({
        projectId,
        name,
        environmentName,
        value: event.target.value,
      });
      router.refresh();
    }
    setIsEditing(false);
  };

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
      defaultValue={original.value}
      onBlur={onBlur}
      className="h-8"
    />
  );
};

export default EditableCell;
