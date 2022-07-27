import AbstractSite from '@/AbstractSite';
import ImageNavigatorFactory from '@/ImageNavigatorFactory';
import CatManga from '@/Sites/Catmanga';
import ReadGrandBlue from '@/Sites/ReadGrandBlue';
import logger from '@/Utils/Logger';

const imageNavigatorFactory = new ImageNavigatorFactory(logger.getLogger('ImageNavigator'));

const sites: AbstractSite[] = [
  new CatManga(logger.getLogger('CatManga')),
  new ReadGrandBlue(imageNavigatorFactory, logger.getLogger('ReadGrandBlue')),
];

for (const site of sites) {
  site.run();
}
