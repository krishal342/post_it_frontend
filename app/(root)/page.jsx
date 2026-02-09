

"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card/card";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home`,
          {
            method: "GET",
            credentials: "include", // ✅ send cookies
          }
        );

        const resData = await response.json();
        setPosts(resData);
        setLoading(false);

    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-[400px]">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}