import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";

const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ height: "70vh" }}>{props.children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Anytime Anywhere",
  description: "Mern Stack Ecommerce App",
  keywords: "Ecommerce, Mern Stack, React, Redux, Node, Express, MongoDB",
  author: "Mohit",
};

export default Layout;
