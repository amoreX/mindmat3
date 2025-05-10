"use client"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Lenis from 'lenis'

export default function Home() {
  const { isAuthenticated } = useUserStore();
  //if auth then push to dashboard 
  //else push to signin

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    lenis.on('scroll', (e) => {
      console.log(e);
    });

  }, []);

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
