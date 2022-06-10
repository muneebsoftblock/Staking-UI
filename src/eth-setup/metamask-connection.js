import Web3 from 'web3';
import { requiredChainId } from './smart-contracts-config.js';
import MetaMaskOnboarding from '@metamask/onboarding';

// import { updateVisitorsAddress } from "./updateVisitors";
// Wallet Connectivity Settings

const msg_mobile = 'Please use MetaMask App!';
const msg_desk = 'Please install MetaMask Wallet extension';
const deepLink = `https://metamask.app.link/dapp/${window.location.host}`;

// the responsibility of this method is to deal with blockchain
// irrespective of metamask installed or not
export const getBlockchainData = async (todo, todoAccChanged) => {
  const { ethereum } = window;

  if (!(ethereum && ethereum.isMetaMask)) {
    showMessage();
    return;
  }

  await ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: requiredChainId,
        },
      ],
    })
    .catch((error) => {
      alert('Refresh Metamask!');

      window.location.reload();
      console.log(error);
    });

  todoAccChanged && ethereum.on('chainChanged', todoAccChanged);
  todoAccChanged && ethereum.on('accountsChanged', todoAccChanged);

  const [account] = await ethereum.request({
    method: 'eth_requestAccounts',
  });
  const chainId = await ethereum.request({
    method: 'eth_chainId',
  });

  // console.log(chainId);
  // const acc = '0xdc40e07e6ab8ee6697394e4ca2161f5c54161b9a';
  // const acc = '0x397b94e30eca41ecad6fd06bafcf3fbc11866bdd';
  // const acc = '0x2B7574F25c68bc274CC4857658b63F12fcBdf29A';
  // const acc = '0xA01575aa8B036A6A9F7cdB9a197a2AfaC7B31890'; // Sameed
  // const acc = '0x4F2cd763BB9D81763C52DeD1ea4B717672846812'; // owner ppnc
  // const acc = '0x4333Df4C0Eb6B2e2995AB5D46411aCCb4e15e6fD'; // 50 NFTS
  const acc = account;
  chainId === requiredChainId && todo && todo(acc, new Web3(ethereum), ethereum);
};

export const truncNum = (n) => {
  const trNum = Number(Math.trunc(n * 10 ** 8) / 10 ** 8); // Round down to 2 fraction
  return trNum;
};

export const displayNum = (n) => {
  return (Math.trunc(n * 100) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const showMessage = () => {
  if (require('is-mobile')()) {
    if (window.confirm(msg_mobile)) window.location.href = deepLink;
  } else {
    if (window.confirm(msg_desk)) new MetaMaskOnboarding().startOnboarding();
  }
};

export const shortAddress = (_address) => {
  return _address.substr(0, 5) + '****' + _address.substr(_address.length - 4, _address.length);
};
