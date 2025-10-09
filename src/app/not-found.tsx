"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Ambient Light Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>

      <div className="relative max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center space-y-8">
          {/* Artistic 404 */}
          <div className="relative">
            {/* Background Number - Large and Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
              <span className="text-[20rem] md:text-[28rem] font-bold text-neutral-700/40 leading-none tracking-tighter">
                404
              </span>
            </div>

            {/* Foreground Content */}
            <div className="relative pt-32 md:pt-40 pb-12 space-y-6">
              {/* Minimal Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  {/* Rotating Circle */}
                  <div className="absolute inset-0 rounded-full border border-neutral-700/50"></div>
                  <div
                    className="absolute inset-0 rounded-full border-t border-blue-500/60 animate-spin"
                    style={{ animationDuration: "3s" }}
                  ></div>

                  {/* Center Dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>

                  {/* Orbital Dots */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600"></div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-light text-neutral-100 tracking-tight">
                  Page Not Found
                </h1>

                <div className="flex justify-center">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent"></div>
                </div>

                <p className="text-neutral-400 text-lg md:text-xl max-w-md mx-auto font-light leading-relaxed">
                  Halaman yang Anda cari tidak dapat ditemukan atau telah
                  dipindahkan
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/">
              <Button className="group relative px-8 py-6 bg-neutral-100 hover:bg-white text-neutral-900 font-medium overflow-hidden transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Kembali ke Beranda
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </Link>

            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="px-8 py-6 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 font-medium border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Halaman Sebelumnya
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
