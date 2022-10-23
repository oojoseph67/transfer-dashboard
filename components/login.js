import { useAddress, useMetamask } from "@thirdweb-dev/react";

function Login() {
  const connectWithMetamask = useMetamask(); // use metamask connector automatically
  return (
    <div className="bg-[#091818] min-h-screen flex flex-col items-center justify-center text-center">
      <img
        className="rounded-full h-56 w-56 mb-10"
        src="https://previews.123rf.com/images/eljanstock/eljanstock1811/eljanstock181110281/112188938-transfer-vector-icon-isolated-on-transparent-background-transfer-transparency-logo-concept.jpg"
        alt="image"
      ></img>
      <h1 className="text-6xl text-white font-bold">Transfer Dashboard</h1>
      <br></br>
      <h2 className="text-white">
        {" "}
        Get Started By Logging in with your Metamask{" "}
      </h2>

      <button
        onClick={connectWithMetamask}
        className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
      >
        Login with Metamask{" "}
        <img
          className="h-10"
          scr="https://www.clipartmax.com/png/middle/201-2010951_metamask-ethereum.png"
        />
      </button>
      {/* <ConnectWallet></ConnectWallet> */}
    </div>
  );
}

export default Login;
