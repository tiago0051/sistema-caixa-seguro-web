import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableBranchesProps {
  branches: BranchI[];
  branchesSelectedId: string[];
  onChange: (branches: string[]) => void;
}

export function TableBranches({
  branches,
  branchesSelectedId,
  onChange,
}: TableBranchesProps) {
  function selectBranch(branch: BranchI) {
    const branchesId = branchesSelectedId;

    branchesId.push(branch.id);

    onChange(branchesId);
  }

  function deselectBranch(branch: BranchI) {
    let branchesId = branchesSelectedId;

    branchesId = branchesId.filter((branchId) => branchId !== branch.id);

    onChange(branchesId);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          <TableHead>Nome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>
              <Checkbox
                checked={branchesSelectedId.some(
                  (branchSelectedId) => branchSelectedId === branch.id
                )}
                onCheckedChange={(e) =>
                  e ? selectBranch(branch) : deselectBranch(branch)
                }
              />
            </TableCell>
            <TableCell>{branch.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
