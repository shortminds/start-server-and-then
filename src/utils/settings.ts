export const DEFAULT_WAIT_TIMEOUT = 5 * 60 * 1000; // five minutes

export const waitOnTimeout = (): number => {
  const timeout = process.env.AND_THEN_TIMEOUT
    ? parseInt(process.env.AND_THEN_TIMEOUT, 10)
    : DEFAULT_WAIT_TIMEOUT;

  if (timeout === NaN) return DEFAULT_WAIT_TIMEOUT;

  return timeout;
};

export const isDebug = (): boolean =>
  !!(process.env.DEBUG && process.env.DEBUG === 'start-server-and-then');

export const isSecure = (): boolean => process.env.AND_THEN_SSL == 'true';
