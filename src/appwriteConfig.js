import { Account, Client, Databases } from "appwrite";

export const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("tic-tac-toe");

export const account = new Account(client);

export const dbID = "game_data";
export const collID = "game_coll";

// database
export const databases = new Databases(client, dbID);
