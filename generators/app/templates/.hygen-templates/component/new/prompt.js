const { camelize, getRootDirectories } = require('../../utils')
const { normalize } = require('path')

module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.name) {
      return Promise.resolve({ allow: true })
    }

    // filter does not accepts previous answers. https://github.com/SBoudrias/Inquirer.js/issues/804
    let currentScope

    return inquirer.prompt([
      {
        type: 'list',
        name: 'scope',
        message: 'Scope:',
        choices() {
          return ['global', ...getRootDirectories()]
        },
      },
      {
        type: 'input',
        name: 'path',
        message({ scope }) {
          currentScope = scope
          return `Path (relative to src/${scope === 'global' ? 'common/components' : scope})`
        },
        filter(path) {
          const basePath = currentScope === 'global' ? 'common/components' : currentScope
          return normalize(`src/${basePath}/${path}`).replace(/\\/gm, '/')
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element tag:',
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
