import AbstractSite from '@/AbstractSite';
import CatManga from '@/Catmanga';
import ReadGrandBlue from '@/ReadGrandBlue';
import logger from './Utils/Logger';

const sites: AbstractSite[] = [new CatManga(logger), new ReadGrandBlue(logger)];

for (const site of sites) {
  site.run();
}
