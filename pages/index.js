import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList.js";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image: "https://generatorfun.com/code/uploads/Random-City-image-15.jpg",
    address: "Madrid, Spain",
    description: "Description of the first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image: "https://generatorfun.com/code/uploads/Random-City-image-15.jpg",
    address: "New York, USA",
    description: "Description of the second meetup",
  },
  {
    id: "m3",
    title: "A third meetup",
    image: "https://generatorfun.com/code/uploads/Random-City-image-15.jpg",
    address: "Bengaluru, India",
    description: "Description of the third meetup",
  },
];

export default function Home(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://kesgokul:Iokutty5005@cluster0.sjfyhya.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupsData = await meetupCollection.find().toArray();
  client.close();
  const meetups = meetupsData.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));

  return {
    props: {
      meetups: meetups,
    },
  };
}
