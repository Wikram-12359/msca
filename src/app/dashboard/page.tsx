import { LogoutButton } from "@/components/LogoutButton";
import { getRequiredSession } from "@/lib/get-session";

const Dashboard = async () => {
  const session = await getRequiredSession();
  console.log(session);
  return (
    <section className="p-4">Dashboard {session.user.name}
    <LogoutButton />
    </section>
  )
}

export default Dashboard