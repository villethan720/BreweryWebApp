const Pool = require("pg").Pool;

const pool = new Pool({
    // Update with new BrewHub DB

    user: "eperkun",
    password: "tMhu28dQVP29HwekDSFJjMRERCI1EICw",
    host: "dpg-cjh7jb337aks739es0e0-a",
    database: "cars_ttm0",
    port: 5432
});

module.exports = pool;