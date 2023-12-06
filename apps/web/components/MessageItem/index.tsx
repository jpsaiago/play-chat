import Image from "next/image";
import { UserPicture } from "../UserPicture";

interface TempProps {
  render: any;
  imgSrc?: string;
}

export function MessageItem({ render, imgSrc }: TempProps) {
  return (
    <li className=" p-4 flex flex-row items-center gap-3 border-b-1 border-b-slate-200 ">
      <UserPicture src={imgSrc} />

      <div className="h-full w-[85%] font-inter overflow-hidden">
        <h1 className="text-xl">grsaiago</h1>
        <h2 className="truncate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h2>
      </div>
    </li>
  );
}
