function GlobalStyle() {
   return (
      <style global jsx>{`
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       list-style: none;
     }
     body {
       font-family: 'Open Sans', sans-serif;
     }
     /* App fit Height */ 
     html, body, #__next {
       min-height: 100vh;
       display: flex;
       flex: 1;
     }
     #__next {
       flex: 1;
     }
     #__next > * {
       flex: 1;
     }
     body img {
        backgroundSize: contain;
        height: 100vh;
        transform: scale(0.8);
     }
     /* ./App fit Height */ 
   `}</style>
   );
}

export default function CustomApp({ Component, pageProps }) {
   console.log('Roda em todas as páginas!');
   return (
      <>
         <GlobalStyle />
         <Component {...pageProps} />
      </>
   );
}