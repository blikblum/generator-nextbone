module.exports = {
  prompt: ({ prompter, args }) => {
    if (args.name && typeof args.collection === 'string') {
      return Promise.resolve({ allow: true })
    }
    return prompter.prompt([
      {
        type: 'select',
        name: 'fileScope',
        message: 'Scope:',
        choices: ['local', 'global'],
      },
      {
        type: 'input',
        skip() {
          return this.state.answers.fileScope === 'global'
        },
        name: 'path',
        message: 'Model path:',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Model name:',
      },
      {
        type: 'input',
        name: 'collection',
        message: 'Collection name:',
        initial() {
          return this.state.answers.name + 's'
        },
      },
    ])
  },
}
