import { MongoClient } from "mongodb";

export async function ConnectDb() {
  const client = await MongoClient.connect(
    "mongodb+srv://kesgokul:Iokutty5005@cluster0.sjfyhya.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  return client;
}
