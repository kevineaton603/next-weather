import Head from "next/head";
import { Container } from "semantic-ui-react";
import Nav from "./nav";

/**
 *
 * @type {React.FC<React.PropsWithChildren<{title: string}>>}
 */
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - Next Weather</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <Nav active={title} />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
