const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const envFile = require("dotenv").config().parsed;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const currentCountries = ["au", "nz", "hk", "uk"];

module.exports = (environment, argv) => {
  const isDev = argv.mode !== "production";
  const env = envFile ? envFile : process.env;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
  const region =
    process.env.REGION && currentCountries.includes(process.env.REGION)
      ? process.env.REGION
      : "au";

  const targetPath = path.resolve(__dirname, "dist");
  const config = {
    stats: { modules: false, performance: false },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json"
        })
      ]
    },
    entry: {
      client: "./src/client/index.tsx"
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },

        {
          test: /\.(png|jpe?g|gif|ico)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10240,
              name: "images/[name].[hash:8].[ext]",
              publicPath: isDev ? "/" : "/static"
            }
          }
        },
        // {
        //   test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        //   use: {
        //     loader: "url-loader",
        //     options: {
        //       limit: 10240,
        //       name: "fonts/[name].[ext]",
        //       publicPath: isDev ? "/" : "/static"
        //     }
        //   }
        // },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"]
        }
      ]
    },
    output: {
      filename: isDev ? "[name].js" : "[name].[contenthash].js",
      path: `${targetPath}/static`,
      publicPath: isDev ? "/" : "/static/"
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
      new webpack.DefinePlugin(envKeys)
    ],
    performance: {
      hints: false
    }
  };

  if (isDev) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "public/index.html"
      })
    );
    config.devtool = "source-map";
    config.devServer = {
      contentBase: "./public",
      port: 3000,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization"
      },
      proxy: {
        "/signIn": {
          target: process.env.BASE_PROXY_URL,
          changeOrigin: true
        },
        "/tickets": {
          target: process.env.BASE_PROXY_URL,
          changeOrigin: true
        },
        "/register": {
          target: process.env.BASE_PROXY_URL,
          changeOrigin: true
        }
      }
    };
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      enforce: "pre",
      loader: "tslint-loader",
      exclude: /node_modules/
    });
  } else {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    };
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: `public/templates/${region}/index.html`,
        filename: "../index.html"
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [targetPath]
      })
    );
  }

  return config;
};
