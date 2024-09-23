import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter()
  useEffect(() => {
    router.push(`/dashboard`)
  }, [])

  return (
    <div>
      <p>aqui</p>
    </div>
  );
}
