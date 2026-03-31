import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@planora.com' },
    update: {},
    create: {
      name: 'PlanOra Admin',
      email: 'admin@planora.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin created:', admin.email);

  // Create Events
  const events = [
    {
      title: 'Global Tech Summit 2026',
      description: 'The premier conference for tech enthusiasts and professionals worldwide.',
      date: new Date('2026-06-15'),
      time: '09:00 AM - 06:00 PM',
      location: 'Silicon Valley, CA',
      category: 'Technology',
      capacity: 1000,
      organizerId: admin.id,
    },
    {
      title: 'Neon Nights Music Fest',
      description: 'An immersive electronic music experience under the stars.',
      date: new Date('2026-08-20'),
      time: '07:00 PM - 02:00 AM',
      location: 'Miami, FL',
      category: 'Music',
      capacity: 5000,
      organizerId: admin.id,
    },
    {
      title: 'Artisan Soul Workshop',
      description: 'Learn the ancient art of pottery and clay sculpting with master artisans.',
      date: new Date('2026-05-10'),
      time: '10:00 AM - 01:00 PM',
      location: 'Santa Fe, NM',
      category: 'Arts',
      capacity: 25,
      organizerId: admin.id,
    }
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
