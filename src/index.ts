#!/usr/bin/env node

import execa, { ExecaChildProcess } from 'execa';
import logger from './utils/logger';
import { getArguments } from './utils/getArguments';
import { stopServer } from './utils/stopServer';
import { waitForIt } from './utils/waitForIt';

// const sp = execa('echo', ['foo']);
// sp && sp.stdout && sp.stdout.pipe(process.stdout);

const startServerAndThen = (): Promise<void> => {
  const args = process.argv.slice(2);
  const {
    andThen,
    start,
    url
  } = getArguments(args);

  logger.log(`starting server using command "${start}"`);
  logger.log(`and when url "${url}" is responding`);
  logger.log(`running these scripts "${andThen}"`);

  const doAndThens = (andThens: string[]): ExecaChildProcess => {
    return execa(andThens[0], { shell: true, stdio: 'inherit' });
  };

  // TODO: remove this
  const server = execa(start, { shell: true, stdio: 'inherit' });
  // sp && sp.stdout && sp.stdout.pipe(process.stdout);
  const waited = waitForIt(url, server);

  return waited
    .then(() => { doAndThens(andThen); })
    .finally(() => { stopServer(server); })
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });

  // stopServer(server);
};

startServerAndThen();

// export default startServerAndThen;
