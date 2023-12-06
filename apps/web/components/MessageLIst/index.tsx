import { useAuth } from "@/hooks/auth.hook";
import { useShallow } from "zustand/react/shallow";
import { MessageItem } from "../MessageItem";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setShowContactList: Dispatch<SetStateAction<boolean>>;
}

export function MessageList({ setShowContactList }: Props) {
  const [user, logOut] = useAuth(
    useShallow((state) => [state.currentUser, state.logOut])
  );

  return (
    <aside className="h-full w-3/12 border-r border-r-slate-200 ">
      <header className="bg-indigo-400 w-full text-white font-inter text-lg px-4 h-[15%] flex flex-row items-center gap-3">
        <img
          className="object-cover w-[15%] min-w-14 aspect-square rounded-lg overflow-hidden border-2 border-white"
          alt="Contact profile picture"
          src={user?.profilePicture}
        />
        <div className=" flex-col gap-1 flex-grow-1">
          <h1 className="font-inter font-500 text-lg">{user?.displayName}</h1>
          <h2>@{user?.username}</h2>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowContactList(true)}
            className="i-ph-user-plus-bold block bg-white text-2xl"
          />
          <button
            type="button"
            onClick={() => logOut()}
            className="i-ph-sign-out-bold block bg-white text-2xl"
          />
        </div>
      </header>
      <ul className="h-[85%] overflow-y-scroll">
        {[1, 2, 3, 5, 6, 7, 8, 9, 10].map((item) => (
          <MessageItem key={item} render={item} />
        ))}
      </ul>
    </aside>
  );
}
