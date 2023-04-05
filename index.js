const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const verifyToken = require("./utils/verifyToken")
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const { seedData } = require("./seed/user")
const mongoose = require("mongoose") // import mongoose from "mongoose";
const User = require("./models/users")
const dotenv = require("dotenv")
dotenv.config();

const app = express()
const port = 4001

mongoose.set('strictQuery', false);


// Connect to MongoDB with Mongoose.
mongoose
    .connect( process.env.mongoURI)
    .then(function () {
        console.log("MongoDB connected")
        seedData().then(r =>  console.log("Db Seed!"));
    })
    .catch(err => console.log(err, 'eee'));




// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


//middleware for check jwt token
const loggingMiddleware =  (req, res, next) => {

    const { access_token: token } = req.cookies;
    access_token = token;
    const tokenVerify =  verifyToken(access_token)
    if (!tokenVerify) {
        throw new Error("Token not valid!");
    }

    //add auth user to request
    User.findOne({email: tokenVerify.email}).exec().then(user => {
        req.user = user
        next();
    });

    if (!verifyToken(access_token)) {
        throw new Error("Token not valid!");
    }

}


app.use(loggingMiddleware);


app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)

app.listen(port, () => {
    console.log(`Running a server at http://localhost:${port}`)
})


