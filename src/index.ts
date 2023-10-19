import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from "mongoose";
import router from "./router/index";
import dotenv from 'dotenv';
import { AppError, HttpCode } from "./appError";

dotenv.config();

const app = express();

app.use(cors({
	credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log("server running on http://localhost:8080/");
});

const mongoUrl = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(mongoUrl!);
mongoose.connection.on('error', 
	((error: Error) => console.error(error)));

app.use('/', router());

app.use((req, res, next) => {
	const error = new AppError({description: "Not found", statusCode: HttpCode.NOT_FOUND});

	next(error);
});

app.use((error: AppError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
	res.status(error.statusCode || 500);

	res.json({
		error: {
			message: error.message
		}
	});
});