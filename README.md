# generator-nextbone
> Setup for Nextbone applications

## Features

 * Bundling with webpack
   * Configures `dev` npm script with a live server for development
   * Configures `prod` npm script for production   
 * Compilation with babel 7.x
   * Uses preset-env
   * Out of the box configured to support green browsers 
 * Preconfigured service-worker using [Workbox](https://github.com/GoogleChrome/workbox) 
 * Option to install CSS/UI frameworks
 * Option to install [bottlejs](https://github.com/young-steveo/bottlejs) (dependency injection micro library)
 * Option to install [hygen](https://github.com/jondot/hygen) templates (view, model, route)
 
## Installation

First, install [Yeoman](http://yeoman.io) and generator-nextbone using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-nextbone
```

## Usage

### Generate a new project

```bash
yo nextbone
```

The generator will ask for some options:

##### CSS/UI framework
  * none
  * Bootstrap 4 - with font awesome
  * Framework7 v2 (Coming soon)

##### Nextbone plugins
  * nextbone-modals
  * nextbone-radio
  
##### Extra libraries 
  * bottlejs (dependency injection micro library)
  * hygen templates (needs hygen installed globally):
    * `hygen model new` - creates a Model and Collection descendant
    * `hygen component new` - creates a web component
    * `hygen route new` - creates a route with associated component


### Build the application

For development (a server will be started usually at http://localhost:8080)
```bash
npm run dev 
```

For production
```bash
npm run prod
```

## License

MIT © [Luiz Américo Pereira Câmara]()


[npm-image]: https://badge.fury.io/js/generator-nextbone.svg
[npm-url]: https://npmjs.org/package/generator-nextbone
[travis-image]: https://travis-ci.org/blikblum/generator-nextbone.svg?branch=master
[travis-url]: https://travis-ci.org/blikblum/generator-nextbone
[daviddm-image]: https://david-dm.org/blikblum/generator-nextbone.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/blikblum/generator-nextbone
