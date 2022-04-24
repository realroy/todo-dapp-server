export const connectWallet = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    alert("Please install MetaMask!");

    return;
  }

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log("Connected", accounts[0]);
};
