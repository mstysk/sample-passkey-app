export default function Index() {
  return (
    <>
      <h2>Login with a random username</h2>
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label
            for="username"
            class="block mb-2 text-sm font-mdeium text-gray-900 dark:text-white"
          >
            username
          </label>
          <input
            type="text"
            name="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </form>
    </>
  );
}
