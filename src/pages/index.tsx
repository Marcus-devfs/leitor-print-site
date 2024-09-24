import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 w-full pt-10 justify-center">
      <h1 className="text-gray-700 font-light text-xl text-center">Consolide os Resultados de Suas Campanhas
        Com Influenciadores em Três Passos</h1>
    </div>
  );
}
