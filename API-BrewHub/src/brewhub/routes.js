const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get('/', controller.getBreweries);
router.get('/:id', controller.getBreweryById);
router.post('/', controller.addBrewery);
router.put('/:id', controller.updateBrewery);
router.delete('/:id', controller.deleteBrewery);

/*router.get('/', (req, res)=> {
    res.send("using API route");
});*/

module.exports = router;