const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const { resolve } = require("path");

const deps = require("./package.json").dependencies;

module.exports = (_, args) => {
  const isProduction = args.mode == "production" ? true : false;

  const port = args.port ?? 3000;

  const productionPlugins = [
    new ModuleFederationPlugin({
      name: "microf-1",
      filename: "microf-1.js",
      expose: {
        "./App": "./src/App",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ];

  return {
    output: {
      filename: `[name].js`,
      publicPath: `http://localhost:${port}/`,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
        "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      },
    },

    devServer: {
      port: port,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                configFile: "tsconfig.json",
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      ...productionPlugins,
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
  };
};
