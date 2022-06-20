import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Wallet2 } from 'react-bootstrap-icons';
import { addToken, claimRewards } from '../../eth-setup/apis';
import { displayNum } from '../../eth-setup/metamask-connection';
import Logo from './../../assets/images/ppnclogo.jpeg';
import './topnavbar.css';

export const TopNavbar = ({ reward, tokenIds, totalNftsStaked }) => {
  return (
    <React.Fragment>
{/*       
      <Navbar collapseOnSelect expand="lg" className='top__nav__bar' >
  <Container >
  <Navbar.Brand href="#home" className='logo__text__area'>
  <img src={Logo} alt='ppnclogo' className='ppnc__logo' />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav >
      
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
            
    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar> */}




<Navbar collapseOnSelect expand="lg"  className='top__nav__bar'>
  <Container style={{padding:'0px'}}>
  <Navbar.Brand href="#home" className='logo__text__area' >
  <img src={Logo} alt='ppnclogo' className='ppnc__logo' />
  </Navbar.Brand>
  
    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight:'10px'}}/>
  <Navbar.Collapse id="responsive-navbar-nav" style={{borderTop:'1px solid #ddd'}}>
  
    <Nav >
      
    <Navbar.Text className='nav__staked' style={{borderTop:'1px solid #eee'}}>
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
                <Wallet2 className='wallet' /> WITHDRAW {' '}
              </span>
              <div>  +  {reward && displayNum(reward)}</div>
            </Navbar.Text>
            <Navbar.Text
              className='nav__inc__val'
              onClick={() => {
                addToken();
              }}
            >
              <span>
                <Wallet2 className='wallet'  /> Add PPNC to MM{' '}
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
            
    </Nav>
             
  </Navbar.Collapse>
  </Container>
</Navbar>



    </React.Fragment>
  );
};
