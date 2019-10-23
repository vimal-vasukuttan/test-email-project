const dts = require('dts-bundle')
const path = require('path')

class DeclarationBundlerPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('DeclarationBundlerPlugin', compiler => {
      try {
        dts.bundle(this.options)
      } catch (e) {
        console.error(e)
      }
    })
  }
}

function BaseConfig(options) {
  return {
    mode: options.mode,
    target: 'node',
    entry: options.entry,
    watch: process.argv.some(arg => arg === '--watch'),
    watchOptions: {
      aggregateTimeout: 50,
      poll: 200
    },
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    externals: ['hiredis'],
    stats: {
      warningsFilter: ['any-promise']
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve('tsconfig.json')
              }
            }
          ]
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    output: options.output,
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.json'],
      alias: {
        '@bully': path.resolve('src'),
        koa: path.resolve('node_modules', 'koa'),
        'koa-router': path.resolve('node_modules', 'koa-router')
      }
    },
    plugins: options.plugins
  }
}

const productionConfig = new BaseConfig({
  mode: 'production',
  entry: path.resolve('src', 'main.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'Main.js',
    sourceMapFilename: 'Main.js.map'
  },
  plugins: [
    // new DeclarationBundlerPlugin({
    //   name: 'BuLLy',
    //   main: path.resolve('dist', 'index.d.ts'),
    //   out: path.resolve('dist', 'BuLLyApm.d.ts')
    // })
  ]
})

module.exports = [ productionConfig ]
