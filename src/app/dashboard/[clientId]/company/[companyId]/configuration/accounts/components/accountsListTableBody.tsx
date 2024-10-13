import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getUsersListDomain } from "@/services/domain/user";

export async function AccountsListTableBody({
  companyId,
}: UsersListTableBodyProps) {
  const users = await getUsersListDomain(companyId);

  return (
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">
            #{user.id.split("-")[0]}
          </TableCell>
          <TableCell className="truncate">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            {/* <ModalEditUser branches={branches} user={user} /> */}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
