import { MongoClient } from "mongodb";

export async function ConnectDb() {
  const client = await MongoClient
    .connect
    //url
    ();
  return client;
}
