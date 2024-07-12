import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ModalEditUser } from "./ModalEditUser";
import { getUsersListDomain } from "@/domain/user";

interface UsersListTableBodyProps {
  companyId: string;
  branches: BranchI[];
}

export async function UsersListTableBody({
  branches,
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
            <ModalEditUser branches={branches} user={user} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
