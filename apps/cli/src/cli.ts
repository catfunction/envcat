import { program } from "commander";
import init from "@src/application/init";
import update from "@src/application/update";
import change from "@src/application/change";

program
  .name("envcat cli")
  .description("Environments variables sync cli 🚀")
  .version("0.0.1");

program
  .command("init")
  .description("Sync a project")
  .action(() => init.execute());

program
  .command("update")
  .description("Update a environment with the latest version")
  .action(() => update.execute());

program
  .command("change")
  .description("Change the active environment")
  .action(() => change.execute());

program.parse();
