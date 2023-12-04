import Head from "next/head";
import { TextInput } from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/auth.hook";
import { FormButton } from "@/components/FormButton";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const signUp = useAuth((state) => state.signUp);

  const { register, handleSubmit, formState } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: "onSubmit",
  });

  async function signUpUser(input: SignUpSchema) {
    const result = await signUp(input);
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
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-100 h-[100vh] flex flex-row gap-3 justify-center items-center">
        <div className="bg-white h-lg w-sm px-10 flex flex-col py-10 rounded-lg shadow-md">
          <form
            className="flex grow flex-col justify-between items-center"
            onSubmit={handleSubmit(signUpUser)}
          >
            <h1 className="text-slate-700 text-2xl">Faça seu cadastro</h1>
            <TextInput placeholder="Email" {...register("email")} />

            <TextInput
              placeholder="Usuário"
              {...register("username")}
              footer="Deve conter pelo menos 3 caracteres"
            />

            <TextInput
              placeholder="Senha"
              footer="Deve conter pelo menos 1 número e 6 caracteres"
              {...register("password")}
            />

            <TextInput
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
            />

            <FormButton
              label={"Cadastrar"}
              className="bg-rose-500 hover:bg-rose-600 rounded-md py-2 px-10 text-white font-600 transition-colors disabled:(bg-rose-300 text-slate-50)"
              type="submit"
            />
          </form>
        </div>
      </main>
    </>
  );
}
