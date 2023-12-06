interface Props {
  src?: string;
}

export function UserPicture({ src }: Props) {
  return (
    <img
      className="object-cover w-[15%] min-w-14 aspect-square rounded-lg overflow-hidden border-2 border-white"
      alt="Contact profile picture"
      src={src ?? "/empty.jpg"}
    />
  );
}
