

import { cookies } from "next/headers";
import Card from "@/components/card/card";

export default async function Home() {

  const cookieStore = await cookies();
  const loginToken =  cookieStore.get('loginToken');

  const respons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
    method: 'GET',
    // credentials: 'include',  // don't work
    // this is server side rendering so cookies are available from browser so need manually add cookies
    headers:{
      Cookie:`loginToken=${loginToken?.value}`
    }
  });

  const resData = await respons.json();

  return (
    <div className="flex flex-col w-[400px]">
      {resData.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}