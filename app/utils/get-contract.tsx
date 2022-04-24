import type { ContractInterface } from "ethers";
import { Contract, providers } from "ethers";

export function getContract(
  contractAddress: string,
  contractAbi: ContractInterface
) {
  if (!window.ethereum) {
    alert("Please install MetaMask!");

    return;
  }

  const provider = new providers.Web3Provider(window.ethereum);

  return new Contract(contractAddress, contractAbi, provider);
}
