import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', verifyAdmin, createEvent);
router.put('/:id', verifyAdmin, updateEvent);
router.delete('/:id', verifyAdmin, deleteEvent);

export default router;
