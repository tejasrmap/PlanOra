import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: { organizer: { select: { name: true } } },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { organizer: { select: { name: true } } },
    });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, date, time, location, category, imageUrl, capacity } = req.body;
  const organizerId = (req as any).user.id;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        category,
        imageUrl,
        capacity: parseInt(capacity),
        organizerId,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  if (data.date) data.date = new Date(data.date);

  try {
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({ where: { id } });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
