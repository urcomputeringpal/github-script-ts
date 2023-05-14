# github-script-ts

A workflow wrapping https://github.com/actions/github-script with Typescript functionality.

## Features

-   Enables easily running Typescript functions exported from a tiny private module like the one in [`.github/`](./.github/) in Actions workflows. Caches build results automatically.
-   Enables a local testing workflow for advanced Actions logic.
-   Provides a superior experience to editing Javascript embedded in YAML.

## Usage

### Writing scripts

The [`@urcomputeringpal/github-script-ts`](https://www.npmjs.com/package/@urcomputeringpal/github-script-ts) package contains a type definition for the [arguments](https://github.com/actions/github-script#actionsgithub-script) passed to your script. Put all of these files in `.github` to create scripts of your own:

#### `src/function1.ts`

```typescript
import { GitHubScriptArguments } from "@urcomputeringpal/github-script-ts";

export async function function1(args: GitHubScriptArguments): Promise<String> {
    // const { github, context, core } = args;
    // const { glob, io, exec, fetch } = args;
    // ...
    return "string";
}
```

#### `src/index.ts`

```typescript
export { function1 } from "./function1";
```

#### `tsconfig.json`

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "declaration": true,
        "target": "es5",
        "strict": true,
        "outDir": "dist",
        "esModuleInterop": true
    },
    "include": ["src/*.ts"],
    "exclude": ["node_modules", "**/*.test.ts"]
}
```

#### `package.json`

```json
{
    "name": "ts-scripts",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "build": "tsc"
        // Build will be run as needed by this Action, don't specify it here
        // prepare: ""
    },
    "files": ["dist/**/*.d.ts", "dist/**/*.js"],
    "main": "dist/index.js",
    "dependencies": {
        "@urcomputeringpal/github-script-ts": "0.0.1"
    }
}
```

### Running your script in a workflow

See [`action.yml`](./action.yml) for all accepted inputs.

```yaml
- name: Checkout repository
  uses: actions/checkout@v3

  # Perform setup if called without a 'function'. Compiles your Typescript
  # module and caches build results with actions/cache.
- name: Setup TypeScript scripts
  id: github-script-ts
  uses: urcomputeringpal/github-script-ts@v0
  with:
      # path: ./.github
      # build: npm run build
      # dist: dist

  # Run function1. If it returns a value it can be used in subsequent steps
  # by accessing the `result` output of the step like so
  # ${{ steps.function1.outputs.result }}
- name: Run function1
  id: function1
  uses: urcomputeringpal/github-script-ts@v0
  # You can pass environment variables to your script and then
  # read them from process.env.
  # https://github.com/actions/github-script/#use-env-as-input
  env:
      FOO: bar
  with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      function: function1
      # args: >
      #   {github, context, core, exec, io, fetch}
      # path: ./.github
      # dist: dist
      # result-encoding: string

- name: Use function1 result
  run: |
      echo "function1 result: ${{ steps.function1.outputs.result }}"

  # If you want to set multiple outputs or influence the environment,
  # use actions/github-script directly and import your module from
  # the path specified in the `github-script-ts` step. The `result`
  # output will still be set to the return value of your script.
- name: Run custom function using actions/github-script
  id: custom
  uses: actions/github-script@v6
  # You can pass environment variables to your script and then
  # read them from process.env.
  # https://github.com/actions/github-script/#use-env-as-input
  env:
      FOO: bar
  with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      result-encoding: string
      script: |
          const { custom } = await import("${{ steps.github-script-ts.outputs.module }}");
          // custom can call core.exportVariable, core.setOutput, etc.
          return await custom({core,context});
```
