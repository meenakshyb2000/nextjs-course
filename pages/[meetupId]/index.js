import { MongoClient ,ObjectId} from "mongodb"; //imports used only in server code wouldnt go to client side bundle,thus reducting size and security
import MeetupDetail from "@/components/meetups/MeetupDetail";
import {Fragment} from 'react'
import Head from 'next/head'
function MeetupDetails({meetupData}) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta
          name="description"
          content={meetupData.description}
        />
      </Head>
      <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
    </Fragment>
    
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    //storing data
    "mongodb+srv://meenakshy:meemu2000@nextjs.zfhwazb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups"); //same or diff name as db
  const meetups = await meetupCollection.find({}, {projection: { _id: 1 }}).toArray(); // 1st arg empty brackets=> give all objects. otherwise can give some filters 2nd arg => fetch all ids but nothing else(1)
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const meetupObjectId = new ObjectId(meetupId); //to convert to mongodb compatible id
    const client = await MongoClient.connect(
      //storing data
      "mongodb+srv://meenakshy:meemu2000@nextjs.zfhwazb.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups"); //same or diff name as db
    const selectedMeetup = await meetupCollection.findOne({_id: meetupObjectId}); //to find specific  
    return {
      props: {
        meetupData: selectedMeetup.data,
      },
    };
  }
export default MeetupDetails;
