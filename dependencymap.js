module.exports = {
  hygen: {
    dependencies: []
  },

  bootstrap4: {
    dependencies: [
      'bootstrap4',
      'popper.js',
      'font-awesome',
      'jquery',
      'chart.js',
      'nextbone-routing',
      'nextbone-radio'
    ],
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
    dependencies: ['framework7', 'wc-f7'],
    devDependencies: ['url-loader', 'file-loader'],
    babelIncludes: ['node_modules/framework7', 'node_modules/dom7', 'node_modules/template7'],
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
      },
      {
        body: `{
        test: /\\.png$/,
        use: "file-loader"
      }`
      }
    ],
    setup: {
      header: `import 'framework7/css/framework7.bundle.css'
      // Import Icons and App Custom Styles
import '../styles/icons.css'
import '../styles/app.css'

`
    }
  }
}
