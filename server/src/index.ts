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
    app.use(
        cors({
            origin: 'http://localhost:3000',
            // origin: "*",
            credentials: true
        })
    );
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
    apolloServer.applyMiddleware({ app, cors: false })

    app.listen(CONST.PORT, () => console.log(`server is running on port ${CONST.PORT}/graphql`))
    console.log("Inserting a new user into the database...")

}).catch(error => console.log(error));
