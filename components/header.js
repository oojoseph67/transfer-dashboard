import React from "react";
import { useEffect } from "react";
import { Input, Select, CryptoLogos } from "@web3uikit/core";
import { shortenAddress } from "../utils/shortenAddress";
import { network } from "../utils/network";
import {
  useDisconnect,
  useNetworkMismatch,
  useMetamask,
  useNetwork,
  useAddress,
  useBalance,
  ChainId,
} from "@thirdweb-dev/react";

const Header = ({
  address,
  chain,
  setChain,
  transferContractAddress,
  setTransferContractAddress,
  explorer,
  setExplorer,
}) => {
  const disconnect = useDisconnect();
  const isMismatched = useNetworkMismatch(); // switch to desired chain
  const [, switchNetwork] = useNetwork();

  // const balance = useBalance();
  // console.log(`here is your balance ${balance.data?.displayValue}`);
  // const displayBalance = balance.data?.displayValue;

  console.log("chain", chain);

  useEffect(() => {
    networkCheck();
  }, [address, chain]);

  async function networkCheck() {
    if (chain == "0x5") {
      setTransferContractAddress(
        process.env.NEXT_PUBLIC_TRANSFER_CONTRACT_ADDRESS_GOERLI
      );
      setExplorer(process.env.NEXT_PUBLIC_EXPLORER_GOERLI);
      switchNetwork(ChainId.Goerli);
    } else if (chain == "0x13881") {
      setTransferContractAddress(
        process.env.NEXT_PUBLIC_TRANSFER_CONTRACT_ADDRESS_POLYGON
      );
      setExplorer(process.env.NEXT_PUBLIC_EXPLORER_POLYGON);
      switchNetwork(ChainId.Mumbai);
    } else {
      setTransferContractAddress(
        process.env.NEXT_PUBLIC_TRANSFER_CONTRACT_ADDRESS_GOERLI
      );
      setExplorer(process.env.NEXT_PUBLIC_EXPLORER_GOERLI);
      switchNetwork(ChainId.Goerli);
    }
  }

  // const balance = useBalance();
  // console.log("balance", balance);

  return (
    <div className="w-full h-1/4 pt-4 flex justify-between items-start">
      {/* Logo */}
      <img
        className="h-12 ml-2"
        src="https://previews.123rf.com/images/eljanstock/eljanstock1811/eljanstock181110281/112188938-transfer-vector-icon-isolated-on-transparent-background-transfer-transparency-logo-concept.jpg"
      />
      <div className="flex justify-between items-start">
        <div className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center">
          {shortenAddress(address)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-wallet"
            viewBox="0 0 16 16"
          >
            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
            {address}
          </svg>
        </div>
        {/* chain section */}
        <div className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black text-white rounded-flex justify-between items-center">
          {/* <img
            className="h-6 mr-2"
            src="https://icon2.cleanpng.com/20190418/rlw/kisspng-ethereum-portable-network-graphics-computer-icons-developers-icon-request-icon-ethereum-5cb941c1887a19.467717411555644865559.jpg"
          /> */}
          <Select
            defaultOptionIndex={0}
            id="Chain"
            onChange={(e) => setChain(e.value)}
            options={[
              {
                id: "eth",
                label: "Goerli",
                value: "0x5",
                prefix: <CryptoLogos chain="ethereum" />,
              },
              {
                id: "mat",
                label: "Polygon Mumbai",
                value: "0x13881",
                prefix: <CryptoLogos chain="polygon" />,
              },
            ]}
          />
        </div>
        {/* disconnect button */}
        <div className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center">
          <button onClick={disconnect}>
            Disconnect{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
