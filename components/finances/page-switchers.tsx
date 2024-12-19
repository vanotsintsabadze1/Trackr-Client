"use client";

import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  pageCount: number;
}

export default function PageSwitchers({ pageCount, currentPage }: Props) {
  const router = useRouter();
  return (
    <>
      {Array.from({ length: pageCount })
        .slice(currentPage, 5)
        .map((_, i) => (
          <button key={i} onClick={() => router.push(`/finances?page=${i + 1}`)} className="hover:scale-105 duration-200 ease-in-out">
            <span className="text-gray-500 underline text-xs">{i + 1}</span>
          </button>
        ))}
    </>
  );
}
