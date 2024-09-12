const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack");
const path = require("path");

const {
  dependencies: deps,
  devDependencies: devDeps,
} = require("./package.json");

console.log({
  deps: Object.keys(deps),
});

module.exports = (_, args) => {
  const isProduction = args.mode == "production" ? true : false;

  const port = args.port ?? 3001;

  const productionPlugins = [
    new ModuleFederationPlugin({
      name: "microf_1",
      filename: "microf_1.js",
      exposes: {
        "./App": "./src/App",
        "./Test1": "./src/components/Test1",
        "./Test2": "./src/components/Test2",
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
      path: path.resolve("./dist"),
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
