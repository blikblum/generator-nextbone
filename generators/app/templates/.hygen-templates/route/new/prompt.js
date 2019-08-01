const { camelize, getRootDirectories } = require('../../utils')

module.exports = {
  prompt: ({ prompter, args }) => {
    if (args.path && args.viewName && args.routeName) {
      return Promise.resolve({ allow: true })
    }

    return prompter.prompt([
      {
        type: 'select',
        name: 'scope',
        message: 'Scope:',
        choices() {
          return getRootDirectories()
        },
      },
      {
        type: 'input',
        name: 'path',
        message({ answers }) {
          return `Path (relative to src/${answers.scope})`
        },
      },
      {
        type: 'input',
        name: 'routeName',
        message: 'Route name:',
        initial() {
          return camelize(this.state.answers.path, '/') + 'Route'
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element Tag:',
        initial() {
          return this.state.answers.path.replace('/', '-') + '-view'
        },
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
