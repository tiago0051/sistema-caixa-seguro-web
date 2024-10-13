import { AccountsView } from "./page.view";

export default function Accounts({
  params,
}: {
  params: { companyId: string };
}) {
  return <AccountsView companyId={params.companyId} />;
}
