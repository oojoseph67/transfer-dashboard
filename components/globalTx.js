import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import transferABI from "../transfer/transferAbi.json";

const GlobalTx = ({ address, explorer, transferContractAddress }) => {
  const [data, setData] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); // we can only send transaction through our signer

  const ercABI = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)",
    "function decimals() external view returns (uint8)",
  ];

  const transferContract = new ethers.Contract(
    transferContractAddress,
    transferABI,
    signer
  );

  useEffect(() => {
    async function getData() {
      const tx = await transferContract.filters.transactions();
      const txData = await transferContract.queryFilter(tx);
      setData(txData);
    }
    getData();
  });

  return (
    <div className="flex flex-col items-center justify-center p-3 text-white">
      {data.map((e) => {
        return (
          <div
            className={`bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}
          >
            <div className="flex w-full items-center justify-center rounded-t-lg">
              <div className="w-full py-2 px-2">
                <p className="text-sm font-mono">
                  Amount: {ethers.utils.formatEther(e.args.amount)}{" "}
                  {e.args.symbol}
                </p>
                <p className="text-sm font-mono">To: {e.args.to}</p>
                <p className="text-sm font-mono">From: {e.args.from}</p>
              </div>
            </div>
            <a
              target={"_blank"}
              href={`${explorer}/tx/${e.transactionHash}`}
              rel="noreferrer"
            >
              <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
                View Transaction
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default GlobalTx;
