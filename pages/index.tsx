import { Blogpost } from "./api/get-all-posts";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Blogpost[]>([]);

  const fetchIt = async () => {
    const { entries } = await (await fetch("/api/get-all-posts")).json();
    console.log(entries);
    setPosts(entries);
  };

  return (
    <>
      <h1>Hello</h1>
      <button onClick={fetchIt}>Click me</button>

      {!!posts.length &&
        posts.map((post) => (
          <>
            <h2>{post.title}</h2>
            <span>{post.published}</span>
            <p>{post.description}</p>
          </>
        ))}
    </>
  );
};

export default Home;
