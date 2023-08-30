import Footer from "layout/Footer";
import Header from "layout/Header";
import Masthead from "layout/Masthead";
import { Fragment } from "react";
import './Layout.scss'
import Nav from "components/nsw-design-system/Nav";
const Layout = (props: any) => {
  const { children } = props;
  return (
    <Fragment>
      <Masthead></Masthead>

      <Header></Header>
      <Nav></Nav>
      <main id="content">{children}</main>
      <Footer></Footer>
    </Fragment>
  );
};

export default Layout;
