import { Logger } from 'ts-log';

/** allows to navigate a list of images with the arrow (left/right) keys */
export default class ImageNavigator {
  private readonly images: HTMLImageElement[];
  private readonly logger: Logger;

  constructor(images: HTMLImageElement[], logger: Logger) {
    this.images = images;
    this.logger = logger;

    this.logger.debug('initialized with', images);

    document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowRight') {
        this.nextImg();
      } else if (event.key === 'ArrowLeft') {
        this.prevImg();
      }
    });
  }

  private nextImg() {
    const currentY = Math.ceil(window.scrollY);
    this.logger.debug('curY', currentY);
    const foundImg = this.images.find((img) => {
      return img.offsetTop > currentY;
    });
    this.logger.debug('foundimg', foundImg);
    if (foundImg) {
      foundImg.scrollIntoView();
    } else {
      this.logger.debug("we're at the end");
      scrollBy(0, 500);
    }
  }

  private prevImg() {
    const currentY = Math.ceil(window.scrollY);
    this.logger.debug('curY', currentY);
    // make sure not to alter the original array -> slice
    const foundImg = this.images
      .slice()
      .reverse()
      .find((img) => {
        return img.offsetTop < currentY - 10;
      });
    this.logger.debug('foundimg', foundImg);
    if (foundImg) {
      foundImg.scrollIntoView();
    } else {
      this.logger.debug("we're at the start");
      scrollBy(0, -500);
    }
  }
}
