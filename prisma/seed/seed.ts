import { PrismaClient } from "@prisma/client";

import clientData from "./client.json";
import companyData from "./company.json";
import branchData from "./branch.json";
import userData from "./user.json";
import supplierData from "./supplier.json";
import storageData from "./storage.json";

const prisma = new PrismaClient();

async function seed() {
  await prisma.client.create({
    data: clientData,
  });

  await prisma.company.create({
    data: companyData,
  });

  await prisma.branch.create({
    data: branchData,
  });

  await prisma.user.create({
    data: {
      ...userData,
      branches: {
        connect: {
          id: branchData.id,
        },
      },
    },
  });

  await prisma.supplier.create({
    data: {
      ...supplierData,
      company: {
        connect: {
          id: companyData.id,
        },
      },
    },
  });

  await prisma.storage.create({
    data: {
      ...storageData,
      company: {
        connect: {
          id: companyData.id,
        },
      },
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
