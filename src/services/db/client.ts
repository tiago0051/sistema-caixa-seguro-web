import prisma from "../services/prisma";

export async function getClient(clientId: string) {
  const clientDB = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return clientDB;
}
