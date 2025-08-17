# EnvCat

EnvCat is an open source tool for managing environment variables across local and cloud projects. It provides a CLI and web interface for secure, centralized, and versioned environment management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Effortless environment variable management via CLI and web UI
- Centralized variable storage for all your projects
- Secure and encrypted variable handling
- Versioning and history for environments
- Easy integration with local and cloud workflows

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/catfunction/envcat.git
cd envcat
pnpm install
```

## Usage

### CLI

Run the CLI to sync, update, or change environments:

```sh
pnpm --filter cli run execute
```

Available commands:

- `init` – Sync a project and generate config files
- `update` – Update environment with the latest version
- `change` – Change the active environment

### Web

Start the web app for a graphical interface:

```sh
pnpm --filter web run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `apps/cli` – Command-line interface for environment management
- `apps/web` – Next.js web application for managing projects and environments
- `packages/database` – Prisma database package
- `packages/eslint-config-custom` – Custom ESLint config
- `packages/tsconfig` – Shared TypeScript configs

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes and add tests
4. Commit and push your branch
5. Open a pull request describing your changes

## License

EnvCat is licensed under the [GNU GPL v3](./LICENSE).
