import { ClientI } from "@/types/client/client";
import { CompanyI } from "@/types/company/company";

export interface ClientIL extends ClientI {
  companies: CompanyI[];
  id: string;
  name: string;
}
