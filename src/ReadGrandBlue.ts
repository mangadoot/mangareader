import './read-grand-blue.scss';

import { Logger } from 'ts-log';

export default class ReadGrandBlue {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public init(): void {
    this.logger.info('just css for now...');
  }
}
