const getBreweries = "SELECT * FROM breweries";
const getBreweryById = "SELECT * FROM breweries WHERE id = $1";
const checkNameExists = "SELECT b FROM breweries b WHERE c.name = $1";
const checkIdExists = "SELECT b FROM breweries b WHERE b.id = $1";
const addBrewery = "INSERT INTO breweries (id, name, address, city, state, established, website, price_level) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
const updateBrewery = "UPDATE breweries SET name = $2, address = $3, city = $4, state = $5, established = $6, website = $7, price_level = $8 WHERE id = $1";
const deleteBrewery = "DELETE FROM breweries WHERE id = $1";

module.exports = {
    getBreweries,
    getBreweryById,
    checkNameExists,
    checkIdExists,
    addBrewery,
    updateBrewery,
    deleteBrewery
};