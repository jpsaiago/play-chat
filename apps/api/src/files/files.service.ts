import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

@Injectable()
export class FilesService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      process.env.SUPABASE_URL ?? "",
      process.env.SUPABASE_ACESS_KEY ?? ""
    );
  }

  async uploadPicture(file: Express.Multer.File, userID: string) {
    try {
      //Faz o upload da imagem usando as informações que vem do arquivo e do banco de dados
      await this.supabaseClient.storage
        .from("profile-pictures")
        .upload(`${userID}.${file.mimetype.split("/")[1]}`, file.buffer, {
          contentType: file.mimetype,
        });

      //Gera a url da imagem que vai ser armazenada no banco de dados
      return this.supabaseClient.storage
        .from("profile-pictures")
        .getPublicUrl(`${userID}.${file.mimetype.split("/")[1]}`).data
        .publicUrl;
    } catch (error) {
      throw new HttpException(
        "Algo deu errado.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
