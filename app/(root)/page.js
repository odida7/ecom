import { redirect } from "next/navigation";
import { auth } from "../auth";
import Admin from "@/components/Admin";



export default async function Home() {

  const session = await auth()
  //if(!session) redirect("/api/auth/signin")
  if(!session) redirect("/login")

  //console.log('session:', session);
  //console.log('session:', session.user._doc.username);

  return (
    <div className="w-full">
      <Admin/>
    </div>
  );
}
