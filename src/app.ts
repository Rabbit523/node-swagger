import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as passport from 'passport'
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

import authRouter from "./Routers/authRouter";
import userRouter from "./Routers/userRouter";

import DATABASE_CONFIG from '../config/DATABASE_CONFIG'
import { Environments } from '../config/ENVIRONMENT_CONFIG'

const app = express()

const swaggerDefinition = {
  info: {
    title: 'Streakr API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:4040',
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  // apis: ['./src/Routes/**/*.ts'],  
  apis: ['./docs/**/*.yaml'], 
};

const swaggerSpec = swaggerJSDoc(options);

// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== Environments.TEST) {
  app.use(morgan('common'))
}

app.use(passport.initialize())
app.use(passport.session())

const databseURL = DATABASE_CONFIG[process.env.NODE_ENV]
mongoose
  .connect(
    databseURL,
    { useNewUrlParser: true }
  )
  .catch(err => console.log(err.message));

const user = 'user'
const auth = 'auth'
app.use(`/${user}`, userRouter)
app.use(`/${auth}`, authRouter)

export default app
