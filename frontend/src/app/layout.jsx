import Header from "@/components/Header";
import { ReduxProvider } from "@/redux/provider";

export const metadata = {
  title: "OdinBook",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
