import Image from "next/image";

import Card from "@/components/card/card";

export default async function Home() {

    const respons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,{
      method:'GET'
    });
    const resData = await respons.json();


  return (
    <div className="flex flex-col w-[400px]">
      {
        resData.map((post)=>{
          return(
            <Card key={post.id} post={post}/>
          )
        })
      }
    </div>
  );
}
