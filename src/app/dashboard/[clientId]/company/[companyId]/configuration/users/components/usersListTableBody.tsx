import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getUsersList } from "@/repository/user";

interface UsersListTableBodyProps {
  companyId: string;
}

export async function UsersListTableBody({
  companyId,
}: UsersListTableBodyProps) {
  const users = await getUsersList(companyId);

  return (
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">
            #{user.id.split("-")[0]}
          </TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
