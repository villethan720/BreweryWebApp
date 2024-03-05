const getBreweries = "SELECT * FROM cars";
const getBreweryById = "SELECT * FROM cars WHERE id = $1";
const checkModelExists = "SELECT c FROM cars c WHERE c.model = $1";
const checkIdExists = "SELECT c FROM cars c WHERE c.id = $1";
const addBrewery = "INSERT INTO cars (make, model, price) VALUES($1, $2, $3)";
const updateBrewery = "UPDATE cars SET make = $2, model = $3, price = $4 WHERE id = $1";
const deleteBrewery = "DELETE FROM cars WHERE id = $1";

module.exports = {
    getBreweries,
    getBreweryById,
    checkModelExists,
    checkIdExists,
    addBrewery,
    updateBrewery,
    deleteBrewery
};