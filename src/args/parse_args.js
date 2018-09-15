const buildConfig = require('./build_config.js')
const fileConfig = require('./file_config.js')

module.exports = (args) => {
  if (args.length === 0)
    return buildConfig()

  return fileConfig(args)
}
