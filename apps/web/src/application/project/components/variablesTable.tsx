"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@src/components/ui/dataTable";
import { Input } from "@src/components/ui/input";
import Cell from "@src/application/project/components/cell";
import updateVariable from "@src/application/project/actions/updateVariable";
import getDataFromProject from "@src/application/project/helpers/getDataFromProject";
import { projectWithEnvironments } from "@src/application/project/types";

const VariablesTable = ({ project }: { project: projectWithEnvironments }) => {
  const [variablesVisible, setVariablesVisible] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [editingCell, setEditingCell] = useState<{
    variable: string;
    environment: string;
    value: string;
  } | null>(null);

  const [data, setData] = useState(() => getDataFromProject(project));

  useEffect(() => {
    setData(getDataFromProject(project));
  }, [project, variablesVisible]);
  const filteredData = useMemo(() => {
    return search
      ? data.filter((row) =>
          row.variable.toLowerCase().includes(search.toLowerCase())
        )
      : data;
  }, [search, data]);
  const columns = [
    {
      accessorKey: "variable",
      header: "Variable",
      cell: ({ getValue }) => (
        <div className="items-center cursor-pointer overflow-hidden text-ellipsis">
          <span className="whitespace-nowrap max-w-full">{getValue()}</span>
        </div>
      ),
    },
    ...project.environments.map((environment) => ({
      accessorKey: environment.name,
      header: "Values",
      cell: ({ row, getValue }) => {
        const variableName = row.original.variable;
        const cellData = getValue();
        const isEditing =
          editingCell &&
          editingCell.variable === variableName &&
          editingCell.environment === environment.name;
        return (
          <Cell
            value={cellData.value}
            hiddenValue={cellData.hiddenValue}
            isEditing={isEditing}
            editValue={isEditing ? editingCell.value : cellData.value}
            onEdit={() => {
              if (!isEditing && variablesVisible) {
                setEditingCell({
                  variable: variableName,
                  environment: environment.name,
                  value:
                    cellData.value === "--" ? "" : cellData.hiddenValue || "",
                });
              }
            }}
            onChange={(e) => {
              if (isEditing) {
                setEditingCell({
                  ...editingCell,
                  value: e.target.value,
                });
              }
            }}
            onBlur={async () => {
              if (isEditing && editingCell.value !== cellData.value) {
                await updateVariable({
                  projectId: project.id,
                  name: variableName,
                  environmentName: environment.name,
                  value: editingCell.value,
                });
                router.refresh();
              }
              setEditingCell(null);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (isEditing && editingCell.value !== cellData.value) {
                  await updateVariable({
                    projectId: project.id,
                    name: variableName,
                    environmentName: environment.name,
                    value: editingCell.value,
                  });
                  router.refresh();
                }
                setEditingCell(null);
              } else if (e.key === "Escape") {
                setEditingCell(null);
              }
            }}
          />
        );
      },
      accessorFn: (row) => {
        const cell = row?.[environment.name];
        if (!variablesVisible) {
          return {
            value: cell?.value ? "********" : "--",
            hiddenValue: cell?.value,
          };
        }
        return { value: cell?.value || "--", hiddenValue: cell?.value };
      },
    })),
  ];

  const onClick = () => {
    setVariablesVisible(!variablesVisible);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <Input
          placeholder="Search variables..."
          className="max-w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="link"
          size="sm"
          className="flex flex-row gap-2"
          onClick={onClick}
        >
          {variablesVisible && <EyeOff />}
          {!variablesVisible && <Eye />}
          {variablesVisible ? "Hide" : "Show"} variables
        </Button>
      </div>
      <div className="rounded-md border">
        <DataTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
};

export default VariablesTable;
