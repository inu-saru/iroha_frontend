const path = require("path")
const { loadConfigFromFile, mergeConfig } = require("vite")
const svgrPlugin = require("vite-plugin-svgr")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  features: {
    storyStoreV7: true
  },

  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    )

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [
        svgrPlugin.default({
          svgrOptions: {
            icon: true
          }
        })
      ]
    })
  },

  docs: {
    autodocs: true
  }
}
