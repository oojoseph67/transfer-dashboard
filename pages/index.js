import { useState, useEffect } from "react";
import Header from "../components/header";
import Login from "../components/login";
import Main from "../components/main";
import Loading from "../components/loading";
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractData,
  useContractCall,
  useContractRead,
  useContractWrite,
  useBalance,
} from "@thirdweb-dev/react";

export default function Home() {
  const [chain, setChain] = useState("0x5");
  const address = useAddress();

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  )
  console.log("address", address);

  if (isLoading) return <Loading></Loading>;
  if (!address) return <Login></Login>;

  return (
    <div className="min-w-full h-screen">
      <Header
        address={address}
        chain={chain}
        setChain={setChain}
      />
      <h1 className="text-red-700 text-center">
        Welcome to the Transfer Dashboard
      </h1>
      <Main/>
    </div>
  );
}
