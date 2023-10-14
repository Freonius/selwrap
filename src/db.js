const { Pool } = require('pg');
const process = require('process');

/**
 * @param {{user: string?, host: string?, database: string?, password: string?, port: number?}} options
 * @returns { Pool }
 */
const getConnection = (
  { user, host, database, password, port } = {
    user: null,
    host: null,
    database: null,
    password: null,
    port: null,
  }
) => {
  if (!user && process.env.hasOwnProperty('DB_USER')) {
    user = process.env.DB_USER;
  }
  if (!database && process.env.hasOwnProperty('DB_DATABASE')) {
    database = process.env.DB_DATABASE;
  }
  if (!password && process.env.hasOwnProperty('DB_PASSWORD')) {
    password = process.env.DB_PASSWORD;
  }
  if (!port && process.env.hasOwnProperty('DB_PORT')) {
    port = Number.parseInt(process.env.DB_PORT, 10);
  }
  if (!host && process.env.hasOwnProperty('DB_HOST')) {
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
