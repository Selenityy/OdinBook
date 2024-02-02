import { ReduxProvider } from "@/redux/provider";
import CheckAuth from "@/components/CheckAuth";

export const metadata = {
  title: "OdinBook",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <CheckAuth />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
