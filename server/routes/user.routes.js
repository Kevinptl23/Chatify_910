import express from 'express';
import { signup, signin, signout, getUser, updateProfile} from '../controllers/user.controller.js'
import isAuthanticated from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.get('/sign-out', isAuthanticated, signout);
router.get('/me', isAuthanticated, getUser);
router.put('/update-profile', isAuthanticated, updateProfile);

export default router;