import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const useLogout = (): (() => Promise<void>) =>{
  const router = useRouter();
  
    async function handleLogout(): Promise<void> {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/login"),
        },
      });
    }
    return handleLogout
    
}