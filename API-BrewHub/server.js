const express = require('express');
const cors = require('cors');
const carRoutes = require("./src/brewhub/routes");

const app = express();
const port = 6002;

app.get("/", (req, res) => {
    res.send("Hello from the BrewHub API");
});

app.use(express.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*'
}));
app.use("/api/v1/brewhub", carRoutes);

app.listen(port, () => console.log('Running on port ' + port));