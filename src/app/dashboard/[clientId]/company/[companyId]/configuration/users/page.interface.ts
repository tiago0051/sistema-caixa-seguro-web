import { ProductI } from "@/types/product/product";
import { UserI } from "@/types/user/user";

export interface UsersListServiceReturn {
  users: UserI[];
}

export interface UsersListViewProps {
  users: UserI[];
}
