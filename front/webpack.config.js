const Dotenv = require("dotenv-webpack")

module.exports = {
    entry: "./scripts/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js",
    },
    plugins: [
        new Dotenv()
      ],
};