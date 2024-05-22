import path from 'path';

const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'voucher-service',
    },
  },

  production: {
    root: rootPath,
    app: {
      name: 'voucher-service',
    },
  },
};

export default config[env];
