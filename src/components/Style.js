import styled from "styled-components";

export const GridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(252px, 1fr));
  }
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  padding: 10px;
`;

export const GridStyle1 = styled.div`
  display: grid;
  width: 100% ;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(252px, 1fr));
  }
  grid-column-gap: 1em;
  grid-row-gap: 2em;
`;
export const GridStyle3 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  grid-column-gap: 0.2em;
  grid-row-gap: 1em;
  padding: 10px;
`;
export const GridStyle4 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  grid-column-gap: 0.2em;
  grid-row-gap: 1em;
  padding: 10px;
`;

export const GridStyle5 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  grid-column-gap: 0.2em;
  grid-row-gap: 1em;
  padding: 10px;
`;

