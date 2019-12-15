import { join } from 'path';
import logger from './logger';

const packageJsonScriptExists = (command: string): boolean => {
  if (!command.length) {
    logger.log('found empty command string');
  }

  const packageFilename = join(process.cwd(), 'package.json')
  const packageJson = require(packageFilename)
  if (packageJson.scripts && packageJson.scripts[command]) {
      return true;
  }

  return false;
}

export default packageJsonScriptExists;
