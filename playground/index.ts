import { createPublicClient, createWalletClient, http, parseAbi } from "viem"
import { arbitrumSepolia } from "viem/chains"
import { privateKeyToAccount } from "viem/accounts"
import "dotenv/config"

export const ABI = parseAbi([
  "function get_value() view returns (uint256)",
  "function set_value(uint256) public",
])

const account = privateKeyToAccount((process as any).env.PRIVATE_KEY)

const client = createWalletClient({
  chain: arbitrumSepolia,
  transport: http(),
  account,
})

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
})

// https://sepolia.arbiscan.io/address/const CONTRACT_ADDRESS = "0x46be8751225be83d7a9b97fec0214c53795d8477"
const CONTRACT_ADDRESS = "0x5faec36f755b7055a576cfd4be9b72e97a0b730e"

/*async function write() {
  const result = await client.writeContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "set_value",
    args: [BigInt(12)],
  })

  console.debug(`Contract: ${result}`)
}*/

async function read() {
  const result = await publicClient.readContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "get_value",
  })

  console.debug(`Contract: ${result}`)
}

read()
// write()
