"use server";

import { dbClient } from "./prismaClient";
import { getNameInitials } from "@/utils/stringFormat";

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

export async function getUserBranchesList(companyId: string, userId: string) {
  const branchesListDB = dbClient.branch.findMany({
    where: {
      companyId,
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return branchesListDB;
}

export async function getUserByEmail(email: string) {
  const userDB = dbClient.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return userDB;
}

export async function getUserById(userId: string) {
  const user = await dbClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
      name: true,
    },
  });

  return user;
}

export async function getUsersList(companyId: string): Promise<UserI[]> {
  const usersListDB = await dbClient.user.findMany({
    where: {
      branches: {
        some: {
          companyId,
        },
      },
    },
    select: {
      email: true,
      id: true,
      name: true,
      branches: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return usersListDB.map((user) => ({
    branches: user.branches,
    email: user.email,
    firstName: user.name.split(" ")[0],
    id: user.id,
    lastName: user.name.split(" ").pop() || "",
    name: user.name,
    nameInitials: getNameInitials(user.name),
  }));
}

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

export async function linkUserToBranch(userId: string, branchId: string) {
  await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      branches: {
        connect: {
          id: branchId,
        },
      },
    },
  });
}

export async function registerUser(
  name: string,
  email: string,
  branchesId: string[]
): Promise<void> {
  await dbClient.user.create({
    data: {
      branches: {
        connect: branchesId.map((branchId) => ({
          id: branchId,
        })),
      },
      email: email,
      name: name,
    },
  });
}

export async function updateUser(
  userId: string,
  name: string,
  email: string,
  branchesId: string[]
) {
  const user = await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      branches: {
        connect: branchesId.map((branchId) => ({
          id: branchId,
        })),
      },
      email: email,
      name: name,
    },
  });
}
