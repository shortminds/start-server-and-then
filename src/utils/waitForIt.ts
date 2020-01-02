import waitOn from 'wait-on';
import { ExecaChildProcess } from 'execa';
import { isDebug, isSecure, waitOnTimeout } from './settings';

export const waitForIt = (url: string, server: ExecaChildProcess): Promise<void> => {
  return new Promise((resolve, reject) => {
    const onClose = (): void => {
      reject(new Error('Server closed unexpectedly'));
    };

    server.on('close', onClose);

    // debug('starting waitOn %s', url)
    const options = {
      resources: [url],
      interval: 2000,
      window: 1000,
      timeout: waitOnTimeout(),
      verbose: isDebug(),
      strictSSL: isSecure(),
      log: isDebug()
    };

    waitOn(options, (error: Error) => {
      if (error) {
        return reject(error);
      }

      server.removeListener('close', onClose);
      resolve();
    });
  });
};
