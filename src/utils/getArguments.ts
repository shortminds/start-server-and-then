import logger from './logger';
import { scriptExists } from './packageJson';
import { URL } from 'url';

const addNpmRun = (script: string): string => `npm run ${script}`;

type Arguments = {
  andThen: string[];
  start: string;
  url: string;
};

const getArguments = (cliArgs: string[]): Arguments => {
  if (cliArgs && cliArgs.length < 3) {
    logger.log('expected array of at least 3 arguments');
    process.exit(1);
  }

  const andThen = cliArgs.slice(2);
  let start = cliArgs[0];
  let url = '';

  if (!scriptExists(start)) {
    logger.log('start script not found in package.json');
    process.exit(1);
  } else {
    start = addNpmRun(start);
  }

  try {
    const newUrl = new URL(cliArgs[1]);
    url = newUrl.href;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  if (andThen.length === 0 || !andThen.every(thisScript => scriptExists(thisScript))) {
    logger.log('not all and then scripts exists in package.json');
    process.exit(1);
  } else {
    andThen.forEach((script: string, index: number): void => {
      andThen[index] = addNpmRun(script);
    });
  }

  return {
    andThen,
    start,
    url
  };
};

export default getArguments;
