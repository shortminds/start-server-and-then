import logger from './logger';
import psTree, { PS } from 'ps-tree';

// TODO: remove any for server?
const stopServer = (server: any): void => {
  new Promise((resolve) => {
    return psTree(server.pid, (error, children) => {
      children.forEach((child: PS) => {
        try {
          process.kill(parseInt(child.PID, 10), 'SIGINT');
        } catch (e) {
          if (e.code === 'ESRCH') {
            logger.log(`Child process ${child.PID} exited before trying to stop it`);
          } else {
            throw e;
          }
        }
      });
      resolve();
    });
  }).then(() => {
    server.kill('SIGTERM', {
      forceKillAfterTimeout: 2000
    });
  });
};

export { stopServer };
