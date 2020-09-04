import styled from "styled-components";

const DropDownContainer = styled.div`
  position: absolute;
  top: 16%;
  padding-bottom: 1%;
  background-color: #2e2a27;
  box-shadow: 0 8px 8px #000000;
  width: 20%;
  @media screen and (max-width: 600px) {
    top: 38%;
    width: 30%;
  }
`;

export default DropDownContainer;
