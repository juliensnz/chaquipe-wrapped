import type {AppProps} from 'next/app';
import styled, {createGlobalStyle} from 'styled-components';
import {Analytics} from '@vercel/analytics/react';

const Container = styled.div`
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
`;

const Content = styled.div`
  overflow: hidden;
  color: white;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Lato', Helvetica Neue;
    background: white;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .firebase-emulator-warning {
    display: none;
  }
`;

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Container>
      <GlobalStyle />
      <Content>
        <Component {...pageProps} />
        <Analytics />
      </Content>
    </Container>
  );
}
