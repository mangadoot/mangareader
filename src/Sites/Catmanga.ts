import { is } from 'ts-type-guards';

import AbstractSite from '@/AbstractSite';

import styles from './catmanga.lazy.scss';

export default class CatManga extends AbstractSite {
  protected readonly siteName = 'CatManga';

  protected handleSite(): void {
    styles.use();
    const script = document.querySelector('#__NEXT_DATA__');
    if (!is(HTMLElement)(script)) {
      this.logger.error('script element not found!');
      return;
    }
    // remove the main container - react crap ...
    document.querySelector('#__next')?.remove();
    this.makeItNotShit(script);
  }

  protected shouldHandleSite(url: URL): boolean {
    return url.host === 'catmanga.org' && /^\/series\//.test(url.pathname);
  }

  private makeItNotShit(script: HTMLElement): void {
    let data;
    try {
      data = JSON.parse(script.textContent || '');
    } catch (error) {
      this.logger.error('could not json-parse data', error);
    }

    this.logger.info('script data', data);
    this.logger.info('found pages:', data.props.pageProps.pages);

    const container = document.createElement('div');
    container.classList.add('catmanga--container');
    document.body.append(container);
    this.addImages(container, data.props.pageProps.pages);
    this.addLinks(container, data.props.pageProps.chapter.number, data.props.pageProps.series, data.page);
  }

  private addImages(container: HTMLElement, images: string[]): void {
    this.logger.debug('adding images to container', container, images);
    for (const image of images) {
      const img = document.createElement('img');
      img.src = image;
      img.alt = `image missing? ${image}`;
      container.append(img);
    }
  }

  private addLinks(container: HTMLElement, chapter: number, series: any, urlTemplate: string): void {
    this.logger.debug('adding linkgs', chapter, series);
    let lastChapter = 1;
    for (const c of series.chapters) {
      lastChapter = Math.max(lastChapter, c.number || 1);
    }
    urlTemplate = urlTemplate.replace('[series]', series.series_id);

    const linksContainer = document.createElement('div');
    linksContainer.classList.add('linkscontainer');
    linksContainer.textContent = `Chapter ${chapter}`;

    if (chapter > 1) {
      const link = document.createElement('a');
      const button = document.createElement('button');
      link.append(button);
      button.textContent = '< prev';
      link.href = urlTemplate.replace('[chapter]', String(chapter - 1));
      linksContainer.prepend(link);
    }

    if (chapter < lastChapter) {
      const link = document.createElement('a');
      const button = document.createElement('button');
      link.append(button);
      button.textContent = 'next >';
      link.href = urlTemplate.replace('[chapter]', String(chapter + 1));
      linksContainer.append(link);
    }

    container.append(linksContainer);
    container.prepend(linksContainer.cloneNode(true));
  }
}
