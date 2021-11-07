import AbstractSite from '@/AbstractSite';
import ImageNavigatorFactory from '@/ImageNavigatorFactory';
import { Logger } from 'ts-log';
import { is } from 'ts-type-guards';
import styles from './read-grand-blue.lazy.scss';

export default class ReadGrandBlue extends AbstractSite {
  protected readonly siteName = 'ReadGrandBlue';
  private readonly imageNavigatorFactory: ImageNavigatorFactory;

  constructor(imageNavigatorFactory: ImageNavigatorFactory, logger: Logger) {
    super(logger);
    this.imageNavigatorFactory = imageNavigatorFactory;
  }

  protected handleSite(): void {
    this.logger.info('just css for now...');
    styles.use();
    this.imageNavigatorFactory.create(
      Array.from(document.querySelectorAll('.entry-content img')).filter(is(HTMLImageElement)),
    );
  }

  protected shouldHandleSite(url: URL): boolean {
    return url.host === 'readgrandblue.com';
  }
}
