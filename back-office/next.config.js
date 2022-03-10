/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  lessVarsFilePath: './src/styles/variables.less',
  lessVarsFilePathAppendToEndOfContent: false,
  trailingSlash: true,
  cssLoaderOptions: {
    mode: 'local',
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    exportLocalsConvention: 'camelCase',
    exportOnlyLocals: false,
    getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name'
    },
  },

  webpack(config) {
    return config
  },
})
