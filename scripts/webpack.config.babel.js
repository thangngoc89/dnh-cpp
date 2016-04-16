import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

export default ({ config, pkg }) => ({
  ...config.dev && {
    devtool: "#cheap-module-eval-source-map",
  },
  module: {
    loaders: [
      { // phenomic requirement
        test: /\.md$/,
        loader: "phenomic/lib/content-loader",
        query: {
          context: path.join(config.cwd, config.source),
          // renderer: (text) => html
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
        exclude: [
          /README\.md/,
          /muc\-luc\.md/,
        ],
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
        include: [
          /README\.md/,
          /muc\-luc\.md/,
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" + (
            "?sourceMap&-minimize&modules"+
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
            navWidth: "250px",
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
        browsers: [ "last 2 versions", "ie >= 9", "iOS >= 6", "Android >= 4" ],
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
    new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
    new webpack.DefinePlugin({ "process.env": {
      NODE_ENV: JSON.stringify(
        config.production ? "production" : process.env.NODE_ENV
      ),
      PHENOMIC_PATHNAME: JSON.stringify(process.env.PHENOMIC_PATHNAME),
    } }),
    ...config.production && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  ],

  output: {
    path: path.join(config.cwd, config.destination),
    publicPath: config.baseUrl.pathname,
    filename: "[name].[hash].js",
  },

  resolve: {
    extensions: [ ".js", ".json", "" ],
    root: [ path.join(config.cwd, "node_modules") ],
  },
  resolveLoader: { root: [ path.join(config.cwd, "node_modules") ] },
})
