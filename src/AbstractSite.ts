import { Logger } from 'ts-log';

export default abstract class AbstractSite {
  protected abstract readonly siteName: string;
  protected readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  /** returns true if the currently opened page should be handled by the classes code */
  protected abstract shouldHandleSite(url: URL): boolean;

  /** do your site-changes here! */
  protected abstract handleSite(): void;

  public run(): void {
    const url = new URL(document.location.href);
    this.logger.info(`checking if site ${this.siteName} should be handled..`, url);
    if (this.shouldHandleSite(url)) {
      this.logger.info('yes - handle it!');
      this.handleSite();
    }
  }
}
