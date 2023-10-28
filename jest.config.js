export default {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    // "@/(.*)":"<rootDir>/src/$1",
    "@domain/(.*)$": "<rootDir>/src/core/domain/$1",
    "@data/(.*)$": "<rootDir>/src/core/data/$1",
    "@presenter/(.*)$": "<rootDir>/src/presenter/$1",
  },
};
