import { GitHubScriptArguments } from "./types";
import { getLabel } from "./getLabel";
import { Context } from "@actions/github/lib/context";
import * as core from "./__mocks__/core";
import { Octokit } from "@octokit/rest";

jest.mock("@octokit/rest", () => {
    const Octokit = class MockOctokit {
        rest = {
            issues: {
                listLabelsOnIssue: jest.fn().mockReturnValue({
                    data: [{ name: "Test" }],
                }),
            },
        };
    };

    return { Octokit };
});

describe("getLabel", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = {
            ...originalEnv,
        };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it("should get the provided label", async () => {
        process.env.PR_NUMBER = "1234";
        process.env.LABEL = "Test";

        const context: Context = {
            payload: {
                workflow_dispatch: {
                    ref: "refs/heads/test",
                },
            },
            issue: {
                number: 0,
                owner: "",
                repo: "",
            },
            repo: {
                owner: "",
                repo: "",
            },
            eventName: "",
            sha: "",
            ref: "",
            workflow: "",
            action: "",
            actor: "",
            job: "",
            runNumber: 0,
            runId: 0,
            apiUrl: "",
            serverUrl: "",
            graphqlUrl: "",
        };

        const args: GitHubScriptArguments = {
            github: new Octokit(),
            context: context,
            core: core,
        };

        const label = await getLabel(args);

        expect(label).toEqual("Test");
    });
});
