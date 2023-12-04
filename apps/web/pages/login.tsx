import Head from "next/head";
import { TextInput } from "@/components/TextInput";
import { FormButton } from "@/components/FormButton";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const signIn = useAuth((state) => state.signIn);

  const { register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    reValidateMode: "onSubmit",
  });

  async function signInUser(input: SignInSchema) {
    const result = await signIn(input);
    switch (result) {
      case "failure":
        return console.log("usuário inválido");
      case "success":
        return router.push("/");
    }
  }

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
          <form
            className="flex grow flex-col justify-between py-5 items-center"
            onSubmit={handleSubmit(signInUser)}
          >
            <TextInput placeholder="Usuário" {...register("username")} />

            <TextInput
              placeholder="Senha"
              isPassword={true}
              {...register("password")}
            />

            <FormButton label="Login" type="submit" />
          </form>
          <hr />
          <div className="flex flex-col items-center py-5 gap-3 ">
            <h1 className="text-slate-700">Ainda não tem uma conta?</h1>

            <Link
              className="bg-white rounded-md py-2 px-10 border-2 border-stone-300 hover:border-rose-500 text-slate-700 transition-colors "
              type="button"
              href={"/signup"}
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
