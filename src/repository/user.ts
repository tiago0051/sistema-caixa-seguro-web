"use server";

import { UserI } from "@/types/user/user";
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
    },
    orderBy: {
      name: "asc",
    },
  });

  return usersListDB.map((user) => ({
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

export async function registerUser(
  name: string,
  email: string,
  branchId: string
): Promise<void> {
  await dbClient.user.create({
    data: {
      email,
      name,
      branches: {
        connect: {
          id: branchId,
        },
      },
    },
  });
}
