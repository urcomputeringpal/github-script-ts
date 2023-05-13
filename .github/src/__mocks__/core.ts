import * as core from "@actions/core";

export const getInput: jest.MockedFunction<typeof core.getInput> = jest.fn();
export const setOutput: jest.MockedFunction<typeof core.setOutput> = jest.fn();
export const setFailed: jest.MockedFunction<typeof core.setFailed> = jest.fn();
export const info: jest.MockedFunction<typeof core.info> = jest.fn();
export const exportVariable: jest.MockedFunction<typeof core.exportVariable> = jest.fn();
export const setSecret: jest.MockedFunction<typeof core.setSecret> = jest.fn();
export const addPath: jest.MockedFunction<typeof core.addPath> = jest.fn();
export const getMultilineInput: jest.MockedFunction<typeof core.getMultilineInput> = jest.fn();
export const getBooleanInput: jest.MockedFunction<typeof core.getBooleanInput> = jest.fn();
export const debug: jest.MockedFunction<typeof core.debug> = jest.fn();
export const startGroup: jest.MockedFunction<typeof core.startGroup> = jest.fn();
export const endGroup: jest.MockedFunction<typeof core.endGroup> = jest.fn();
export const group: jest.MockedFunction<typeof core.group> = jest.fn();
export const saveState: jest.MockedFunction<typeof core.saveState> = jest.fn();
export const getState: jest.MockedFunction<typeof core.getState> = jest.fn();
export const setCommandEcho: jest.MockedFunction<typeof core.setCommandEcho> = jest.fn();
export const isDebug: jest.MockedFunction<typeof core.isDebug> = jest.fn();
export const error: jest.MockedFunction<typeof core.error> = jest.fn();
export const warning: jest.MockedFunction<typeof core.warning> = jest.fn();
export const getIDToken: jest.MockedFunction<typeof core.getIDToken> = jest.fn();
export const notice: jest.MockedFunction<typeof core.notice> = jest.fn();
export declare enum ExitCode {
    /**
     * A code indicating that the action was successful
     */
    Success = 0,
    /**
     * A code indicating that the action was a failure
     */
    Failure = 1,
}
