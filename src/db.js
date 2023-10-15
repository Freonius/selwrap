const { Pool } = require('pg');
const process = require('process');

/**
 * @param { { user: string?,
 *            host: string?,
 *            database: string?,
 *            password: string?,
 *            port: number?} } options
 * @returns { Pool }
 */
const getConnection = (
  {
    user, host, database, password, port,
  } = {
    user: null,
    host: null,
    database: null,
    password: null,
    port: null,
  },
) => {
  if (!user && Object.prototype.hasOwnProperty.call(process.env, 'DB_USER')) {
    user = process.env.DB_USER;
  }
  if (
    !database &&
    Object.prototype.hasOwnProperty.call(process.env, 'DB_DATABASE')
  ) {
    database = process.env.DB_DATABASE;
  }
  if (
    !password &&
    Object.prototype.hasOwnProperty.call(process.env, 'DB_PASSWORD')
  ) {
    password = process.env.DB_PASSWORD;
  }
  if (!port && Object.prototype.hasOwnProperty.call(process.env, 'DB_PORT')) {
    port = Number.parseInt(process.env.DB_PORT, 10);
  }
  if (!host && Object.prototype.hasOwnProperty.call(process.env, 'DB_HOST')) {
    host = process.env.DB_HOST;
  }
  const options = {
    user,
    host,
    database,
    password,
    port,
    max: 400,
  };
  const client = new Pool(options);
  return client;
};

exports.getConnection = getConnection;
