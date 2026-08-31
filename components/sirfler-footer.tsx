// components/sirfler-footer.tsx

import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export function SirflerFooter() {
  return (
    <footer className={`${inter.className} mt-10 border-t border-[#E5E7EB] pt-6`}>
      <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
        {/* Logo */}
        <div className="relative h-7 w-[105px] shrink-0 sm:h-8 sm:w-[120px]">
          <Image
            src="/sirfler-logo.png"
            alt="Sirfler"
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>

        {/* Separador */}
        <span
          aria-hidden="true"
          className="hidden h-5 w-px bg-[#E5E7EB] sm:block"
        />

        {/* Texto */}
        <p className="text-[11px] leading-5 text-[#6B7280]">
          Criado com tecnologia{" "}
          <span className="font-semibold text-[#1C2A5C]">
            Sirfler
          </span>
          .
        </p>

        {/* Assinatura visual da marca */}
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#2DB6B1]"
        />
      </div>
    </footer>
  );
}