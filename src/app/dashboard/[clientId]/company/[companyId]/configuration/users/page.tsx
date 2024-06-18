import { usersListService } from "./page.service";
import { UsersListView } from "./page.view";

export default async function UsersList({
  params,
}: {
  params: { companyId: string };
}) {
  const props = await usersListService({ params });

  return <UsersListView {...props} params={params} />;
}
