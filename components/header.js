import React from "react";
import { useEffect } from "react";
import { Input, Select, CryptoLogos } from "@web3uikit/core";
import { shortenAddress } from "../utils/shortenAddress";
import { network } from "../utils/network";
import {
  useDisconnect,
  useNetworkMismatch,
  useNetwork,
} from "@thirdweb-dev/react";

const Header = ({ address, chain, setChain }) => {
  const disconnect = useDisconnect();
  const isMismatched = useNetworkMismatch(); // switch to desired chain
  const [, switchNetwork] = useNetwork();

  console.log("chain", chain);

  useEffect(() => {
    networkCheck();
  }, [address, setChain]);

  async function networkCheck() {
      if (chain != "0x5" && chain != "0x13881") {
        if (chain == "0x5") {
            switchNetwork(ChainId.Goerli);
        }
        if (chain == "0x13881") {
            switchNetwork(ChainId.Mumbai);
        }
    }
  }

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
          {network}
        </div>
      </div>
    </div>
  );
};

export default Header;
