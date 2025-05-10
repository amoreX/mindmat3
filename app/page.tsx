"use client"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation";
import Lenis from 'lenis'

export default function Home() {
  const { isAuthenticated } = useUserStore();
  //if auth then push to dashboard 
  //else push to signin
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });
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
