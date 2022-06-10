import axios from 'axios';
import Web3 from 'web3';
import { getBlockchainData } from './metamask-connection.js';
import { erc20Address, gasFactor, getContractNft, getContractStaking, nftAddress, os, stakingAddress } from './smart-contracts-config.js';

export const purchaseTokensPlusPurchaseTokensFree = async (setLoading, howMany) => {
  if (!howMany || isNaN(howMany) || howMany == 0) {
    alert('Enter some quantity to Mint');
    setLoading(false);
    return;
  }

  getBlockchainData(async (account, web3) => {
    const totalMinted = Number(await getContractNft(web3).methods.totalMinted().call());
    const freeMint = Number(await getContractNft(web3).methods.freeMint().call());

    totalMinted < freeMint ? purchaseTokensFree(setLoading, howMany) : purchaseTokens(setLoading, howMany);
  });
};

export const purchaseTokens = async (setLoading, howMany) => {
  setLoading(true);
  if (!howMany || isNaN(howMany) || howMany === 0) {
    alert('Enter some quantity to Mint');
    return;
  }
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);

    const pricePublicMint = await contract.methods.itemPrice().call();

    const totalPrice = (Number(pricePublicMint) * howMany).toString();

    // here we use code from twitter post of nft
    const method = contract.methods.purchaseTokens(howMany);
    let options = {
      from: account,
      gas: '0',
      value: totalPrice,
    };
    try {
      const estimateGasPrice1 = await method.estimateGas(options);
      const estimateGasPrice2 = Math.trunc(gasFactor * estimateGasPrice1);
      options = { ...options, gas: '' + estimateGasPrice2 };
    } catch (e) {
      let msg;
      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf('{'), a.lastIndexOf('}') + 1);
        // console.log({ objStr });
        msg = JSON.parse(objStr).message || JSON.parse(objStr).originalError.message;
        msg = msg.replace('err: ', '');
        msg = msg.replace('execution reverted: ', '');
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = 'Insufficient funds';
      }
      if (msg === 'The user must wait before nft can be withdrawn') msg = 'User must wait at least 24 hours before unstaking NFT';
      else if (msg === 'send correct eth') msg = 'Send correct ETH';
      // else if (msg === 'Sale is not active') msg = 'Sale will start at 10pm UTC';

      alert(msg);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await method.send(options).on('confirmation', (i, tx) => {
        if (i === 0) {
          setLoading(false);
          let tokenId;
          try {
            tokenId = tx.events.Transfer.returnValues.tokenId;
          } catch (e) {
            tokenId = tx.events.Transfer[0].returnValues.tokenId;
          }
          if (window.confirm('Checkout your NFT on OpenSea. Refresh the page if needed.')) window.location.href = `${os}/${nftAddress}/${tokenId}`;
        }
      });
    } catch (e) {
      setLoading(false);
      if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') alert('User denied transaction');
      else alert(e.message);
    }
  });
};

export const purchaseTokensFree = async (setLoading, howMany) => {
  setLoading(true);
  if (!howMany || isNaN(howMany) || howMany === 0) {
    alert('Enter some quantity to Mint');
    return;
  }
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);

    const method = contract.methods.purchaseTokensFree(howMany);
    let options = {
      from: account,
      gas: '0',
    };
    try {
      const estimateGasPrice1 = await method.estimateGas(options);
      const estimateGasPrice2 = Math.trunc(gasFactor * estimateGasPrice1);
      options = { ...options, gas: '' + estimateGasPrice2 };
    } catch (e) {
      let msg;
      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf('{'), a.lastIndexOf('}') + 1);
        // console.log({ objStr });
        msg = JSON.parse(objStr).message || JSON.parse(objStr).originalError.message;
        msg = msg.replace('err: ', '');
        msg = msg.replace('execution reverted: ', '');
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = 'Insufficient funds';
      }
      if (msg === 'Mint min 1, max 10') msg = 'Mint amount exceeded';
      else if (msg === 'send correct eth') msg = 'Send correct ETH';
      // else if (msg === 'Sale is not active') msg = 'Sale will start at 10pm UTC';

      alert(msg);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await method.send(options).on('confirmation', (i, tx) => {
        if (i === 0) {
          setLoading(false);
          let tokenId;
          try {
            tokenId = tx.events.Transfer.returnValues.tokenId;
          } catch (e) {
            tokenId = tx.events.Transfer[0].returnValues.tokenId;
          }
          if (window.confirm('Checkout your NFT on OpenSea. Refresh the page if needed.')) window.location.href = `${os}/${nftAddress}/${tokenId}`;
        }
      });
    } catch (e) {
      setLoading(false);
      if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') alert('User denied transaction');
      else alert(e.message);
    }
  });
};

export const deposit = async (setLoading, tokenIds) => {
  setLoading(true);
  if (!tokenIds || tokenIds.length === 0 || tokenIds === 0) {
    alert('Enter some input');
    return;
  }

  getBlockchainData(async (account, web3) => {
    const contract = getContractStaking(web3);

    const method = contract.methods.deposit(0, tokenIds[0]);
    let options = {
      from: account,
      gas: '0',
    };
    try {
      const estimateGasPrice1 = await method.estimateGas(options);
      const estimateGasPrice2 = Math.trunc(gasFactor * estimateGasPrice1);
      options = { ...options, gas: '' + estimateGasPrice2 };
    } catch (e) {
      let msg;
      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf('{'), a.lastIndexOf('}') + 1);
        // console.log({ objStr });
        msg = JSON.parse(objStr).message || JSON.parse(objStr).originalError.message;
        msg = msg.replace('err: ', '');
        msg = msg.replace('execution reverted: ', '');
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = 'Insufficient funds';
      }
      if (msg === 'Mint min 1, max 10') msg = 'Mint amount exceeded';
      else if (msg === 'send correct eth') msg = 'Send correct ETH';
      // else if (msg === 'Sale is not active') msg = 'Sale will start at 10pm UTC';

      alert(msg);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await method.send(options).on('confirmation', (i, tx) => {
        if (i === 0) {
          setLoading(false);
          alert('Successfully staked NFT');
          window.location.reload();
          // let tokenId;
          // try {
          //   tokenId = tx.events.Transfer.returnValues.tokenId;
          // } catch (e) {
          //   tokenId = tx.events.Transfer[0].returnValues.tokenId;
          // }
          // if (window.confirm('Checkout your NFT on OpenSea. Refresh the page if needed.')) window.location.href = `${os}/${nftAddress}/${tokenId}`;
        }
      });
    } catch (e) {
      setLoading(false);
      if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') alert('User denied transaction');
      else alert(e.message);
    }
  });
};
export const withdraw = async (setLoading, tokenIds) => {
  setLoading(true);
  if (!tokenIds || tokenIds.length === 0 || tokenIds === 0) {
    alert('Enter some input');
    return;
  }

  getBlockchainData(async (account, web3) => {
    const contract = getContractStaking(web3);

    const method = contract.methods.withdraw(0, tokenIds[0]);
    let options = {
      from: account,
      gas: '0',
    };
    try {
      const estimateGasPrice1 = await method.estimateGas(options);
      const estimateGasPrice2 = Math.trunc(gasFactor * estimateGasPrice1);
      options = { ...options, gas: '' + estimateGasPrice2 };
    } catch (e) {
      let msg;
      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf('{'), a.lastIndexOf('}') + 1);
        // console.log({ objStr });
        msg = JSON.parse(objStr).message || JSON.parse(objStr).originalError.message;
        msg = msg.replace('err: ', '');
        msg = msg.replace('execution reverted: ', '');
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = 'Insufficient funds';
      }
      if (msg === 'The user must wait before nft can be withdrawn') msg = 'User must wait at least 24 hours before unstaking NFT'; 
      else if (msg === 'send correct eth') msg = 'Send correct ETH';
      // else if (msg === 'Sale is not active') msg = 'Sale will start at 10pm UTC';

      alert(msg);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await method.send(options).on('confirmation', (i, tx) => {
        if (i === 0) {
          setLoading(false);
          alert('Withdraw Success');
          window.location.reload();
          // let tokenId;
          // try {
          //   tokenId = tx.events.Transfer.returnValues.tokenId;
          // } catch (e) {
          //   tokenId = tx.events.Transfer[0].returnValues.tokenId;
          // }
          // if (window.confirm('Checkout your NFT on OpenSea. Refresh the page if needed.')) window.location.href = `${os}/${nftAddress}/${tokenId}`;
        }
      });
    } catch (e) {
      setLoading(false);
      if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') alert('User denied transaction');
      else alert(e.message);
    }
  });
};

export const claimRewards = async (setLoading, tokenIds) => {
  setLoading(true);
  if (!tokenIds || tokenIds.length === 0 || tokenIds === 0) {
    alert('Enter some input');
    return;
  }

  getBlockchainData(async (account, web3) => {
    const contract = getContractStaking(web3);

    const method = contract.methods.harvest(0);
    let options = {
      from: account,
      gas: '0',
    };
    try {
      const estimateGasPrice1 = await method.estimateGas(options);
      const estimateGasPrice2 = Math.trunc(gasFactor * estimateGasPrice1);
      options = { ...options, gas: '' + estimateGasPrice2 };
    } catch (e) {
      let msg;
      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf('{'), a.lastIndexOf('}') + 1);
        // console.log({ objStr });
        msg = JSON.parse(objStr).message || JSON.parse(objStr).originalError.message;
        msg = msg.replace('err: ', '');
        msg = msg.replace('execution reverted: ', '');
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = 'Insufficient funds';
      }
      if (msg === 'User must wait between claims') msg = 'User must wait at least 12 hours before withdraw.';
      else if (msg === 'send correct eth') msg = 'Send correct ETH';
      // else if (msg === 'Sale is not active') msg = 'Sale will start at 10pm UTC';

      alert(msg);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await method.send(options).on('confirmation', (i, tx) => {
        if (i === 0) {
          setLoading(false);
          alert('Claim Rewards Success');
          window.location.reload();
          // let tokenId;
          // try {
          //   tokenId = tx.events.Transfer.returnValues.tokenId;
          // } catch (e) {
          //   tokenId = tx.events.Transfer[0].returnValues.tokenId;
          // }
          // if (window.confirm('Checkout your NFT on OpenSea. Refresh the page if needed.')) window.location.href = `${os}/${nftAddress}/${tokenId}`;
        }
      });
    } catch (e) {
      setLoading(false);
      if (e.message === 'MetaMask Tx Signature: User denied transaction signature.') alert('User denied transaction');
      else alert(e.message);
    }
  });
};

///// read apis
export const totalSupply = async (setTotalSupply) => {
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);
    const totalSupply = await contract.methods.totalSupply().call();
    setTotalSupply(totalSupply);
  });
};

export const getWalletOfOwner = async (setWalletOfOwner, wasGoodMethodToo) => {
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);
    const walletOfOwner = await contract.methods.walletOfOwner(account).call();
    // const walletOfOwner = await contract.methods.walletOfOwner('0xA01575aa8B036A6A9F7cdB9a197a2AfaC7B31890').call();
    setWalletOfOwner(walletOfOwner);
    // setWalletOfOwner([2,3,5,8,9,6]);
  }, wasGoodMethodToo);
};

export const getWalletOfOwnerStaked = async (setWalletOfOwnerStaked, wasGoodMethodToo) => {
  getBlockchainData(async (account, web3) => {
    const acc = '0x2B7574F25c68bc274CC4857658b63F12fcBdf29A';
    // const acc = account;
    const urlGetTx = `https://api.snowtrace.io/api?module=account&action=tokennfttx&contractaddress=${nftAddress}&address=${acc}&startblock=0&endblock=999999999&sort=asc`;
    let tokenIds = [];

    axios.get(urlGetTx).then((res) => {
      res.data.result.map((res) => {
        if (res.to.toLowerCase() === stakingAddress.toLowerCase()) tokenIds.push(res.tokenID);
      });

      console.log(tokenIds);
      setWalletOfOwnerStaked(tokenIds);
    });
  }, wasGoodMethodToo);
};

export const getReward = async (setReward, wasGoodMethodToo) => {
  getBlockchainData(async (account, web3) => {
    const contract = getContractStaking(web3);
    // const depositsOf = await contract.methods.depositsOf(account, 0).call();

    // const sum = [1, 2, 3].reduce((partialSum, a) => partialSum + a, 0);
    // const sum = rewards.reduce((partialSum, a) => partialSum + Number(Web3.utils.fromWei(a + '')), 0);
    setInterval(async () => {
      const rewards = await contract.methods.pendingRewardToken(0, account).call();
      setReward(Web3.utils.fromWei(rewards + ''));
    }, 1000);
  }, wasGoodMethodToo);
};

export const getTotalNftsStaked = async (set, wasGoodMethodToo) => {
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);
    const balanceOf = await contract.methods.balanceOf(stakingAddress).call();
    set(balanceOf);
  }, wasGoodMethodToo);
};

export const getTxMaxMint = async (setTxMaxMint) => {
  getBlockchainData(async (account, web3) => {
    const contract = getContractNft(web3);
    const txMaxMint = await contract.methods.txMaxMint().call();
    console.log({ txMaxMint });
    setTxMaxMint(txMaxMint);
  });
};

export const addToken = async () => {
  getBlockchainData(async (account, web3, ethereum) => {
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: erc20Address, // The address that the token is at.
          symbol: 'PPNC', // A ticker symbol or shorthand, up to 5 chars.
          decimals: '18', // The number of decimals in the token
          image:
            'https://static.wixstatic.com/media/ffe5e9_489e33446dd34285b70709471c3128ce~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BAMBOO%20FINANCE%20(2)%20copy.png', // A string url of the token logo
        },
      },
    });
  });
};
