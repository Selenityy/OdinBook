import Link from "next/link";

const Home = ({ feed }) => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <div>{feed}</div> */}
      <Link href="login">Log in here.</Link>
      {/* <Login /> */}
    </div>
  );
};

// export async function getStaticProps() {
//   try {
//     const res = await fetch("http://localhost:3000/user/:userId/posts/");
//     const feed = await res.json();

//     console.log("fetched feed:", feed);

//     return {
//       props: {
//         feed,
//       },
//       revitalize: 2,
//     };
//   } catch (error) {
//     console.error("Error fetching feed:", error);
//     return {
//     //   redirect: { destination: "/login" },
//     };
//   }
// }

export default Home;
