// /api/new-meetup
// POST/api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {

  if (req.method === "POST") {
    const data = req.body; //getting request

    const client = await MongoClient.connect(
      //storing data
      "mongodb+srv://meenakshy:meemu2000@nextjs.zfhwazb.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db= client.db();
    const meetupCollection = db.collection("meetups"); //same or diff name as db
    const result = await meetupCollection.insertOne({ data }); //to insert one new document(just like an object) and returns a promise.. so await
    console.log(result);
    client.close(); //to close the db connection

    //To send a response back
    res.status(201).json({ message: "Meetup Inserted!" }); //status()=> to set status code of response... json()=> to prepare the JSON data that will be added to the outgoing response.
  }
}
export default handler;

