import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log("handler");

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://kesgokul:Iokutty5005@cluster0.sjfyhya.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);
      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (err) {
      console.log(JSON.parse(err));
    }
  }
}

export default handler;

// import { MongoClient } from 'mongodb';
// async function handler(req, res) {
//   if (req.method === 'POST') {
//     const data = req.body;

//     const client = await MongoClient.connect(
//       'mongodb+srv://maximilian:arlAapzPqFyo4xUk@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
//     );
//     const db = client.db();

//     const meetupsCollection = db.collection('meetups');

//     const result = await meetupsCollection.insertOne(data);

//     console.log(result);

//     client.close();

//     res.status(201).json({ message: 'Meetup inserted!' });
//   }
// }

// export default handler;
