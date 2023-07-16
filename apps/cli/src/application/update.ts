import getEnvironment from "@src/services/getEnvironment";
import generateEnvFile from "@src/shared/generateEnvFile";
import getConfigFile from "@src/shared/getConfigFile";
import getEnvFile from "@src/shared/getEnvFile";
import { Environment, Variable } from "database";

class Update {
  private environment!: Environment & { variables: Variable[] };

  async execute() {
    const configFile = getConfigFile();
    this.environment = await getEnvironment({ id: configFile.environmentId });

    if (this.checkVersion()) {
      this.showNothingToUpdate();
      return;
    }

    this.generateEnvFile();
    this.showEnvFileUpdated();
  }

  private checkVersion(): boolean {
    return this.latestVersionSync() === this.environment.version;
  }

  private latestVersionSync(): string | undefined {
    const envFile = getEnvFile();
    const regex = /#version:(\w+)/;
    const match = envFile.match(regex);

    return match?.[1];
  }

  private generateEnvFile() {
    generateEnvFile({
      version: this.environment.version,
      variables: this.environment.variables,
    });
  }

  private showNothingToUpdate() {
    console.log(
      `🐈 Version is already ${this.environment.version}, nothing to update!`,
    );
  }

  private showEnvFileUpdated() {
    console.log(`🐈 Environment file updated!`);
  }
}

const update = new Update();

export default update;
