import "server-only";

import { dbClient } from "./prismaClient";

export async function getUserWithPassword(email: string) {
  const userDB = dbClient.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      id: true,
      name: true,
      password: true,
    },
  });

  return userDB;
}

export async function getUserClientsAndCompanies(userId: string) {
  const clients = await dbClient.client.findMany({
    where: {
      companies: {
        some: {
          branches: {
            some: {
              users: {
                some: {
                  id: userId,
                },
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      companies: {
        where: {
          branches: {
            some: {
              users: {
                some: {
                  id: userId,
                },
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return clients;
}
