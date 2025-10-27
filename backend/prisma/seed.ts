import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create sample media entries
  const sampleData = [
    {
      title: "Inception",
      type: "Movie",
      director: "Christopher Nolan",
      budget: "$160M",
      location: "Los Angeles, Paris, Tokyo",
      duration: "148 min",
      yearTime: "2010",
    },
    {
      title: "Breaking Bad",
      type: "TV Show",
      director: "Vince Gilligan",
      budget: "$3M/episode",
      location: "Albuquerque, New Mexico",
      duration: "49 min/episode",
      yearTime: "2008-2013",
    },
    {
      title: "The Dark Knight",
      type: "Movie",
      director: "Christopher Nolan",
      budget: "$185M",
      location: "Chicago, Hong Kong",
      duration: "152 min",
      yearTime: "2008",
    },
    {
      title: "Stranger Things",
      type: "TV Show",
      director: "The Duffer Brothers",
      budget: "$8M/episode",
      location: "Atlanta, Georgia",
      duration: "50 min/episode",
      yearTime: "2016-Present",
    },
    {
      title: "The Godfather",
      type: "Movie",
      director: "Francis Ford Coppola",
      budget: "$6M",
      location: "New York, Sicily",
      duration: "175 min",
      yearTime: "1972",
    },
  ];

  for (const data of sampleData) {
    await prisma.media.create({ data });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
