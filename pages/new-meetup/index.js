import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetup() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    console.log(meetupData);
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);

      router.push("/");
    } catch (err) {
      //   console.log(err);
    }
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetup;
