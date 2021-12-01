import { bchjs } from "./bch-js-utils";

const generateMnemonic = () => {
  const mnemonic = bchjs.Mnemonic.generate(128);
  return mnemonic;
};

const deriveAccount = async (
  mnemonic,
  hdPath,
  accountIndex,
  childIndex,
  network
) => {
  if (!mnemonic) {
    return;
    // mnemonic = generateMnemonic();
  }

  const seed = await bchjs.Mnemonic.toSeed(mnemonic);
  const hdWallet = bchjs.HDNode.fromSeed(seed, network);

  const rootNode = bchjs.HDNode.derivePath(hdWallet, hdPath);
  const child = bchjs.HDNode.derivePath(
    rootNode,
    `${accountIndex}'/0/${childIndex}`
  );
  const keypair = bchjs.HDNode.toKeyPair(child);
  const address = bchjs.ECPair.toCashAddress(keypair);

  return address;
  // return {
  //   mnemonic,
  //   keypair,
  //   accountIndex,
  //   address,
  // };
};

const toSLPAddr = (address) => {
  if (!address) return;
  return bchjs.SLP.Address.toSLPAddress(address);
};

const toCashAddr = (address) => {
  if (!address) return;
  return bchjs.SLP.Address.toCashAddress(address);
};

export { generateMnemonic, deriveAccount, toSLPAddr, toCashAddr };
