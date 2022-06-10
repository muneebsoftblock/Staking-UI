import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MainCard } from '../cards/MainCard';
import { Footer } from '../footer/Footer';
import './mainboardarea.css';

const objectsTrue = (arr) => {
  return arr.map((tokenId) => ({ tokenId, staked: true }));
};

const objectsFalse = (arr) => {
  return arr.map((tokenId) => ({ tokenId, staked: false }));
};

export const MainBoard = ({ walletOfOwner, walletOfOwnerStaked, wasGoodMethod }) => {
  return (
    <React.Fragment>
      <Container fluid className='main__board__area'>
        <Container className='connect__btn__control'>
          <Row>
            {!(walletOfOwnerStaked && walletOfOwner) ? (
              <span class='card__red__btn' onClick={wasGoodMethod}>
                Connect
              </span>
            ) : (
              [...objectsFalse(walletOfOwner), ...objectsTrue(walletOfOwnerStaked)]
                .sort((a, b) => a.tokenId - b.tokenId)
                .map(({ tokenId, staked }) => (
                  <Col key={tokenId} lg={3}>
                    <MainCard tokenId={tokenId} staked={staked} />
                  </Col>
                ))
            )}
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};
