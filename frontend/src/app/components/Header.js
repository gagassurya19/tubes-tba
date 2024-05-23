"use client";
import { useState } from "react";

const anggota_kelompok = [
  {
    nama: "Zuhair Nashif Abdurrohim",
    nim: "1301223102",
    foto: "https://media.licdn.com/dms/image/D5603AQFoB9flRt3b_w/profile-displayphoto-shrink_800_800/0/1701776672180?e=2147483647&v=beta&t=AlElCryepDPKixrDladwng7xWjAyxgR75319jN9deK4",
  },
  {
    nama: "Maulana Cahya Magista",
    nim: "1301223240",
    foto: "https://media.licdn.com/dms/image/D5603AQHCRmF4PjkaVQ/profile-displayphoto-shrink_800_800/0/1702109430676?e=2147483647&v=beta&t=C1QKO0b3pxBpql8hvScvSJU2aor0zEOD2wYrlgR9A00",
  },
  {
    nama: "Gagas Surya Laksana",
    nim: "1301223164",
    foto: "https://media.licdn.com/dms/image/D5603AQFv0PgBqyFA6g/profile-displayphoto-shrink_800_800/0/1704083603848?e=2147483647&v=beta&t=giooGgHt8HHTtRqI9UujA9lL2091zPURz8Fi2j1hh40",
  },
];

export default function Header() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <div className="flex items-center justify-between font-mono text-sm lg:flex mb-10">
        <div className="block">
          <h1 className="text-4xl font-bold text-left">
            TUBES{" "}
            {/* <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 hover:before:-skew-y-0 hover:cursor-pointer before:bg-pink-500 relative inline-block ">
              <span className="relative text-white">TEORI BAHASA</span>
            </span>{" "} */}
            TEORI BAHASA & ALGORITMA
          </h1>
          <p className="text-xl mt-1 text-left">
            [S-P-O-K] Recognizer & Parser |{" "}
            <a
              className="underline decoration-sky-500 decoration-wavy hover:decoration-solid hover:cursor-pointer"
              onClick={() => handleClick()}
            >
              Kelompok 11
            </a>{" "}
            👈 <span className="text-sm">click me!</span>
          </p>
        </div>
        <div className="flex w-auto justify-end">
          <button
            onClick={() => document.body.classList.toggle("dark")}
            className="h-12 w-12 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-600 bg-gray-100 dark:bg-gray-700"
          >
            <svg
              className="fill-violet-700 block dark:hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              className="fill-yellow-500 hidden dark:block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* make a cli box with list inside */}
      {active && (
        <div className="border dark:border-2 border-gray-400 dark:border-gray-700 rounded-lg mb-10 px-10 py-5">
          <p className="text-2xl font-semibold mb-5 text-center sm:text-left">
            Anggota kelompok:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {anggota_kelompok.map((anggota, index) => (
              <div
                key={index}
                className="group/item bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 p-3 rounded-lg dark:hover:bg-gray-600 hover:cursor-pointer"
              >
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <img
                      className="filter saturate-0 group-hover/item:saturate-100 inline-block flex-shrink-0 size-[62px] rounded-full"
                      src={anggota.foto}
                      alt="Image Description"
                    />
                    <div className="ms-3">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {anggota.nama}
                      </h3>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
                        {anggota.nim}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
