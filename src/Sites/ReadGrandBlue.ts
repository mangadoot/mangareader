import { Logger } from 'ts-log';
import { is } from 'ts-type-guards';

import AbstractSite from '@/AbstractSite';
import ImageNavigatorFactory from '@/ImageNavigatorFactory';

import styles from './read-grand-blue.lazy.scss';

export default class ReadGrandBlue extends AbstractSite {
  protected readonly siteName = 'ReadGrandBlue';
  private readonly imageNavigatorFactory: ImageNavigatorFactory;

  constructor(imageNavigatorFactory: ImageNavigatorFactory, logger: Logger) {
    super(logger);
    this.imageNavigatorFactory = imageNavigatorFactory;
  }

  protected handleSite(): void {
    styles.use();

    // remove the ad-divs
    for (const element of document.querySelectorAll('.entry-content div.code-block')) {
      element.remove();
    }
    // remove empty tags so they wont make the layout look weird
    for (const element of document.querySelectorAll('.entry-content p:empty')) {
      element.remove();
    }

    const images: HTMLImageElement[] = Array.from(document.querySelectorAll('.entry-content img')).filter(
      is(HTMLImageElement),
    );
    for (const image of images) {
      image.addEventListener('error', () => {
        if (image.dataset.reloadTries !== undefined && Number(image.dataset.reloadTries) > 3) {
          return;
        }
        this.logger.error(`failed to load image ${image.src} - try to reload`);
        image.dataset.reloadTries = String(Number(image.dataset.reloadTries || 0) + 1);
        // TODO: not sure this actually works..
        image.src = image.src;
      });
    }
    this.imageNavigatorFactory.create(images);
  }

  protected shouldHandleSite(url: URL): boolean {
    return url.host === 'readgrandblue.com';
  }
}
