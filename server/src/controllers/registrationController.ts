import { Request, Response } from 'express';
import { PrismaClient, RegistrationStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const registerForEvent = async (req: Request, res: Response) => {
  const { eventId } = req.body;
  const userId = (req as any).user.id;

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existingCount = await prisma.registration.count({ where: { eventId, status: 'CONFIRMED' } });
    if (existingCount >= event.capacity) return res.status(400).json({ message: 'Event is at full capacity' });

    const existingRegistration = await prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existingRegistration) {
      if (existingRegistration.status === 'CONFIRMED') {
        return res.status(400).json({ message: 'Already registered' });
      }
      const updated = await prisma.registration.update({
        where: { id: existingRegistration.id },
        data: { status: 'CONFIRMED' },
      });
      return res.status(200).json(updated);
    }

    const registration = await prisma.registration.create({
      data: { 
        userId, 
        eventId,
        status: RegistrationStatus.CONFIRMED 
      },
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error });
  }
};

export const getMyRegistrations = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: { event: true },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

export const getEventAttendees = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const attendees = await prisma.registration.findMany({
      where: { eventId: id as string, status: 'CONFIRMED' },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendees', error });
  }
};
