import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { TailSpin, Bars } from "react-loader-spinner";
import transferABI from "../transfer/transferAbi.json";

const Recipients = ({
  address,
  transferContractAddress,
  recipientAddress,
  setRecipientAddress,
}) => {
  const [recipientAddressTwo, setRecipientAddressTwo] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [txLoading, setTxLoading] = useState(false);
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);

  console.info("transferContract", transferContract);

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
      const recipient = await transferContract.filters.recipients(address);
      const recipientData = await transferContract.queryFilter(recipient);
      setData(recipientData);
    }
    getData();
  }, [num]);

  const saveRecipient = async () => {
    setTxLoading(true);
    try {
      const tx = await transferContract.addRecipient(
        recipientAddressTwo,
        recipientName
      );
      await tx.wait();
      setMessage("Recipient Added Successfully");
      console.log("Recipient Added Successfully");
      setRecipientAddressTwo("");
      setRecipientName("");
    } catch (error) {
      console.error(error);
      setError("Error saving recipient", error.message);
    }
    let nextNum = numm + 1;
    setNum(nextNum);
    setTxLoading(false);
  };

  const setAddressToSend = (address, name) => {
    setRecipientAddress(address);
    setMessage(`Recipient set to ${name}`);
  }

  return (
    <div className="flex flex-col items-center justify-center py-3 px-4 text-white">
      <input
        onChange={(e) => setRecipientAddressTwo(e.target.value)}
        value={recipientAddressTwo}
        className="w-full p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
        placeholder="Recipient Address"
      />
      <input
        onChange={(e) => setRecipientName(e.target.value)}
        value={recipientName}
        className="mt-2 w-full p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
        placeholder="Recipient Name"
      />
      {txLoading ? (
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-lg font-medium rounded-lg">
          <Bars width={20} height={20} color={"#fff"} />
        </div>
      ) : (
        <div
          onClick={saveRecipient}
          className="w-full flex mt-4 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-lg font-medium rounded-lg"
        >
          Save
        </div>
      )}
      {/* Error & Message */}
      <div className="flex w-4/5 justify-center items-center mt-5">
        <p className="text-red-600 text-lg mt-2 px-3">{error}</p>
        <p className="text-green-600 text-lg mt-2 px-1">{message}</p>
      </div>

      <div className="flex flex-col items-center justify-center mt-4 w-full">
        {data.map((e) => {
          return (
            <div
              onClick={(error) =>
                setAddressToSend(e.args.recipient, e.args.recipientName)
              }
              className={`bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-3/4 mt-2`}
            >
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-sm font-mono">
                    Name: {e.args.recipientName}
                  </p>
                  <p className="text-sm font-mono">
                    Address: {e.args.recipient}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recipients;
