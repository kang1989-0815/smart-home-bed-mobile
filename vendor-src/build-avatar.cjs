// Build from a locally installed, verified package; set WIN_AVATAR_NODE_MODULES to rebuild elsewhere.
const path = require('node:path');
const modules = process.env.WIN_AVATAR_NODE_MODULES;
if (!modules) throw new Error('Set WIN_AVATAR_NODE_MODULES to the installed Vue / win-design-next node_modules directory');
const esbuild = require(path.join(modules, 'esbuild'));
esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'win-avatar.js')],
  outfile: path.join(__dirname, '../vendor/win-avatar.js'),
  nodePaths: [modules],
  bundle: true, format: 'esm', platform: 'browser', minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  metafile: true,
  legalComments: 'eof'
});
