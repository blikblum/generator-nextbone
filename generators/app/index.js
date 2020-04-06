'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')
const yosay = require('yosay')
const commandExists = require('command-exists')
const ConfigBuilder = require('../../utils/configbuilder')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.DEVMODE = this.fs.exists(path.join(this.sourceRoot(), '..', '..', '..', 'yarn.lock'))
    this.builder = new ConfigBuilder(this)
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to ' + chalk.red('generator-mn') + '. A generator for Nextbone Applications!')
    )

    let prompts = [
      {
        name: 'name',
        default: '',
        message: 'Application name',
        when: function () {
          return false // disable for now
        },
      },
      {
        name: 'description',
        default: '',
        message: 'Application description',
        when: function () {
          return false // disable for now
        },
      },
      {
        type: 'list',
        name: 'css',
        message: 'Select a CSS/UI framework',
        choices: [
          { name: 'None', value: 'none', short: 'No CSS/UI framework' },
          { name: 'Bootstrap 4', value: 'bootstrap4', short: 'Bootstrap v4' },
          { name: 'Framework7', value: 'framework7', short: 'Framework7 mobile framework' },
        ],
      },
      {
        type: 'checkbox',
        name: 'nextbone-libraries',
        message: 'Nextbone libraries',
        choices: [{ name: 'nextbone-modals' }],
      },
      {
        type: 'checkbox',
        name: 'extra',
        message: 'Extra features',
        choices: [
          { name: 'next-service', short: 'Dependency injection library' },
          { name: 'hygen', short: 'Code generator (preconfigured for model, view, route)' },
        ],
      },
    ]

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.DEVMODE && this.log('props', JSON.stringify(props))

      const addRequirement = this.builder.addRequirement.bind(this.builder)
      const requirementProps = ['nextbone-libraries', 'extra', 'css']

      requirementProps.forEach((propName) => {
        const propValue = props[propName]
        if (Array.isArray(propValue)) {
          propValue.forEach(addRequirement)
        } else {
          addRequirement(propValue)
        }
      })

      this.props = props
    })
  }

  writing() {
    let setupDef = this.builder.getSetupDef()
    let sassDef = this.builder.getSassDef()

    this.builder.savePackageFile()
    this.builder.saveWebpackConfigFile()

    this.fs.copy(this.templatePath(`src/${this.props.css}`), this.destinationPath('src'))

    this.fs.copy(
      this.templatePath('common/component.js'),
      this.destinationPath('src/common/component.js')
    )

    if (this.builder.hasRequirement('hygen')) {
      this.fs.copy(this.templatePath('_hygen.js'), this.destinationPath('.hygen.js'))
      this.fs.copy(this.templatePath('.hygen-templates'), this.destinationPath('.hygen-templates'))
    }

    if (this.builder.hasRequirement('next-service')) {
      this.fs.copy(
        this.templatePath('setup/services.js'),
        this.destinationPath('src/setup/services.js')
      )
    }

    this.fs.copy(this.templatePath('setup/icons.js'), this.destinationPath('src/setup/icons.js'))
    this.fs.copy(
      this.templatePath('setup/components.js'),
      this.destinationPath('src/setup/components.js')
    )
    this.fs.copyTpl(
      this.templatePath('setup/main.js'),
      this.destinationPath('src/setup/main.js'),
      setupDef
    )
    this.fs.copyTpl(this.templatePath('main.scss'), this.destinationPath('src/main.scss'), sassDef)
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'))
    this.fs.copy(this.templatePath('_jsconfig.json'), this.destinationPath('jsconfig.json'))
    this.fs.copy(this.templatePath('_babel.config.js'), this.destinationPath('babel.config.js'))
    this.fs.copy(
      this.templatePath('_prettier.config.js'),
      this.destinationPath('prettier.config.js')
    )
    this.fs.copy(this.templatePath('_eslintrc.js'), this.destinationPath('.eslintrc.js'))
    this.fs.copy(this.templatePath('_browserslistrc'), this.destinationPath('.browserslistrc'))
  }

  install() {
    const isYarnAvailable = commandExists.sync('yarnpkg')
    this.installDependencies({
      yarn: isYarnAvailable,
      npm: !isYarnAvailable,
      bower: false,
    })
  }
}
