import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "@/actions/user.actions";

export default async function DashboardPage() {
  const session = (await cookies()).get("session");

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Sair
            </button>
          </form>
        </div>

        <p className="text-gray-500">
          Bem-vindo! Estás autenticado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-md border p-4">
            <p className="text-sm text-gray-500">Estatística 1</p>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-gray-500">Estatística 2</p>
            <p className="text-2xl font-bold">17</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm text-gray-500">Estatística 3</p>
            <p className="text-2xl font-bold">99</p>
          </div>
        </div>
      </div>
    </main>
  );
}