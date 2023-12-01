import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Play Chat</title>
        <meta name="description" content="App de chat em grupo e individual" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-100 h-[100vh] flex justify-center items-center">
        <div className="bg-white h-md w-sm px-10 flex flex-col py-10 rounded-lg shadow-md">
          <h1 className="text-slate-800 text-4xl font-poppins font-800 text-center">
            PLAY<span className=" text-rose-500">CHAT</span>
          </h1>
          <form className="flex grow flex-col justify-between py-5 items-center">
            <input
              className="w-full border border-stone-300 rounded-md p-2 font-poppins focus:(outline-none ring ring-2 ring-rose-500)"
              placeholder="Usuário"
            />

            <input
              className="w-full border border-stone-300 rounded-md p-2 font-poppins focus:(outline-none ring ring-2 ring-rose-500)"
              placeholder="Senha"
            />

            <button
              className="bg-rose-500 hover:bg-rose-600 rounded-md py-2 px-10 text-white font-600 transition-colors"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log("hello from login");
              }}
            >
              Login
            </button>
          </form>
          <hr />
          <div className="flex flex-col items-center py-5 gap-3 ">
            <h1 className="text-slate-700">Ainda não tem uma conta?</h1>
            <button
              className="bg-white rounded-md py-2 px-10 border-2 border-stone-300 hover:border-rose-500 text-slate-700 transition-colors"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log("hello from signup");
              }}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
