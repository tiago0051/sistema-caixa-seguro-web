import { auth } from "@/auth";
import { getUserClientsAndCompanies } from "@/repository/user";
import { Form } from "./components/form";

export default async function IndexPage() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const clients = await getUserClientsAndCompanies(session.user.id);

  return (
    <div className="w-full grid gap-8">
      <div>
        <h2 className="text-center text-xl">Seleciona uma empresa</h2>
        <p className="text-base text-center">
          Para prosseguir será necessário selecionar um cliente e empresa
        </p>
      </div>

      <Form clients={clients} />
    </div>
  );
}
