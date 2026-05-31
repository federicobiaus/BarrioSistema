import { PrismaClient, Role, PersonType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin123*', 10);

  // Crear o actualizar la persona
  const person = await prisma.person.upsert({
    where: {
      dni: '35033035',
    },
    update: {},
    create: {
      firstName: 'Federico',
      lastName: 'Biaus',
      dni: '35033035',
      phone: '1161411243',
      type: PersonType.OWNER,
    },
  });

  console.log('Persona creada:', person);

  // Crear o actualizar el usuario admin y asociarlo con la persona
  const user = await prisma.user.upsert({
    where: {
      email: 'admin@barrio.com',
    },
    update: {
      personId: person.id,
    },
    create: {
      firstName: 'Admin',
      lastName: 'Sistema',
      email: 'admin@barrio.com',
      password,
      role: Role.ADMIN,
      personId: person.id,
    },
  });

  console.log('Admin creado/actualizado:', user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });