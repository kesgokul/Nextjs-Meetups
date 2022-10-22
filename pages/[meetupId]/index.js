import MeetupDetail from "../../components/meetups/MeetupDetail";
// import { MongoClient } from "mongodb";
import { ConnectDb } from "../../components/helpers/helpers";
import { Fragment, useState } from "react";
import { ObjectId } from "mongodb";

function MeetupDetails(props) {
  return <MeetupDetail {...props.meetupData} />;
}

export default MeetupDetails;

export async function getStaticPaths() {
  const client = await ConnectDb();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetupIds.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await ConnectDb();
  const meetupsCollection = client.db().collection("meetups");
  const meetupData = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  console.log(meetupData);
  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        image: meetupData.image,
        address: meetupData.address,
        description: meetupData.description,
      },
    },
  };
}
