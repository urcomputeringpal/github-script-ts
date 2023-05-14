module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "@actions/core": "<rootDir>/src/__mocks__/core.ts",
    },
};
