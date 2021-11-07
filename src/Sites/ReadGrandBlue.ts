import AbstractSite from '@/AbstractSite';
import styles from './read-grand-blue.lazy.scss';

export default class ReadGrandBlue extends AbstractSite {
  protected readonly siteName = 'ReadGrandBlue';

  protected handleSite(): void {
    this.logger.info('just css for now...');
    styles.use();
  }

  protected shouldHandleSite(url: URL): boolean {
    return url.host === 'readgrandblue.com';
  }
}
