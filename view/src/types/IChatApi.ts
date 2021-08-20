import { Chat } from "./Chat";

export interface IChatApi {
    adicionar(chat: Chat): Promise<void>;

    entrar(nome: string): Promise<Chat>;

    pegarChats(): Promise<Chat[]>;
}