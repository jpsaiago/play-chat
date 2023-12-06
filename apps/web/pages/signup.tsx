import { FormButton } from "@/components/FormButton";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/hooks/auth.hook";
import { SignUpSchema, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const user = useAuth((s) => s.currentUser);

  const router = useRouter();

  const signUp = useAuth((state) => state.signUp);

  const [picturePreview, setPicturePreview] = useState("");

  const { register, handleSubmit, setValue } = useForm<SignUpSchema>({
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

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Play Chat</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-100 h-[100vh] flex flex-row justify-center items-center">
        <form
          className="bg-white h-2xl w-5xl grid grid-cols-2 rounded-lg shadow-md"
          onSubmit={handleSubmit(signUpUser)}
        >
          <div className="flex grow flex-col p-10 gap-7 justify-center items-center rounded-l-lg bg-indigo-400">
            <label className=" w-[40%] relative">
              {picturePreview ? (
                <div className="w-full min-w-20 relative aspect-square z-1 rounded-lg overflow-hidden border-2 border-white hover:cursor-pointer">
                  <div className="z-100 right-1 bg-white rounded-full w-8 h-8 bottom-1 absolute block">
                    <i className="i-ph-plus-circle-bold text-4xl w-full h-full block bg-slate-700 z-1000" />
                  </div>
                  <img className="object-cover w-full " src={picturePreview} />
                </div>
              ) : (
                <div className="w-full aspect-square rounded-lg border-2 bg-white border-white items-center justify-center flex">
                  <i
                    className={
                      "i-ph-user-circle-plus-fill  md:text-9xl block hover:cursor-pointer bg-slate-500"
                    }
                  />
                </div>
              )}

              <input
                className="hidden"
                type="file"
                {...(register("profilePicture"),
                {
                  onChange: (e) => {
                    if (!e.target.files || e.target.files.length === 0) {
                      setPicturePreview("");
                      return;
                    }
                    const file = e.target.files[0];
                    console.log(file);
                    setValue("profilePicture", e.target.files[0]);
                    const pictureUrl = URL.createObjectURL(file);
                    setPicturePreview(pictureUrl);
                  },
                })}
              />
            </label>

            <TextInput
              placeholder="Nome de perfil"
              {...register("displayName")}
            >
              <p className="mt-1 text-sm font-600 text-center text-white">
                Esse é o nome que aparecerá para outros usuários
              </p>
            </TextInput>
          </div>
          <div className="flex grow flex-col p-10 justify-around items-center">
            <h1 className="text-slate-700 text-2xl">Faça seu cadastro</h1>

            <TextInput placeholder="Usuário" {...register("username")}>
              <p className="mt-1 text-xs text-center text-slate-500">
                Deve conter pelo menos 3 caracteres
              </p>
            </TextInput>

            <TextInput placeholder="Email" {...register("email")} />

            <TextInput isPassword placeholder="Senha" {...register("password")}>
              <p className="mt-1 text-xs text-center text-slate-500">
                Deve conter pelo menos 1 número e 6 caracteres
              </p>
            </TextInput>

            <TextInput
              isPassword
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
            />

            <FormButton label={"Cadastrar"} type="submit" />
          </div>
        </form>
      </main>
    </>
  );
}
