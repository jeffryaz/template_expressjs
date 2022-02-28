var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '@Rosman1998',
        database: 'example_data',
        port: 5432,
        connectionTimeoutMillis: 5000
    },
    pool: {
        min: 0,
        max: 7,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 10000
    },
    log: {
        warn(message) {
            console.log("warn: ", message);
        },
        error(message) {
            console.log("error: ", message);
        },
        deprecate(message) {
            console.log("deprecate: ", message);
        },
        debug(message) {
            console.log("debug: ", message);
        },
    }
});

module.exports = knex;