import WebpackUserscript from 'webpack-userscript';

function generateHeaders(isDevelopment: boolean, buildVersion?: string): WebpackUserscript.HeaderObject {
  /* eslint-disable sort-keys */
  const header: WebpackUserscript.HeaderObject = {
    name: 'mangareader',
    description: 'some quality-of-life improvements for a few manga reading sites',
    version: buildVersion !== undefined ? buildVersion : '[version]',
    author: 'mangadoot',
    namespace: 'https://github.com/mangadoot',
    license: 'MIT',
    match: ['*://catmanga.org/*', '*://readgrandblue.com/*'],
    connect: ['catmanga.org', 'readgrandblue.com'],
    noframes: true,
    'run-at': 'document-end',
    grant: ['GM.registerMenuCommand'],
  };
  /* eslint-enable sort-keys */

  if (isDevelopment) {
    header.name += ' (DEV)';
    header.version += '.[buildTime]';
    delete header.downloadURL;
    delete header.updateURL;
  }

  return header;
}

export default generateHeaders;
