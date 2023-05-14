import { GitHubScriptArguments } from "@urcomputeringpal/github-script-ts";

export async function setEnv(args: GitHubScriptArguments): Promise<String> {
    const { core } = args;
    if (core === undefined) {
        throw new Error("core is undefined");
    }
    const name = process.env["VARIABLE_NAME"] ?? "NAME";
    const value = process.env["VARIABLE_VALUE"] ?? "";
    core.exportVariable(name, value);
    return "";
}
