var dependencyMap = require('../dependencymap')
var packageVersionMap = require('../packageversionmap')

function reduceField (requirements, fieldName, callback, initial) {
  return requirements.reduce(function (memo, item) {
    var def = dependencyMap[item] || {dependencies: [item]}
    var entry = def[fieldName]
    if (entry) return callback(memo, entry)
    return memo
  }, initial)
}

function addDependencies (memo, dependencies) {
  dependencies.forEach(function (dependency) {
    var packageVersion
    var packageName = dependency
    var packageInfo = packageVersionMap[dependency] || {}
    if (typeof packageInfo === 'string') {
      packageVersion = packageInfo
    } else {
      packageName = packageInfo.name || packageName
      packageVersion = packageInfo.version || '*'
    }
    memo[packageName] = packageVersion
  })
  return memo
}

function concatHeaderBody (memo, item) {
  if (item.header) memo.header += `\n${item.header}`
  if (item.body) memo.header += `\n${item.body}`
  return memo
}

class ConfigBuilder {
  constructor (generator) {
    this.requirements = []
    this.generator = generator
  }

  addRequirement (requirement) {
    if (requirement && this.requirements.indexOf(requirement) === -1) this.requirements.push(requirement)
  }

  hasRequirement (requirement) {
    return this.requirements.indexOf(requirement) !== -1
  }

  getSetupDef () {
    let setupDef = { header: '', body: '' }    
    return reduceField(this.requirements, 'setup', concatHeaderBody, setupDef)
  }

  getSassDef () {
    return reduceField(this.requirements, 'sass', concatHeaderBody, {header: '', body: ''})
  }

  savePackageFile () {
    var fileContents = this.generator.fs.readJSON(this.generator.templatePath('package.json'))
    var dependencies = reduceField(this.requirements, 'dependencies', addDependencies, {})
    var devDependencies = reduceField(this.requirements, 'devDependencies', addDependencies, {})
    Object.assign(fileContents.dependencies, dependencies)
    Object.assign(fileContents.devDependencies, devDependencies)
    this.generator.fs.writeJSON(this.generator.destinationPath('package.json'), fileContents)
  }

  saveWebpackConfigFile () {
    var loadersDef = reduceField(this.requirements, 'loaders', function (memo, loaders) {
      loaders.forEach(function (item) {
        if (item.body) memo.body += ',' + item.body
        if (item.require) memo.require += ',' + item.require
      })
      return memo
    }, {require: '', body: ''})

    var babelIncludes = reduceField(this.requirements, 'babelIncludes', function (memo, includes) {
      return memo.concat(includes)
    }, ['src'])

    // dedupe, resolve/quote and join
    babelIncludes = Array.from(new Set(babelIncludes)).map(include => `path.resolve('${include}')`).join(',')

    this.generator.fs.copyTpl(
      this.generator.templatePath('webpack.config.js'),
      this.generator.destinationPath('webpack.config.js'),
      {loaderBody: loadersDef.body, require: loadersDef.require, babelIncludes}
    )
  }
}

module.exports = ConfigBuilder
