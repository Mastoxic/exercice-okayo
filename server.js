const express = require("express");
const cors = require("cors");

var corsOptions = {
 origin: "http://localhost:8080"
};

const app = express();

app.use(cors(corsOptions));

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const url= "mongodb+srv://Mastoxic:vyajd2Zg2HjXDXA@factures.5rjze8y.mongodb.net/?retryWrites=true&w=majority";
// linking the api to the mongoDB database
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {console.log('Database Connected');
            console.log("Successfully coneected to MongoDB");
    }).catch(err =>{
        console.log(err);
        console.log('Could not connect to MongoDB');
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server lives!!!" });
});
app.listen(5000, () => {
    console.log("Server has started!");
});