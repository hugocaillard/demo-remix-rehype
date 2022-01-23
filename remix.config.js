/**
 * @type {import('@remix-run/dev/config').RemixMdxConfigFunction}
 */
const mdx = async () => {
  const [rehypePrism, clike1, clike2] = await Promise.all([
    import('@mapbox/rehype-prism').then((mod) => mod.default),
    import('./syntaxes/clike1.js').then((mod) => mod.default),
    import('./syntaxes/clike2.js').then((mod) => mod.default),
  ]);

  return {
    rehypePlugins: [
      rehypePrism.bind(this, {
        ignoreMissing: true,
        syntaxes: [clike1, clike2],
      }),
    ],
  };
};

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'api/_build',
  ignoredRouteFiles: ['.*'],
  mdx,
};
