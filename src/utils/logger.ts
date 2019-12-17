const log = (message: string): void => {
  console.log(message);
};

const error = (error: Error): void => {
  console.error(error);
};

export default { error, log };
