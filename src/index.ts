import AbstractSite from '@/AbstractSite';
import CatManga from '@/Sites/Catmanga';
import ReadGrandBlue from '@/Sites/ReadGrandBlue';
import logger from '@/Utils/Logger';

const sites: AbstractSite[] = [
  new CatManga(logger.getLogger('CatManga')),
  new ReadGrandBlue(logger.getLogger('ReadGrandBlue')),
];

for (const site of sites) {
  site.run();
}
