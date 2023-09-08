import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    //adding data to db
    const response = await fetch("/api/new-meetup", {
      //will trigger the handler fn there
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    console.log(data);

    // router.replace() //so that we cqannot go back with back button
    router.push("/"); //go to home page
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup!</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage;
