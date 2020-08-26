import React from "react";
import Logout from "../components/Logout";
import Footer from "../style/Footer";
import Linked from "../style/Linked";
import FooterSpan from "../style/FooterSpan";

const FooterBox = () => {
  return (
    <Footer>
      Made with{" "}
      <FooterSpan>
        <span role="img" aria-label="love">
          ❤️
        </span>
      </FooterSpan>
      by{" "}
      <Linked to="https://www.linkedin.com/in/alexandra-lhermitte-802a54171/">
        Alex
      </Linked>
      ,{" "}
      <Linked to="https://www.linkedin.com/in/alyson-bernabeu-08249a172/">
        Alyson
      </Linked>
      ,{" "}
      <Linked to="https://www.linkedin.com/in/guillaume-bento-aires-7623071a3/">
        Guillaume
      </Linked>
      ,{" "}
      <Linked to="https://www.linkedin.com/in/pablo-vilella-0bb66b195/">
        Pablo
      </Linked>{" "}
      et{" "}
      <Linked to="https://www.linkedin.com/in/s%C3%A9bastien-morin-70a0371ab/">
        Seb
      </Linked>
      <Logout />
    </Footer>
  );
};

export default FooterBox;
