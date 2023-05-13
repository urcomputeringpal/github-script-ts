import * as core from "@actions/core";
import { Context } from "@actions/github/lib/context";
import { Octokit } from "@octokit/rest";

export interface GitHubScriptArguments {
    github?: Octokit;
    context?: Context;
    core?: typeof core;
}
