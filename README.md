# github-script-ts

A workflow wrapping https://github.com/actions/github-script/ with Typescript functionality. Export functions from a module like the one in [`.github`](./.github) and call them easily by name.

## Usage

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
