import { BranchI } from "@/types/branch/branch";

export interface UsersListServiceData {
  params: { companyId: string };
}

export interface UsersListServiceReturn {
  branches: BranchI[];
}

export interface UsersListViewProps {
  branches: BranchI[];
  params: { companyId: string };
}
