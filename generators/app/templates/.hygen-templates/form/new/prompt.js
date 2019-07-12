const camelize = require('../../_utils/camelize')

module.exports = {
  prompt: ({ inquirer, args }) => {
    if (args.path && args.viewName && args.routeName) {
      return Promise.resolve({ allow: true })
    }
    return inquirer.prompt([{
      type: 'input',
      name: 'formName',
      message: 'Form name:'
    },
    {
      type: 'input',
      name: 'routeName',
      message: 'Route name:',
      default ({formName}) {
        return camelize(formName, '-') + 'FormRoute'
      }
    },
    {
      type: 'input',
      name: 'componentName',
      message: 'Component name:',
      default ({formName}) {
        return camelize(formName, '-') + 'Form'
      }
    }])
  }
}
