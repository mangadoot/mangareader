import ImageNavigator from '@/ImageNavigator';
import { Logger } from 'ts-log';

export default class ImageNavigatorFactory {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public create(images: HTMLImageElement[]): ImageNavigator {
    return new ImageNavigator(images, this.logger);
  }
}
