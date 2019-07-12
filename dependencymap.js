module.exports = {
  hygen: {
    dependencies: []
  },

  bootstrap4: {
    dependencies: ['bootstrap4', 'popper.js', 'font-awesome', 'jquery'],
    devDependencies: ['url-loader', 'file-loader'],
    loaders: [
      {
        body: `{
      test: /\\.(woff|woff2)$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\\.ttf$/,
      use: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\\.eot$/,
      use: "file-loader"
    }, {
      test: /\\.svg$/,
      use: "url-loader?limit=10000&mimetype=image/svg+xml"
    }`
      }
    ],
    sass: {
      header: `
@import "~bootstrap/scss/bootstrap";
$fa-font-path: "~font-awesome/fonts";
@import '~font-awesome/scss/font-awesome.scss';
`
    }
  },

  framework7: {
    dependencies: ['framework7', 'nextbone-f7'],
    devDependencies: ['file-loader'],
    babelIncludes: ['node_modules/framework7', 'node_modules/dom7', 'node_modules/template7'],
    loaders: [
      {
        body: `{
        test: /\\.png$/,
        use: "file-loader"
      }`
      }
    ],
    setup: {
      header: `import 'framework7/dist/css/framework7.css'
import Framework7 from 'framework7'
import Popup from 'framework7/dist/components/popup/popup.js'
`,
      body: `Framework7.use([Popup])`
    }
  }
}
