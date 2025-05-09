"use client"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation";
export default function Home() {
  const { isAuthenticated } = useUserStore();
  //if auth then push to dashboard 
  //else push to signin
  const router = useRouter();
  if (isAuthenticated) {
    router.push("/dashboard");
  } else {
    router.push("/signin");
  }
  return (
    <>
    </>
  );
}
