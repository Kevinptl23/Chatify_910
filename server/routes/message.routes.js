import express from 'express';
import { getAllUsers, getMessages, sendMessage} from '../controllers/message.controller.js';
import isAuthanticated from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', isAuthanticated, getAllUsers);
router.get('/:id', isAuthanticated, getMessages);
router.post('/send/:id', isAuthanticated, sendMessage);

export default router;