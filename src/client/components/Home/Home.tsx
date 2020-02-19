import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Home = (props: IProps) => {
  return <div style={{ height: "500px" }}>Home</div>;
};

export default Home;
