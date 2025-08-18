import CopyButton from "@src/components/copyButton/copyButton";
import { Input } from "@src/components/ui/input";

const Cell = ({
  value,
  hiddenValue,
  isEditing = false,
  editValue = "",
  onEdit,
  onChange,
  onBlur,
  onKeyDown,
}: {
  value: string;
  hiddenValue: string;
  isEditing?: boolean;
  editValue?: string;
  onEdit?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div
        className="items-center cursor-pointer font-semibold overflow-hidden text-ellipsis"
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
      {!isEditing && value !== "--" && <CopyButton value={hiddenValue} />}
    </div>
  );
};

export default Cell;
