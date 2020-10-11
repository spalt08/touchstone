module.exports = {
  stories: ['../src/**/*.story.@(tsx|mdx)'],
  typescript: {
    check: false,
    checkOptions: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push('./src/')
    return config;
  },
};
