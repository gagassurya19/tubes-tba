export default function InputWord() {
  return (
    <>
      <div className="flex flex-col">
        <form className="flex flex-col sm:flex-row gap-2 w-full mt-2">
          <input
            type="text"
            name="input_text"
            className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full text-black"
            placeholder="Input kalimat"
          />
          <button
            type="submit"
            className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full sm:max-w-20"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
