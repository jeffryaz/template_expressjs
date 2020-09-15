const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    database: 'angular',
    port: 5432,
    statement_timeout: 100,
    connectionTimeoutMillis: 10000
});

client.
    connect()
    .then(() => {
        console.log("Service PgAdmin RUN, Developer Indonesia : JEFFRY AZHARI ROSMAN");
    })
    .catch(err => {
        console.error('Sevice PgAdmin FAILED: ', err);
        return;
    });

module.exports = client;