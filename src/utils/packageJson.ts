import { join } from 'path';
import logger from './logger';

const scriptExists = (command: string): boolean => {
  if (typeof command !== 'string' || !command.length) {
    logger.log('found empty command string');
  }

  const packageFilename = join(process.cwd(), 'package.json');
  const packageJson = require(packageFilename); //eslint-disable-line
  if (packageJson.scripts && packageJson.scripts[command]) {
    return true;
  }

  return false;
};

export { scriptExists };
