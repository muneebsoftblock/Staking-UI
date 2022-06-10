import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Footer } from '../components/footer/Footer';
import { MainBoard } from '../components/mainboard/MainBoard';
import { TopNavbar } from '../components/navbar/TopNavbar';
import { getReward, getTotalNftsStaked, getWalletOfOwner, getWalletOfOwnerStaked } from '../eth-setup/apis';
import { nftAddress, stakingAddress } from '../eth-setup/smart-contracts-config';

const Home = () => {
  const [walletOfOwnerStaked, setWalletOfOwnerStaked] = useState();
  const [totalNftsStaked, setTotalNftsStaked] = useState();
  const [walletOfOwner, setWalletOfOwner] = useState();
  const [reward, setReward] = useState();

  const wasGoodMethod = () => {
    getWalletOfOwnerStaked(setWalletOfOwnerStaked, wasGoodMethodToo);
    getTotalNftsStaked(setTotalNftsStaked, wasGoodMethodToo);
    getWalletOfOwner(setWalletOfOwner, wasGoodMethodToo);
    getReward(setReward, wasGoodMethodToo);
  };

  const wasGoodMethodToo = () => {
    getWalletOfOwnerStaked(setWalletOfOwnerStaked);
    getTotalNftsStaked(setTotalNftsStaked);
    getWalletOfOwner(setWalletOfOwner);
    getReward(setReward);
  };

  useEffect(() => {
    // const acc = '0x2B7574F25c68bc274CC4857658b63F12fcBdf29A';
    // const urlGetTx = `https://api.snowtrace.io/api?module=account&action=tokennfttx&contractaddress=${nftAddress}&address=${acc}&startblock=0&endblock=999999999&sort=asc`;
    // let tokenIds = []

    // axios.get(urlGetTx).then((res) => {
    //   res.data.result.map((res) => {
    //     if (res.to.toLowerCase() === stakingAddress.toLowerCase())
    //       tokenIds.push(res.tokenID);
    //   });

    //   console.log(tokenIds)
    // });

  }, []);

  return (
    <React.Fragment>
      <TopNavbar reward={reward} tokenIds={walletOfOwnerStaked} totalNftsStaked={totalNftsStaked} />
      <MainBoard walletOfOwner={walletOfOwner} walletOfOwnerStaked={walletOfOwnerStaked} wasGoodMethod={wasGoodMethod} />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
