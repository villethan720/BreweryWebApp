const Pool = require("pg").Pool;

const pool = new Pool({
    user: "cmps360",
    password: "KitGGhABnLwq47spjYHC3w8ZTk43qneu",
    host: "dpg-cnjqbrljm4es73ajpqp0-a",
    database: "brewerydb",
    port: 5432,
    ssl: true
});

module.exports = pool;