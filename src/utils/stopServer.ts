import logger from './logger';
import psTree, { PS } from 'ps-tree';
import { ExecaChildProcess } from 'execa';

let resolveHolder: any;

const psTreeCallback = (error: Error, children: readonly PS[]): void => {
  children.forEach((child: PS) => {
    try {
      process.kill(parseInt(child.PID, 10), 'SIGINT');
    } catch (e) {
      if (e.code === 'ESRCH') {
        logger.log(`Child process ${child.PID} exited before trying to stop it`);
      } else {
        logger.error(e);
      }
    }
  });
  resolveHolder();
};

// TODO: remove any for server?
const stopServer = (server: ExecaChildProcess): Promise<void> => {
  return new Promise((resolve) => {
    resolveHolder = resolve;
    psTree(server.pid, psTreeCallback);
  }).then(() => {
    server.kill('SIGTERM', {
      forceKillAfterTimeout: 2000
    });
  });
};

export { psTreeCallback, stopServer };
