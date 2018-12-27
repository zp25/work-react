/**
 * 参考
 * https://github.com/danethurber/webpack-manifest-plugin.git
 */

const path = require('path');

class ManifestPlugin {
  /**
   * 获取添加hash前的文件名
   * @param  {string} fname 文件名称
   * @return {string}
   */
  static originalFilename(fname) {
    const extname = path.extname(fname);
    const basename = path.basename(fname, extname);

    const arr = basename.replace(/[-_]/g, '.').split('.');

    return arr[0] + extname;
  }

  static jsonStringifyPretty(json) {
    return JSON.stringify(json, null, 2);
  }

  constructor(options = {}) {
    const init = {
      path: '',
      filename: 'manifest.json',
      ignore: ['.map'],
    };

    this.options = typeof options === 'object' ? (
      Object.assign({}, init, options)
    ) : init;

    // module assets文件名完全修改，需记录原文件名
    this.assets = {};
    this.manifest = {};
  }

  apply(compiler) {
    // Runs a plugin after a compilation has been created.
    compiler.hooks.compilation.tap('ManifestPlugin', (compilation) => {
      // An asset from a module was added to the compilation.
      compilation.hooks.moduleAsset.tap('ManifestPlugin', (module, filename) => {
        const { userRequest } = module;

        if (userRequest) {
          this.assets = Object.assign({}, this.assets, {
            [filename]: path.basename(userRequest),
          });
        }
      });
    });

    // Before emitting assets to output dir
    compiler.hooks.emit.tapAsync('ManifestPlugin', (compilation, cb) => {
      const {
        path: outputPath,
        filename,
        ignore,
      } = this.options;
      const stats = compilation.getStats().toJson();

      // chunks
      compilation.chunks.forEach((chunk) => {
        const { files } = chunk;

        this.manifest = Object.assign({}, this.manifest, files.reduce(
          (prev, file) => {
            if (ignore.includes(path.extname(file))) {
              return prev;
            }

            const name = this.constructor.originalFilename(file);

            return Object.assign({}, prev, { [name]: path.basename(file) });
          },
          {},
        ));
      });

      // module assets
      this.manifest = Object.assign({}, this.manifest, stats.assets.reduce(
        (prev, asset) => {
          const { name: dstName } = asset;
          const srcName = this.assets[dstName];

          if (srcName) {
            return Object.assign({}, prev, {
              [srcName]: path.basename(dstName),
            });
          }

          return prev;
        },
        {},
      ));

      // sort
      const sortedManifest = Object.keys(this.manifest)
        .sort()
        .reduce((prev, key) => Object.assign({}, prev, {
          [key]: this.manifest[key],
        }), {});

      // output，新建一个asset
      const relPath = path.relative(compilation.options.output.path, outputPath);
      const manifest = path.join(relPath, filename);

      const result = this.constructor.jsonStringifyPretty(sortedManifest);

      compilation.assets[manifest] = {
        source: () => result,
        size: () => result.length,
      };

      cb();
    });
  }
}

module.exports = ManifestPlugin;
