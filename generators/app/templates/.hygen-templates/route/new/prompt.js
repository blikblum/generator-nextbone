const { camelize, getRootDirectories } = require('../../utils')
const { join } = require('path')

module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.path && args.viewName && args.routeName) {
      return Promise.resolve({ allow: true })
    }
    let currentScope

    return inquirer.prompt([
      {
        type: 'list',
        name: 'scope',
        message: 'Scope:',
        choices() {
          return getRootDirectories()
        },
      },
      {
        type: 'input',
        name: 'path',
        message({ scope }) {
          currentScope = scope
          return `Path (relative to src/${scope})`
        },
      },
      {
        type: 'input',
        name: 'routeName',
        message: 'Route name:',
        default({ path }) {
          return camelize(path, '/') + 'Route'
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element Tag:',
        default({ path }) {
          return path.replace('/', '-') + '-view'
        },
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:',
        default({ tagName }) {
          return camelize(tagName, '-')
        },
      },
    ])
  },
}
