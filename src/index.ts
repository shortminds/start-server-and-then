import logger from './utils/logger';
import { getArguments } from './utils/getArguments';

const args = process.argv.slice(2);
const {
  andThen,
  start,
  url
} = getArguments(args);

logger.log(`starting server using command "${start}"`);
logger.log(`and when url "${url}" is responding`);
logger.log(`running these scripts "${andThen}"`);
