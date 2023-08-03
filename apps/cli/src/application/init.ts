import { input, select } from "@inquirer/prompts";
import variablesTable from "@src/components/variablesTable";
import getEnvironment from "@src/services/getEnvironment";
import getProjects from "@src/services/getProjects";
import generateEnvFile from "@src/shared/generateEnvFile";
import { Project, Environment, Variable } from "database";
import { writeFileSync } from "fs";

class Init {
  private serverUrl: string | undefined;
  private project!: Project & { environments: Environment[] };
  private environment!: Environment & { variables: Variable[] };

  async execute(): Promise<void> {
    await this.askServer();
    await this.askProject();
    await this.askEnvironment();
    this.generateEnvcatConfigFile();
    this.showVariables();
    this.generateEnvFile();
  }

  private async askServer() {
    globalThis.serverUrl = await input({
      message: "Enter the envcat server url",
    });
    this.serverUrl = globalThis.serverUrl;
  }

  private async askProject() {
    const projects = await getProjects.execute();

    this.project = await select<typeof this.project>({
      message: "Select project to sync",
      choices: projects.map((project: Project) => ({
        name: project.name,
        value: project,
      })),
    });
  }

  private async askEnvironment() {
    const environment = await select<Environment>({
      message: "Select environment to sync variables",
      choices: this.project.environments.map((environment: Environment) => ({
        name: environment.name,
        value: environment,
      })),
    });

    this.environment = await getEnvironment.execute({ id: environment.id });
  }

  private generateEnvcatConfigFile() {
    writeFileSync(
      "envcat.json",
      JSON.stringify(
        {
          serverUrl: this.serverUrl,
          projectId: this.project.id,
          environmentId: this.environment.id,
        },
        null,
        2,
      ),
      "utf8",
    );
  }

  private generateEnvFile() {
    generateEnvFile({
      version: this.environment.version,
      variables: this.environment.variables,
    });
  }

  private showVariables() {
    variablesTable({
      environmentName: this.environment.name,
      variables: this.environment.variables,
    });
  }
}

const init = new Init();

export default init;
