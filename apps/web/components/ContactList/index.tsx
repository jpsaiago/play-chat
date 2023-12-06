import { Dispatch, SetStateAction } from "react";
import { FormButton } from "../FormButton";
import { TextInput } from "../TextInput";

interface Props {
  setShowContactList: Dispatch<SetStateAction<boolean>>;
}

export function ContactList({ setShowContactList }: Props) {
  return (
    <aside className="h-full w-3/12 border-r border-r-slate-200 ">
      <div className="w-full pt-6 pb-4 px-4 flex items-center gap-6">
        <button
          type="button"
          onClick={() => setShowContactList(false)}
          className="i-ph-arrow-bend-up-left block bg-indigo-400 text-3xl"
        />
        <h1 className="font-inter text-xl">Amigos</h1>
      </div>
      <form className="flex flex-row gap-3 px-3 py-4">
        <TextInput />
        <FormButton mini label="Adicionar" />
      </form>
    </aside>
  );
}
