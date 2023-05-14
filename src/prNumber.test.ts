import { GitHubScriptArguments } from "./types";
import { prNumber } from "./prNumber";
import { Context } from "@actions/github/lib/context";
import * as core from "./__mocks__/core";
import { Octokit } from "@octokit/rest";

jest.mock("@octokit/rest", () => {
    const Octokit = class MockOctokit {
        rest = {
            pulls: {
                list: jest.fn().mockReturnValue({
                    data: [{ number: 5678 }],
                }),
            },
        };
    };

    return { Octokit };
});

describe("prNumber", () => {
    it("should set the prNumber from the context", async () => {
        const context: Context = {
            payload: {
                pull_request: {
                    number: 1234,
                },
            },
            issue: {
                number: 1234,
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
            context: context,
            core: core,
        };

        const stringNumber = await prNumber(args);

        expect(stringNumber).toEqual("1234");
    });

    it("or from the API if not present", async () => {
        const context: Context = {
            payload: {
                pull_request: undefined,
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
            context: context,
            github: new Octokit(),
            core: core,
        };

        const stringNumber = await prNumber(args);

        expect(stringNumber).toEqual("5678");
    });
});
