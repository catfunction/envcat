import CopyButton from "@src/components/copyButton/copyButton";

const Cell = ({
  value,
  hiddenValue,
}: {
  value: string;
  hiddenValue: string;
}) => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div className="items-center cursor-pointer font-semibold overflow-hidden text-ellipsis">
        <span className="whitespace-nowrap max-w-full">{value}</span>
      </div>
      {value !== "--" && <CopyButton value={hiddenValue} />}
    </div>
  );
};

export default Cell;
