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
  useContractMetadata,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

export default function Home() {
  const [chain, setChain] = useState("0x5");
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  console.log("address", address);

  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  console.log("contractAddress", contract);
  // const contractMetadata = useContractMetadata(contract);
  // console.log("contractMetadata", useContractMetadata(contract))

  const nativeToken = useBalance();
  console.info("nativeToken", nativeToken);

  const balance = nativeToken.data?.displayValue;
  const symbol = nativeToken.data?.symbol;
  const name = nativeToken.data?.name;
  const decimals = nativeToken.data?.decimals;

  console.log("balance", balance);
  console.log("symbol", symbol);
  console.log("name", name);
  console.log("decimals", decimals);

  const [newBalance, setNewBalance] = useState();
  const [newSymbol, setNewSymbol] = useState();
  const [newName, setNewName] = useState();
  const [newDecimals, setNewDecimals] = useState();

  const [transferContractAddress, setTransferContractAddress] = useState("");
  const [explorer, setExplorer] = useState("");
  console.log("transferContractAddress", transferContractAddress);
  console.log("explorer", explorer);

  const [showRecentTx, setShowRecentTx] = useState(false);
  const [recentTx, setRecentTx] = useState({
    txhash: "",
    from: "",
    to: "",
    amount: "",
    symbol: "",
  });
  const [saveTxLoad, setSaveTxLoad] = useState(false);

  useEffect(() => {
    if (address) {
      console.log("address", address);
    }
    setNewBalance(`${balance}`);
    setNewSymbol(`${symbol}`);
    setNewName(`${name}`);
    setNewDecimals(`${decimals}`);
  }, [address, balance, symbol, name, decimals]);

  if (isLoading) return <Loading></Loading>;
  if (!address) return <Login></Login>;

  return (
    <div className="min-w-full h-screen">
      <Header
        address={address}
        chain={chain}
        setChain={setChain}
        transferContractAddress={transferContractAddress}
        setTransferContractAddress={setTransferContractAddress}
        explorer={explorer}
        setExplorer={setExplorer}
      />
      <h1 className="text-red-700 text-center">
        Welcome to the Transfer Dashboard
      </h1>
      <Main
        address={address}
        balance={balance}
        symbol={symbol}
        name={name}
        decimals={decimals}
        chain={chain}
        contract={contract}
        transferContractAddress={transferContractAddress}
        setTransferContractAddress={setTransferContractAddress}
        explorer={explorer}
        setExplorer={setExplorer}
        showRecentTx={showRecentTx}
        setShowRecentTx={setShowRecentTx}
        recentTx={recentTx}
        setRecentTx={setRecentTx}
        saveTxLoad={saveTxLoad}
        setSaveTxLoad={setSaveTxLoad}
        newBalance={newBalance}
        setNewBalance={setNewBalance}
        newSymbol={newSymbol}
        setNewSymbol={setNewSymbol}
        newName={newName}
        setNewName={setNewName}
        newDecimals={newDecimals}
        setNewDecimals={setNewDecimals}
      />
    </div>
  );
}
