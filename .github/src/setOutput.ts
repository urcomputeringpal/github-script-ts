import { GitHubScriptArguments } from "@urcomputeringpal/github-script-ts";

export async function setOutput(args: GitHubScriptArguments): Promise<String> {
    const { core } = args;
    if (core === undefined) {
        throw new Error("core is undefined");
    }
    const name = process.env["OUTPUT_NAME"] ?? "NAME";
    const value = process.env["OUTPUT_VALUE"] ?? "";
    core.exportVariable(name, value);
    core.setOutput(name, value);
    return "";
}
