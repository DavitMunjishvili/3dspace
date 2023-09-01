const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  return
  await prisma.user.deleteMany();
  await prisma.blog.deleteMany();

  const hashedPassword = await bcrypt.hash("securepassword", 10);

  const user = await prisma.user.create({
    data: {
      name: "David",
      lastName: "Munjishvili",
      phone: "591080888",
      email: "datamunji@gmail.com",
      role: "dev",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  console.log("DEV account created successfully 👨‍💻");

  await prisma.blog.create({
    data: {
      authorId: user.id,
      title: "Test blog",
      content: "Munjishvili",
    },
  });
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
