import logger from './utils/logger';
import { getArguments } from './utils/getArguments';
import execa from 'execa';
import { stopServer } from './utils/stopServer';

// const sp = execa('echo', ['foo']);
// sp && sp.stdout && sp.stdout.pipe(process.stdout);

const startServerAndThen = (): void => {
  const args = process.argv.slice(2);
  const {
    andThen,
    start,
    url
  } = getArguments(args);

  logger.log(`starting server using command "${start}"`);
  logger.log(`and when url "${url}" is responding`);
  logger.log(`running these scripts "${andThen}"`);

  // TODO: remove this
  const server = execa(start, { shell: true, stdio: 'inherit' });
  // sp && sp.stdout && sp.stdout.pipe(process.stdout);
  stopServer(server);
};

// TODO: remove this
startServerAndThen();

export default startServerAndThen;
