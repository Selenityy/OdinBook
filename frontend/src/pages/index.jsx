import React, { useState, useEffect } from "react";

const Index = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div>{feed}</div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/user/:userId/posts/");
    const feed = await res.json();

    console.log("fetched feed:", feed);

    return {
      props: {
        feed,
      },
      revitalize: 2,
    };
  } catch (error) {
    console.error("Error fetching feed:", error);
    return {
    //   redirect: { destination: "/login" },
    };
  }
}

export default Index;
