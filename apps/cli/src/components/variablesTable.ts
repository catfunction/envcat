import Table from "cli-table3";

const variablesTable = ({
  environmentName,
  variables,
}: {
  environmentName: string;
  variables: any[];
}) => {
  const tableVariables = new Table({ head: ["Variable", environmentName] });

  variables.forEach((variable) => {
    tableVariables.push([variable.name, variable.value]);
  });

  console.log(tableVariables.toString());
};

export default variablesTable;
