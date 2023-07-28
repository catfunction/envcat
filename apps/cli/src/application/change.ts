import { select } from "@inquirer/prompts";
import getEnvironment from "@src/services/getEnvironment";
import getProject from "@src/services/getProject";
import generateEnvFile from "@src/shared/generateEnvFile";
import getConfigFile from "@src/shared/getConfigFile";
import { Environment, Variable } from "database";

class Change {
  private environment!: Environment & { variables: Variable[] };

  async execute() {
    await this.askEnvironment();
    this.generateEnvFile();
    this.showEnvFileUpdated();
  }

  private async askEnvironment() {
    const configFile = getConfigFile();
    const project = await getProject({ id: configFile.projectId });

    const environment = await select<Environment>({
      message: "Select environment to sync variables",
      choices: project.environments.map((environment: Environment) => ({
        name: environment.name,
        value: environment,
      })),
    });

    this.environment = await getEnvironment({ id: environment.id });
  }

  private generateEnvFile() {
    generateEnvFile({
      version: this.environment.version,
      variables: this.environment.variables,
    });
  }

  private showEnvFileUpdated() {
    console.log(`🐈 Environment file updated!`);
  }
}

const change = new Change();

export default change;
