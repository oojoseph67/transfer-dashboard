import React, { createContext, useState, useEffect } from "react";
import { TailSpin, Bars } from "react-loader-spinner";
import {
  useContractMetadata,
  useTokenBalance,
  useContract,
} from "@thirdweb-dev/react";
import Header from "./header";
import { ethers } from "ethers";
import transferABI from "../transfer/transferAbi.json";

const AppState = createContext();

const Send = ({
  address,
  balance,
  symbol,
  decimals,
  name,
  chain,
  transferContractAddress,
  setTransferContractAddress,
  explorer,
  setExplorer,
  showRecentTx,
  setShowRecentTx,
  recentTx,
  setRecentTx,
  saveTxLoad,
  setSaveTxLoad,
  // contract,
}) => {
  const [showERC, setShowERC] = useState(false);
  const [ercLoading, setERCLoading] = useState(false);
  const [tokenChanged, setTokenChanged] = useState(false);
  const [ercTokenAddress, setERCTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  // const [selectToken, setSelectToken] = useState("");

  const [newBalance, setNewBalance] = useState(`${balance}`);
  const [newSymbol, setNewSymbol] = useState(`${symbol}`);
  const [newName, setNewName] = useState(`${name}`);
  const [newDecimals, setNewDecimals] = useState(`${decimals}`);

  console.log("newBalance", newBalance);
  console.log("newSymbol", newSymbol);
  console.log("newName", newName);
  console.log("newDecimals", newDecimals);

  useEffect(() => {
    setCustomTokenDetails();
    setNativeTokenDetails();
    selectToken();
    chain;
  }, [address, chain, setNewBalance, setNewSymbol, setNewName, setNewDecimals]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); // we can only send transaction through our signer

  const ercABI = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)",
    "function decimals() external view returns (uint8)",
  ];

  const ercContract = new ethers.Contract(ercTokenAddress, ercABI, signer);
  const transferContract = new ethers.Contract(
    transferContractAddress,
    transferABI,
    signer
  );
  console.log("ercTokenAddress", ercTokenAddress);
  console.log("ercContract", ercContract);
  console.log("test", ercContract.address);

  const selectToken = async () => {
    setERCLoading(true);
    try {
      const ercBalance = await ercContract.balanceOf(address);
      const ercSymbol = await ercContract.symbol();
      const ercName = await ercContract.name();
      const ercDecimals = await ercContract.decimals();

      setNewBalance(ethers.utils.formatEther(ercBalance));
      setNewSymbol(ercSymbol);
      setNewName(ercName);
      setNewDecimals(ercDecimals);
      setTokenChanged(true);
      setERCLoading(false);

      console.log("newStuff", ercBalance, ercSymbol, ercName, ercDecimals);
    } catch (error) {
      console.log("error", error);
      setERCLoading(false);
    }
  };

  // const { data: tokenBalance, error } = useTokenBalance(contract, address);

  // console.log("tokenBalance", tokenBalance);

  // const selectToken = async () => {
  //   setERCLoading(true);

  //   console.log("tokenBalance", tokenBalance);
  //   setNewBalance(tokenBalance?.displayValue);
  //   setNewName(tokenBalance?.name);
  //   setNewSymbol(tokenBalance?.symbol);
  //   setNewDecimals(tokenBalance?.decimals);
  //   setTokenChanged(true);
  //   setERCLoading(false);
  // };

  const removeToken = async () => {
    setERCLoading(true);

    setNewBalance(`${balance}`);
    setNewName(`${name}`);
    setNewSymbol(`${symbol}`);
    setNewDecimals(`${decimals}`);
    setERCTokenAddress("");

    setShowERC(false);
    setTokenChanged(false);
    setERCLoading(false);
  };

  const transferAmount = async () => {
    setTxLoading(true);
    try {
      if (tokenChanged) {
        const tx = await ercContract.transfer(recipientAddress,ethers.utils.parseEther(amount));
        await tx.wait();
        setCustomTokenDetails();
        setRecentTx({
          txhash: tx.hash,
          from: address,
          to: recipientAddress,
          amount: amount,
          symbol: newSymbol,
        })
        setShowRecentTx(true);
        console.log(`${amount} ${newSymbol} token successfully sent to ${recipientAddress}`);
        setMessage(`${amount} ${newSymbol} token successfully sent to ${recipientAddress}`);
        // setMessage("Transfer Successful");
        setAmount("");
      } else {
        const tx = await transferContract._transfer(recipientAddress, newSymbol,
          {
            value: ethers.utils.parseEther(amount),
          }
        );
        await tx.wait();
        setNativeTokenDetails();
        console.log("this is the balance after transfer", balance);
        console.log(`${amount} ${newSymbol} native token successfully sent to ${recipientAddress}`);
        setMessage(`${amount} ${newSymbol} native token successfully sent to ${recipientAddress}`);
      }
    } catch (error) {
      setError(error.message);
      console.log("transfer error", error);
    }
    setTxLoading(false);
  };

  async function saveTx() {
    setSaveTxLoad(true);
    try {
      const tx = await transferContract.saveTx(recentTx.from, recentTx.to, ethers.utils.parseEther(recentTx.amount), recentTx.symbol);
      await tx.wait();

      setMessage("Transaction Saved Successfully");
    } catch (error) {
      setError(error.message)
      console.log("error", error);
    }
    setSaveTxLoad(false);
  }

  async function setCustomTokenDetails() {
    selectToken();
  }

  async function setNativeTokenDetails() {
    setNewBalance(`${balance}`);
    setNewName(`${name}`);
    setNewSymbol(`${symbol}`);
    setNewDecimals(`${decimals}`);
  }

  return (
    <div className="flex flex-col justify-center items-center text-white">
      {/* Balance */}
      <div className="flex w-4/5 justify-around items-center mt-7">
        <div
          onClick={() => setShowERC(showERC ? false : true)}
          className="flex cursor-pointer justify-center items-center border-2 border-b-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-coin"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
          <h1 className="ml-2 text-sm font-medium">{newName}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
        </div>
        <div className="flex border-2 border-blue-900 border-opacity-60 p-3 bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-wallet2"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
          </svg>
          <h1 className="ml-2 text-sm font-medium">Balance:</h1>
          <h1 className="ml-2 text-sm font-medium">
            {newBalance?.substring(0, 5)} {newSymbol}
          </h1>
        </div>
      </div>
      {/* ERC20 Address */}
      {showERC ? (
        <div className="flex w-4/5 justify-between items-center mt-5">
          <input
            onChange={(e) => setERCTokenAddress(e.target.value)}
            value={ercTokenAddress}
            className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
            placeholder="ERC20 Address"
          />
          {ercLoading ? (
            <div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
              <TailSpin width={20} height={20} color={"#fff"} />
            </div>
          ) : tokenChanged ? (
            <div
              onClick={removeToken}
              className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg"
            >
              Remove Token
            </div>
          ) : (
            <div
              onClick={selectToken}
              className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-sm font-medium rounded-lg"
            >
              Select Token
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {/* Transfer To */}
      <div className="flex w-4/5 justify-between items-center mt-5">
        <input
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipientAddress}
          className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Transfer To"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type={"number"}
          className="w-1/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none text-sm rounded-lg"
          placeholder="Amount"
        />
      </div>
      {/* Transfer Button */}
      {txLoading ? (
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-lg font-medium rounded-lg">
          <Bars width={20} height={20} color={"#fff"} />
        </div>
      ) : (
        <div
          onClick={transferAmount}
          className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-lg font-medium rounded-lg"
        >
          Transfer
        </div>
      )}
      {/* Recent Tx Section */}
      <div className={`${showRecentTx ? '' : 'hidden'} bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}>
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2">
            <p className="text-xl font-mono">Amount: {recentTx.amount} {recentTx.symbol}</p>
            <p className="text-xs font-mono">To: {recentTx.to}</p>
          </div>
          {saveTxLoad ? (
            <div className="flex justify-center bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
              <TailSpin
                height={12} 
                width={12}
                color={"#fff"}
              />
            </div>
          ) : (
            <button onClick={saveTx} className="bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
              Save
            </button>
          )}
          <button onClick={() => setShowRecentTx(false)} className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
            Ignore
          </button>
        </div>
        <a target={'_blank'} rel="noreferrer" href={`${explorer}/tx/${recentTx.txhash}`}>
          <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
            View Transaction
          </div>
        </a>
      </div>
      {/* Error & Message */}
      <div className="flex w-4/5 justify-center items-center mt-5">
        <p className="text-red-600 text-lg mt-2 px-3">{error}</p>
        <p className="text-green-600 text-lg mt-2 px-1">{message}</p>
      </div>
    </div>
  );
};

export default Send;
