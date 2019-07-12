const camelize = require('../../_utils/camelize')

module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.path && args.viewName && args.routeName) {
      return Promise.resolve({ allow: true })
    }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: 'Route path (relative to src/application):',
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
