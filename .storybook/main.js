const projectConfig = require('../webpack.config')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  typescript: {
    check: false,
    checkOptions: {},
  },
  webpackFinal: async (config, { configType }) => {
    const storybookRules = config.module.rules.filter((rule) => !rule.test.source.includes('css'))
    const projectRules = projectConfig.module.rules.filter((rule) => !rule.test.source.includes('woff'))
  
    config.module.rules = storybookRules.concat(projectRules)
    config.resolve.modules.push('./src/')
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript', 'css', 'html'],
        features: ['suggest', 'snippets', 'hover']
      })
    )
  
    return config;
  },
};
