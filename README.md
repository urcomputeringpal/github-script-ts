# github-script-ts

A workflow wrapping https://github.com/actions/github-script with Typescript functionality.

## Features

- Enables easily running Typescript functions exported from a module like the one in [`.github/`](./.github/) in Actions workflows. Builds and caches build results automatically.
- Allows writing tests for your scripts and running them locally with `npm test`.
- Provides a superior experience to editing Javascript embedded in YAML.

## Usage

### Writing scripts

The `@urcomputeringpal/github-script-ts` package contains a type definition for the [arguments](https://github.com/actions/github-script#actionsgithub-script) passed to your script. Put all of these files in `.github` to create scripts of your own:

#### `src/function1.ts`

```typescript
import { GitHubScriptArguments } from "@urcomputeringpal/github-script-ts";

export async function function1(args: GitHubScriptArguments): Promise<String> {
    // const { github, context, core } = args;
    // const { glob, io, exec, fetch } = args;
    // ...
    return 'string';
}
```

#### `src/index.ts`

```typescript
export { function1 } from "./function1";
```

#### `package.json`

```json
{
    "name": "ts-scripts",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "build": "tsc",
    },
    "dependencies": {
        "@urcomputeringpal/github-script-ts": "0.0.1"
    }
}
```

#### `tsconfig.json`

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "declaration": true,
        "target": "es5",
        "strict": true
    },
    "include": ["src/*.ts"],
    "exclude": ["node_modules", "**/*.test.ts"]
}
```

### Running your script in a workflow

```yaml
- name: Checkout repository
  uses: actions/checkout@v3

  # Perform setup. Caches build results with actions/cache.
  # Expects a package.json with a "build" script that exports
  # functions that accept the following arguments
  # (see .github/src/types.ts):
  #
  # * github - A pre-authenticated octokit/rest.js client with pagination plugins
  # * context - An object containing the context of the workflow run
  # * core - A reference to the @actions/core package

- name: Setup TypeScript scripts
  uses: urcomputeringpal/github-script-ts@v0

  # Run function1. If it returns a value it can be used in subsequent steps
  # by accessing the `result` output of the step like so
  # ${{ steps.function1.outputs.result }}
- name: Run function1
  id: function1
  uses: urcomputeringpal/github-script-ts@v0
  with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      function: function1

- name: Use function1 result
  run: |
      echo "function1 result: ${{ steps.function1.outputs.result }}"
```
