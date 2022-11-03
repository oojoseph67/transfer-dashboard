import React, { useState, useEffect } from "react";
import Send from "./send";
import Recipients from "./recipients";
import RecentTx from "./recentTx";
import GlobalTx from "./globalTx";

const Main = ({
  address,
  balance,
  symbol,
  decimals,
  name,
  contract,
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
  newBalance,
  setNewBalance,
  newSymbol,
  setNewSymbol,
  newName,
  setNewName,
  newDecimals,
  setNewDecimals,
  recipientAddress,
  setRecipientAddress,
}) => {
  const [route, setRoute] = useState("send");

  useEffect(() => {
    <Send />;
    route === "send" ? setRoute("send") : setRoute("recipients");
  }, [address, chain]);

  return (
    <div className="w-full mt-12 flex flex-col justify-center items-center">
      <div className="flex justify-around text-log font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-1/2">
        <li
          onClick={() => setRoute("send")}
          className={`list-none cursor-pointer py-2 w-1/4 ${
            route == "send" ? "bg-black bg-opacity-60" : "bg-gray-900"
          } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
          Send
        </li>
        <li
          onClick={() => setRoute("recipients")}
          className={`list-none cursor-pointer py-2 w-1/4 ${
            route == "recipients" ? "bg-black bg-opacity-60" : "bg-gray-900"
          } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
          Recipients
        </li>
        <li
          onClick={() => setRoute("recentTx")}
          className={`list-none cursor-pointer py-2 w-1/4 ${
            route == "recentTx" ? "bg-black bg-opacity-60" : "bg-gray-900"
          } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
          RecentTx
        </li>
        <li
          onClick={() => setRoute("globalTx")}
          className={`list-none cursor-pointer py-2 w-1/4 ${
            route == "globalTx" ? "bg-black bg-opacity-60" : "bg-gray-900"
          } text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}
        >
          GlobalTx
        </li>
      </div>
      <div className="bg-opacity-60 pb-5 overflow-y-auto border-2 border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-1/2">
        {(() => {
          if (route == "send") {
            return (
              <Send
                address={address}
                balance={balance}
                symbol={symbol}
                name={name}
                chain={chain}
                decimals={decimals}
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
                recipientAddress={recipientAddress}
                setRecipientAddress={setRecipientAddress}
              />
            );
          } else if (route == "recipients") {
            return (
              <Recipients
                address={address}
                recipientAddress={recipientAddress}
                transferContractAddress={transferContractAddress}
                setRecipientAddress={setRecipientAddress}
              />
            );
          } else if (route == "recentTx") {
            return (
              <RecentTx
                address={address}
                explorer={explorer}
                setExplorer={setExplorer}
                transferContractAddress={transferContractAddress}
              />
            );
          } else if (route == "globalTx") {
            return <GlobalTx></GlobalTx>;
          }
        })()}
      </div>
    </div>
  );
};

export default Main;
