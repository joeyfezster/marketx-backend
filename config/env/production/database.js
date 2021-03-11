  
const parse = require('pg-connection-string').parse;
const fallback = require('../../database');
let config = undefined;
try {
  config = parse(process.env.DATABASE_URL);
} catch {
  console.log('failed to parse PG DATABASE_URL. Using fallback database configs');
}

module.exports = ({ env }) =>
  config
    ? {
        defaultConnection: 'default',
        connections: {
          default: {
            connector: 'bookshelf',
            settings: {
              client: 'postgres',
              host: config.host,
              port: config.port,
              database: config.database,
              username: config.user,
              password: config.password,
              schema: 'public',
            },
            options: {
              ssl: false,
            },
          },
        },
      }
    : fallback({ env });