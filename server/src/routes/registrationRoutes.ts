import { Router } from 'express';
import { registerForEvent, getMyRegistrations, getEventAttendees } from '../controllers/registrationController';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', verifyToken, registerForEvent);
router.get('/me', verifyToken, getMyRegistrations);
router.get('/event/:id', verifyAdmin, getEventAttendees);

export default router;
