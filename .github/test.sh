#!/bin/bash

set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

gh extension install https://github.com/nektos/gh-act || gh extension upgrade nektos/gh-act || true

cd ${SCRIPT_DIR}/..

gh act -l

gh act pull_request \
    -s GITHUB_TOKEN=${GITHUB_TOKEN} \
    -W .github/workflows/test.yaml \
    -e .github/fixtures/pull_request/main.json
