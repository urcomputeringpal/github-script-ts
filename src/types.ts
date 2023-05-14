import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as glob from "@actions/glob";
import * as io from "@actions/io";
import fetch from "node-fetch";

import { Context } from "@actions/github/lib/context";
import { Octokit } from "@octokit/rest";

export interface GitHubScriptArguments {
    github?: Octokit;
    context?: Context;
    core?: typeof core;
    exec?: typeof exec;
    glob?: typeof glob;
    io?: typeof io;
    fetch?: typeof fetch;
}
