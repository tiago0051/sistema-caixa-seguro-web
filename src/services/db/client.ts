import { dbClient } from "./prismaClient";

export async function getClient(clientId: string) {
  const clientDB = await dbClient.client.findUnique({
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
