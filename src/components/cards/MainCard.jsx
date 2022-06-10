import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { deposit, withdraw } from '../../eth-setup/apis';
import CardImg from './../../assets/images/img01.png'
import './card.css';

export const MainCard = ({ tokenId, staked }) => {
  return (
    <React.Fragment>
      <Container>
        <Row className='card__row'>
          <Card className='main__card'>
            <img src={`${window.location.origin}/ppnc/${tokenId}.png`} alt='img' />
            <div className='card__div1'>
              <span className='card__span1'> NFT ID</span> <span className='card__span2'> #{tokenId}</span>
            </div>
            <div className='card__div__btn'>
              <span className='card__red__btn' style={staked ? { display: 'none' } : {}} onClick={() => deposit(() => {}, [tokenId])}>
                STAKE
              </span>
              <span className='card__black__btn' style={!staked ? { display: 'none' } : {}} onClick={() => withdraw(() => {}, [tokenId])}>
                UNSTAKE
              </span>
            </div>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
};
