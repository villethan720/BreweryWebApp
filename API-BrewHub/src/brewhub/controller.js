const pool = require("../../db");
const queries = require("./queries");

/*
    all of this needs adapted to the BrewHub DB
*/

const getBreweries = (req, res) => {
    pool.query(queries.getBreweries, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBreweryById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBrewery, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addBrewery = (req, res) => {
    const { name, address, city, state, established, website, price_level } = req.body;

    pool.query(queries.checkNameExists, [name], (error, results) => {
        if(results.rows.length) {
            res.send("Model already exists in the database.");
            return;
        }

        pool.query(queries.addBrewery, [name, address, city, state, established, website, price_level], (error, results) => {
            if(error) throw error;
            res.status(201).send("Brewery created successfully.");
        });
    });
};

const updateBrewery = (req, res) => {
    const { id, name, address, city, state, established, website, price_level } = req.body;

    pool.query(queries.checkIdExists, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("ID not found.");
            return;
        }

        pool.query(queries.updateBrewery, [name, address, city, state, established, website, price_level], (error, results) => {
            if(error) throw error;
            res.status(201).send("Brewery updated successfully.");
        });
    });
};

const deleteBrewery = (req, res) => {
    const id = parseInt(req.body.id);

    pool.query(queries.checkIdExists, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("ID not found.");
            return;
        }

        pool.query(queries.deleteBrewery, [id], (error, results) => {
            if(error) throw error;
            res.status(201).send("Brewery deleted successfully.");
        });
    });
};

module.exports = {
    getBreweries,
    getBreweryById,
    addBrewery,
    updateBrewery,
    deleteBrewery
};