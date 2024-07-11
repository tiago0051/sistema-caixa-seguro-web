import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getUsersList } from "@/repository/user";
import { ModalEditUser } from "./ModalEditUser";

interface UsersListTableBodyProps {
  companyId: string;
  branches: BranchI[];
}

export async function UsersListTableBody({
  branches,
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
          <TableCell className="truncate">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <ModalEditUser
              branches={branches}
              companyId={companyId}
              user={user}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
