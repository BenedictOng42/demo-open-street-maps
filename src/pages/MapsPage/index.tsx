import React, { FC } from "react";
import { useParams } from "react-router";

const MapsPage: FC = () => {
  const { id } = useParams<{ id?: string }>();
  return <div>Map {id}</div>;
};

export default MapsPage;
