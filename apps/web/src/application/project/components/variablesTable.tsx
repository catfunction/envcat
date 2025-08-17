"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { useState } from "react";
import { DataTable } from "@src/components/ui/dataTable";
import { Input } from "@src/components/ui/input";
import Cell from "@src/application/project/components/cell";
import getDataFromProject from "@src/application/project/helpers/getDataFromProject";
import { projectWithEnvironments } from "@src/application/project/types";

const VariablesTable = ({ project }: { project: projectWithEnvironments }) => {
  const [variablesVisible, setVariablesVisible] = useState(false);

  const data = getDataFromProject(project);
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
      cell: ({ getValue }) => (
        <Cell value={getValue().value} hiddenValue={getValue().hiddenValue} />
      ),
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
        <Input placeholder="Search variables..." className="max-w-[300px]" />
        <Button
          variant="link"
          size="sm"
          className="flex flew-row gap-2"
          onClick={onClick}
        >
          {variablesVisible && <EyeOff />}
          {!variablesVisible && <Eye />}
          {variablesVisible ? "Hide" : "Show"} variables
        </Button>
      </div>
      <div className="rounded-md border">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default VariablesTable;
