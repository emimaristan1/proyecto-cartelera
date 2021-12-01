import React from 'react'
import Footer from './footer'

export function FooterContainer() {

    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column></Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Sobre nosotros</Footer.Title>
                        <Footer.Link href="/desarrolladores">Desarrolladores</Footer.Link>
                        <Footer.Link href="/clientes">Clientes</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
                <br />
                <Footer.Centered>©2021 Todos los derechos reservados.</Footer.Centered>
            </Footer.Wrapper>
        </Footer>
    )
}