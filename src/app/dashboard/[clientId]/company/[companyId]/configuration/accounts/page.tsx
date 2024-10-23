import { AccountsView } from "./page.view";

export default async function Accounts({ params }: { params: Params }) {
  const { companyId } = await params;

  return <AccountsView companyId={companyId} />;
}
