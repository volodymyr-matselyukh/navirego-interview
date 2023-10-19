import express from "express";
import letters from "./letters";

const router = express.Router();

export default (): express.Router => {
	letters(router);

	return router;
}