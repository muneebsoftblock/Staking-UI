import React, { useEffect, useState } from 'react';
import { Footer } from '../components/footer/Footer';
import { MainBoard } from '../components/mainboard/MainBoard';
import { TopNavbar } from '../components/navbar/TopNavbar';
import { getReward, getTotalNftsStaked, getWalletOfOwner, getWalletOfOwnerStaked } from '../eth-setup/apis';

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
  // useEffect(() => {}, []);

  return (
    <React.Fragment>
      <TopNavbar reward={reward} tokenIds={walletOfOwnerStaked} totalNftsStaked={totalNftsStaked} />
      <MainBoard walletOfOwner={walletOfOwner} walletOfOwnerStaked={walletOfOwnerStaked} wasGoodMethod={wasGoodMethod} />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
