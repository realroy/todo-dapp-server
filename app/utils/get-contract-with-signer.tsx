import type { ContractInterface } from "ethers";
import { Contract, providers } from "ethers";

declare global {
    interface Window { ethereum: any; }
}

export function getContractWithSigner(
  contractAddress: string,
  contractAbi: ContractInterface
) {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new Contract(contractAddress, contractAbi, signer);
}
