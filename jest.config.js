module.exports = {
    "preset": "ts-jest",
    "globals": {
        "ts-jest": {}
    },
    "automock": false,
    setupFiles: ['<rootDir>/jest.setup.js'],
}