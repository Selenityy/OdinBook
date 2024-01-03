import React from "react";
import { UserProvider } from "@/context/Context";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {/* <Header>Header Content</Header> */}
          <main>{children}</main>
          {/* <Footer>Footer Content</Footer> */}{" "}
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
