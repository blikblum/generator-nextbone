const { camelize, getRootDirectories } = require('../../utils')
const { normalize } = require('path')

module.exports = {
  prompt: ({ prompter, args }) => {
    if (args.name) {
      return Promise.resolve({ allow: true })
    }

    return prompter.prompt([
      {
        type: 'select',
        name: 'scope',
        message: 'Scope:',
        choices() {
          return ['global', ...getRootDirectories()]
        },
      },
      {
        type: 'input',
        name: 'path',
        message({ answers }) {
          const scope = answers.scope
          return `Path (relative to src/${scope === 'global' ? 'common/components' : scope})`
        },
        result(path) {
          const scope = this.state.answers.scope
          const basePath = scope === 'global' ? 'common/components' : scope
          return normalize(`src/${basePath}/${path}/`).replace(/\\/gm, '/')
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
        initial() {
          return camelize(this.state.answers.tagName, '-')
        },
      },
    ])
  },
}
