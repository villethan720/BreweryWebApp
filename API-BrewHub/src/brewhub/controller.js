const pool = require("../../db");
const queries = require("./queries");

const getCars = (req, res) => {
    pool.query(queries.getCars, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getCarById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getCarById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addCar = (req, res) => {
    const { make, model, price } = req.body;

    pool.query(queries.checkModelExists, [model], (error, results) => {
        if(results.rows.length) {
            res.send("Model already exists in the database.");
            return;
        }

        pool.query(queries.addCar, [make, model, price], (error, results) => {
            if(error) throw error;
            res.status(201).send("Car created successfully.");
        });
    });
};

const updateCar = (req, res) => {
    const { id, make, model, price } = req.body;

    pool.query(queries.checkIdExists, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("ID not found.");
            return;
        }

        pool.query(queries.updateCar, [id, make, model, price], (error, results) => {
            if(error) throw error;
            res.status(201).send("Car updated successfully.");
        });
    });
};

const deleteCar = (req, res) => {
    const id = parseInt(req.body.id);

    pool.query(queries.checkIdExists, [id], (error, results) => {
        if(!results.rows.length) {
            res.send("ID not found.");
            return;
        }

        pool.query(queries.deleteCar, [id], (error, results) => {
            if(error) throw error;
            res.status(201).send("Car deleted successfully.");
        });
    });
};

module.exports = {
    getCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar
};