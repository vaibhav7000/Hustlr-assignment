const dotenv = require("dotenv");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
dotenv.config();

const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const { dbConnection } = require("./db/index");

app.use(express.json());


app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter)


// global-catches
app.use((err, req, res, next) => {
    if(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Internal server error occured",
        })
        return
    }

    next();
})


// not-found
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        msg: "Route does not exist"
    })
});


(async () => {
    try {
        await dbConnection();
        
        app.listen(process.env.PORT, function() {
            console.log("server started");
        })
    } catch (error) {
        console.log(error);
        console.log("connection with database fails");
        process.exit(1);
    }
})();