import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CONST } from './constants/string'
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext, UserResolver } from "./graphql/UserResolver";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { generateAccessToken, generateRefreshToken, sendRefreshToken } from "./helpers/generateToken";

createConnection().then(async connection => {
    const app = express()
    app.use(
        cors({
            origin: 'http://localhost:3000',
            // origin: "*",
            credentials: true
        })
    );
    app.use(cookieParser())
    app.use(morgan("dev"))


    app.get('/', (req: Request, res: Response) => {
        res.send("Hello world")
    })

    app.post("/refresh-token", async (req, res) => {
        const token = req.cookies[CONST.JWT_COOKIE];
        if (!token) return res.send({ success: false, access_token: "" });

        let data: any = null;
        try {
            data = verify(token, CONST.REFRESH_TOKEN_SECRET);
        } catch (error) {
            console.error(error);
            return res.send({ success: false, access_token: "" });
        }

        const user = await User.findOne(data.userId);
        if (!user) {
            return res.send({ success: false, access_token: "" });
        }

        if (user.token_version !== data.tokenVersion) {
            return res.send({ success: false, access_token: "" });
        }
        const access_token = generateAccessToken(user)
        sendRefreshToken(res, generateRefreshToken(user));
        return res.send({ success: true, access_token });
    });


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
