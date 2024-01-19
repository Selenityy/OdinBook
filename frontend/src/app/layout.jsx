import { UserProvider } from "@/context/Context";
import Header from "@/components/Header";

export const metadata = {
  title: "OdinBook",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {/* <Header /> */}
          <main>{children}</main>
          {/* <Footer>Footer Content</Footer> */}{" "}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
