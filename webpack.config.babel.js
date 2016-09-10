import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import pkg from "./package.json"
import StatsPlugin from "stats-webpack-plugin"

export const makeConfig = (config = {}) => {
  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    ...config.production && {
      devtool: "source-map",
    },
    module: {
      noParse: /\.min\.js/,
      loaders: [
        {
          // phenomic requirement
          test: /\.md$/,
          loader: "phenomic/lib/phenomic-loader",
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev
              ? "?cacheDirectory=true&presets[]=babel-preset-react-hmre"
              : "?cacheDirectory=true"
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "web_modules"),
          ],
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader" + (
              "?modules"+
              "&localIdentName=" +
              (
                process.env.NODE_ENV === "production"
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              ).toString()
            ) + "!" +
            "postcss-loader",
          ),
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?sourceMap&-minimize!postcss-loader",
          ),
          include: /node_modules/,
        },
        {
          test: /content(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader?name=[path][name].[ext]&context=./content",
        },
        {
          test: /web_modules(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader",
          query: {
            name: "images/[path][name].[ext]",
            context: "./web_modules",
          },
        },
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
      ],
    },

    externals: [],

    phenomic: {
      context: path.join(__dirname, config.source),
      feedsOptions: {
        title: pkg.name,
        site_url: pkg.homepage,
      },
      feeds: {
        "feed.xml": {
          collectionOptions: {
            filter: { layout: "Post" },
            sort: "date",
            reverse: true,
            limit: 20,
          },
        },
      },
    },

    postcss: () => [
      require("postcss-cssnext")({
        features: {
          autoprefixer: false,
          customProperties: {
            variables: {
              colorBg: "white",
              colorBlack: "#111",
              colorSlate: "#505d6b",
              colorAccent: "#4078c0",
              colorPrimary: " #1abc9c",
              navWidth: "300px",
              collapsedNavWidth: "64px",
              xpad: "24px",
              line: "rgba(17, 17, 17, 0.1)", // color(#111 a(0.1))
            },
          },
          customMedia: {
            extensions: {
              "--sm": "screen and (min-width: 35.5rem)",
              "--md": "screen and (min-width: 48rem)",
              "--lg": "screen and (min-width: 64rem)",
              "--xl": "screen and (min-width: 80rem)",
            },
          },
        },
      }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
      require("cssnano")({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: [
            "last 2 versions",
            "ie >= 9",
            "iOS >= 6",
            "Android >= 4",
          ],
        },
        discardComments: {
          removeAll: true,
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true,
      }),
    ],

    plugins: [
      new StatsPlugin("stats.json", {
        chunkModules: true,
        exclude: [ /node_modules[\\\/]react/ ],
      }),
      new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
      ...config.production && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
          {
            compress: {
              warnings: false,
              screw_ie8: true,
            },
            mangle: {
              screw_ie8: true,
            },
            output: {
              comments: false,
              screw_ie8: true,
            },
          }
        ),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      ...config.dev && {
        filename: "[name].[hash].js",
      },
      ...config.production && {
        filename: "[name].[chunkhash].js",
      },
    },

    resolve: {
      extensions: [ ".js", ".json", "" ],
      root: [ path.join(__dirname, "node_modules") ],
    },
    resolveLoader: { root: [ path.join(__dirname, "node_modules") ] },
  }
}
