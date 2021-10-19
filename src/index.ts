import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { CONST } from './constants/string'
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext, UserResolver } from "./graphql/UserResolver";

createConnection().then(async connection => {
    const app = express()
    app.use(cors())
    app.use(morgan("dev"))


    app.get('/', (req, res) => {
        res.send("Hello world")
    })


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }): MyContext => ({ req, res })
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app })

    app.listen(CONST.PORT, () => console.log(`server is running on port ${CONST.PORT}/graphql`))
    console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
