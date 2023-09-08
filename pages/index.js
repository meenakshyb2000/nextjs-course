import { MongoClient } from "mongodb"; //imports used only in server code wouldnt go to client side bundle,thus reducting size and security
import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a list of highly active meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }
export async function getStaticProps() {
  //fetch data from an API
  // can do anything that can be done on server
  //always returns an object
  const client = await MongoClient.connect(
    "mongodb+srv://meenakshy:meemu2000@nextjs.zfhwazb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups"); //same or diff name as db
  const meetupsData = await meetupCollection.find().toArray(); //async task returning promise which will find all meetups
  client.close();
  return {
    //need to be named props. This props will be the props given to the component fn, ie HomePage
    props: {
      //without map error, coz _id that is auto gen by mongodb cant be simply converted
      meetups: meetupsData.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
