"use client";
import { useState } from "react";

export default function Tokens() {
  const [hideTokenizer, setHideTokenizer] = useState(false);
  return (
    <>
      {!hideTokenizer ? (
				<div className="w-full flex justify-center">
				<button
					type="button"
					className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 font-extrabold"
					onClick={() => setHideTokenizer(!hideTokenizer)}
				>
					Show Tokenizer
				</button>
			</div>
			
			) : (
        <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
          {hideTokenizer && (
            <div className="flex flex-row justify-between">
              <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700 w-full">
                TOKENIZER
              </p>
              <button
                type="button"
                className="inline-flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 ml-2"
                onClick={() => setHideTokenizer(!hideTokenizer)}
              >
                Hide
              </button>
            </div>
          )}

          <div className="overflow-x-auto overflow-y-hidden">
            {hideTokenizer && (
              <div className="flex flex-row gap-3 my-5">
                <div className="basis-1/4 min-w-[250px]">
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="text-xl font-bold w-full sm:w-auto">SUBJEK</p>
                    {/* <p className="text-sm ml-0 sm:ml-2">
									Kata yang berperan sebagai subjek kalimat
								</p> */}
                  </div>

                  {/* badge kumpulan kata */}
                  <div className="min-h-full flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-grow min-h-full my-2 border dark:border-2 border-gray-400 dark:border-gray-700 rounded-md p-3 w-full">
                      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                        {data.subjek.slice(0, 10).map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {item}
                          </span>
                        ))}
                        {data.subjek.length > 10 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                            +{data.subjek.length} kata lainnya
                          </span>
                        )}
                      </div>
                      <form className="flex flex-col lg:flex-row gap-2 w-full mt-2">
                        <input
                          type="text"
                          name="new_subjek"
                          className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full"
                          placeholder="Tambahkan kata subjek"
                        />
                        <button
                          type="submit"
                          className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full lg:max-w-20"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 min-w-[250px]">
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="text-xl font-bold w-full sm:w-auto">
                      PREDIKAT
                    </p>
                    {/* <p className="text-sm ml-0 sm:ml-2">
									Kata yang berperan sebagai predikat kalimat
								</p> */}
                  </div>

                  {/* badge kumpulan kata */}
                  <div className="min-h-full flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-grow min-h-full my-2 border dark:border-2 border-gray-400 dark:border-gray-700 rounded-md p-3 w-full">
                      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                        {data.predikat.slice(0, 10).map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {item}
                          </span>
                        ))}
                        {data.predikat.length > 10 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                            +{data.predikat.length} kata lainnya
                          </span>
                        )}
                      </div>
                      <form className="flex flex-col lg:flex-row gap-2 w-full mt-2">
                        <input
                          type="text"
                          name="new_predikat"
                          className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full"
                          placeholder="Tambahkan kata predikat"
                        />
                        <button
                          type="submit"
                          className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full lg:max-w-20"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 min-w-[250px]">
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="text-xl font-bold w-full sm:w-auto">OBJEK</p>
                    {/* <p className="text-sm ml-0 sm:ml-2">
									Kata yang berperan sebagai objek kalimat
								</p> */}
                  </div>

                  {/* badge kumpulan kata */}
                  <div className="min-h-full flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-grow min-h-full my-2 border dark:border-2 border-gray-400 dark:border-gray-700 rounded-md p-3 w-full">
                      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                        {data.objek.slice(0, 10).map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {item}
                          </span>
                        ))}
                        {data.objek.length > 10 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                            +{data.objek.length} kata lainnya
                          </span>
                        )}
                      </div>
                      <form className="flex flex-col lg:flex-row gap-2 w-full mt-2">
                        <input
                          type="text"
                          name="new_objek"
                          className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full"
                          placeholder="Tambahkan kata objek"
                        />
                        <button
                          type="submit"
                          className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full lg:max-w-20"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 min-w-[250px]">
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="text-xl font-bold w-full sm:w-auto">
                      KETERANGAN
                    </p>
                    {/* <p className="text-sm ml-0 sm:ml-2">
									Kata yang berperan sebagai keterangan kalimat
								</p> */}
                  </div>

                  {/* badge kumpulan kata */}
                  <div className="min-h-full flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-grow min-h-full my-2 border dark:border-2 border-gray-400 dark:border-gray-700 rounded-md p-3 w-full">
                      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                        {data.keterangan.slice(0, 10).map((item, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {item}
                          </span>
                        ))}
                        {data.keterangan.length > 10 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                            +{data.keterangan.length} kata lainnya
                          </span>
                        )}
                      </div>
                      {/* input new word */}
                      <form className="flex flex-col lg:flex-row gap-2 w-full mt-2">
                        <input
                          type="text"
                          name="new_keterangan"
                          className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full"
                          placeholder="Tambahkan kata keterangan"
                        />
                        <button
                          type="submit"
                          className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full lg:max-w-20"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const data = {
  subjek: [
    "Saya",
    "Kamu",
    "Kita",
    "Mereka",
    "Dia",
    "Anak",
    "Ibu",
    "Ayah",
    "Kucing",
    "Anjing",
    "Buku",
    "Pensil",
    "Pulpen",
    "Meja",
    "Kursi",
    "Lemari",
    "Laptop",
  ],
  predikat: ["Makan", "Minum", "Tidur", "Belajar", "Bermain", "Menulis"],
  objek: [
    "Nasi",
    "Air",
    "Buku",
    "Pensil",
    "Pulpen",
    "Meja",
    "Kursi",
    "Lemari",
    "Laptop",
  ],
  keterangan: [
    "Di rumah",
    "Di sekolah",
    "Di kantor",
    "Di kamar",
    "Di luar",
    "Di dalam",
    "Di luar negeri",
    "Di Indonesia",
    "Di Jawa Barat",
    "Di Bandung",
    "Di Jakarta",
    "Di Surabaya",
    "Di Bali",
    "Di Malang",
    "Di Jogja",
    "Di Semarang",
    "Di Medan",
    "Di Palembang",
    "Di Makassar",
    "Di Papua",
    "Di Kalimantan",
    "Di Sulawesi",
    "Di Sumatera",
    "Di Riau",
    "Di Aceh",
    "Di NTT",
    "Di NTB",
    "Di Maluku",
    "Di Bengkulu",
    "Di Lampung",
    "Di Banten",
    "Di Jabar",
    "Di Jateng",
  ],
};
