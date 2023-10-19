import express from 'express';
import { getLetter } from '../controllers/letters';

export default (router: express.Router) => {
	router.get('/letters/:letter', getLetter);
}