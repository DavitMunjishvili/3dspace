const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const name = "David";
  const lastName = "Munjishvili";
  const phone = "+995591080888";
  const email = "datamunji@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("securepassword", 10);

  await prisma.user.create({
    data: {
      name,
      lastName,
      phone,
      email,
      role: "dev",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  console.log("DEV account created successfully 👨‍💻");

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
