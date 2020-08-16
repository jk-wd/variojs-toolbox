module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react",
  ];
  const plugins = [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          // WHEN ADJUSTING ALIASSES ALSO UPDATE tscinfig.json paths
          "@components": "./src/components",
          "@helpers": "./src/helpers",
          "@socketserver": "./src/socket-server",
          "@context": "./src/context",
          "@interfaces": "./src/interfaces",
          "@enums": "./src/enums",
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
