import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Wallet2 } from 'react-bootstrap-icons';
import { addToken, claimRewards } from '../../eth-setup/apis';
import { displayNum } from '../../eth-setup/metamask-connection';
import Logo from './../../assets/images/ppnclogo.jpeg';
import './topnavbar.css';

export const TopNavbar = ({ reward, tokenIds, totalNftsStaked }) => {
  return (
    <React.Fragment>
      <Navbar className='top__nav__bar'>
        <Container style={{ padding: '0px' }}>
          <Navbar.Brand href='#home' className='logo__text__area'>
            <img src={Logo} alt='ppnclogo' className='ppnc__logo' />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text className='nav__staked'>
              {tokenIds && (
                <>
                  <div style={{color:'#000'}}> Your Staked </div>
                  <span> {tokenIds.length} </span>
                </>
              )}
            </Navbar.Text>
            <Navbar.Text className='nav__inc__val'>
              <span
                onClick={() => {
                  if (tokenIds) claimRewards(() => {}, tokenIds);
                  else alert('loading token ids');
                }}
              >
                <Wallet2 style={{ marginRight: '5px', marginTop: '-5px' }} /> WITHDRAW{' '}
              </span>
              <div style={{color:'#000'}}>  +  {reward && displayNum(reward)}</div>
            </Navbar.Text>
            <Navbar.Text
              className='nav__inc__val'
              onClick={() => {
                addToken();
              }}
            >
              <span>
                <Wallet2 style={{ marginRight: '5px', marginTop: '-5px' }} /> Add PPNC to MM{' '}
              </span>
            </Navbar.Text>

            {totalNftsStaked && (
              <>
                <Navbar.Text className='nav__green__box__top'>
                  <div>STAKED IN VAULT</div>
                  <span> {totalNftsStaked} / 2000 </span>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
