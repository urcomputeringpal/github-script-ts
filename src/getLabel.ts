import { GitHubScriptArguments } from "./types";

export async function getLabel(args: GitHubScriptArguments): Promise<String> {
    const { github, context, core } = args;
    if (github === undefined || context === undefined || core === undefined) {
        throw new Error("Need github");
    }

    if (process.env.PR_NUMBER === undefined || process.env.PR_NUMBER === "") {
        throw new Error("Need PR_NUMBER env variable");
    }
    console.log(`PR number: ${process.env.PR_NUMBER}`);

    if (process.env.LABEL === undefined) {
        throw new Error("Need LABEL env variable");
    }

    const response = await github.rest.issues.listLabelsOnIssue({
        ...context.repo,
        issue_number: parseInt(process.env.PR_NUMBER),
    });
    const labels = response.data.filter(label => label.name.toLowerCase() == process.env.LABEL!.toLowerCase());

    if (labels.length == 0) {
        console.log(`No matching label`);
        return "";
    } else {
        console.log(`Found matching label`);
        return labels[0].name;
    }
}
