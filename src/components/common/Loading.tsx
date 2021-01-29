import React from "react";
import { BarLoader } from "react-spinners";

export default function Loading() {
  return <BarLoader color={"#333"} loading={true} />;
}
