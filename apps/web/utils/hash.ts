import axios from "axios";

export async function preHashPassword(password: string) {
  const result = await axios.post<{ hash: string }>("/api/hash", {
    input: password,
  });
  return result.data.hash;
}
