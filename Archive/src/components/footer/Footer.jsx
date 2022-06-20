import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './footer.css'

export const Footer = () => {
  return (
    <React.Fragment>
        <Container className='ppnc__footer' fluid>
            <Row>
                <p > &copy; 2022  |  PassivePandaNodeClub</p>
            </Row>
        </Container>
    </React.Fragment>
  )
}
