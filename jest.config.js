export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "js-jest",
    },
  
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  };
  