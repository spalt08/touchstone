const projectConfig = require('../webpack.config')

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  typescript: {
    check: false,
    checkOptions: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules = config.module.rules.concat(projectConfig.module.rules)
    config.resolve.modules.push('./src/')
    return config;
  },
};
