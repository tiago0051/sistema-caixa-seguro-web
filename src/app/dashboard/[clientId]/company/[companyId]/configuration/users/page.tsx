import { usersListService } from "./page.service";
import { UsersListView } from "./page.view";

export default async function UsersList({ params }: { params: Params }) {
  const { companyId } = await params;

  const props = await usersListService({ params: { companyId } });

  return <UsersListView {...props} params={{ companyId }} />;
}
