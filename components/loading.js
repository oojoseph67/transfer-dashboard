import React from "react";
import { PropagateLoader } from "react-spinners";
// import network from "../network";

function Loading() {
  return (
    <div className="bg-[#091B18]  h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2 mb-10">
        <img
          className="rounded-full h-20 w-20"
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fphoto_111617250_transfer-vector-icon-isolated-on-transparent-background-transfer-transparency-logo-concept.html&psig=AOvVaw0h9ud8POJOET46_SEKcy2Y&ust=1666520738721000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOi0qNfP8_oCFQAAAAAdAAAAABAE"
          alt=""
        ></img>
        <h1 className="text-lg text-white font-bold">
          Connecting to Goerli
        </h1>
        <h1 className="text-lg text-white font-bold">
          Loading the Transfer Dashboard...
        </h1>
      </div>
      <PropagateLoader color="white"></PropagateLoader>
    </div>
  );
}

export default Loading;
