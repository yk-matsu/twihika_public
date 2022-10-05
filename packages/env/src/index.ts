export const isProduction = () => {
  return process.env.DEVELOPMENT_MODE == 'production'
};

export const isNotProduction = () => {
  return process.env.DEVELOPMENT_MODE != 'production'
};

export const isLocal = () => {
  return process.env.DEVELOPMENT_MODE == 'local'
};

export const isNotLocal = () => {
  return process.env.DEVELOPMENT_MODE != 'local'
};
