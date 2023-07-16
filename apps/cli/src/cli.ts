import { program } from "commander";
import init from "@src/application/init";

program
  .name("envcat cli")
  .description("Environments variables sync cli 🚀")
  .version("0.0.1");

program
  .command("init")
  .description("Sync a project")
  .action(() => init.execute());
program.parse();
