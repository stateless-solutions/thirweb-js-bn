import { createSOLProgramQueryKey } from "../../../core/query-utils/query-key";
import { RequiredParam } from "../../../core/types/shared";
import { useQuery } from "@tanstack/react-query";
import type { NFTCollection, NFTDrop } from "@thirdweb-dev/solana";
import invariant from "tiny-invariant";

export function nftGetOneQuery(
  program: RequiredParam<NFTCollection | NFTDrop>,
  tokenAddress: RequiredParam<string>,
) {
  return {
    queryKey: createSOLProgramQueryKey(program, [
      "get",
      { tokenAddress },
    ] as const),

    queryFn: async () => {
      invariant(program, "program is required");
      invariant(tokenAddress, "tokenAddress is required");
      return await program.get(tokenAddress);
    },
    enabled: !!program && !!tokenAddress,
  };
}

export function useNFT(
  program: RequiredParam<NFTCollection | NFTDrop>,
  tokenAddress: RequiredParam<string>,
) {
  return useQuery(nftGetOneQuery(program, tokenAddress));
}
