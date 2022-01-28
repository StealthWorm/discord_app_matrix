import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import { FiSend } from "react-icons/fi";
import { createClient } from '@supabase/supabase-js'
import appConfig from '../config.json';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNDQyNCwiZXhwIjoxOTU4ODkwNDI0fQ.ZFBcsfX33ykUzScSQdzpAjjiamrlZ4cBQiEoavCLhNk'
const SUPABASE_URL = 'https://pwltogkpiszitaimxdci.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
   return supabaseClient.from('mensagens').on('INSERT', (respostaLive) => {
      // o dado em tempo real esta dentro do grupo "new" que vem do supabase
      adicionaMensagem(respostaLive.new);
   }).subscribe();
}

export default function ChatPage() {
   const roteamento = useRouter();
   const userLogged = roteamento.query.username;
   const [mensagem, setMensagem] = React.useState('');
   const [listaDeMensagens, setListaDeMensagens] = React.useState([])

   React.useEffect(() => {
      supabaseClient.from('mensagens').select('*').order('id', { ascending: false })
         .then(({ data }) => {
            setListaDeMensagens(data)
         });

      const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
         setListaDeMensagens((valorAtualDaLista) => {
            return [
               novaMensagem,
               ...valorAtualDaLista,
            ]
         });
      });

      return () => {
         subscription.unsubscribe();
      }
   }, []);

   function handleNovaMensagem(novaMensagem) {
      if (novaMensagem.trim() != "") {
         const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: userLogged,
            texto: novaMensagem,
         };

         supabaseClient.from('mensagens').insert([mensagem]).then(({ data }) => {
            //    // console.log('Dados da Inserção', data)
         });

         setMensagem('');
      }
   }

   return (
      <Box styleSheet={{
         display: 'flex', alignItems: 'center', justifyContent: 'center',
         // backgroundColor: appConfig.theme.colors.primary[700],
         backgroundImage: `url(https://steamuserimages-a.akamaihd.net/ugc/1559891726093942691/DCA091F0E5821D0833EF7D8F157381A74E05EE4D/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false)`,
         backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
         color: appConfig.theme.colors.neutrals['000']
      }}
      >
         <Box styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
            backdropFilter: 'blur(9.8px)'
         }}
         >
            <Header />

            <Box styleSheet={{
               position: 'relative',
               display: 'flex',
               flex: 1,
               height: '80%',
               backgroundColor: appConfig.theme.colors.neutrals[600],
               flexDirection: 'column',
               borderRadius: '5px',
               padding: '16px',
            }}
            >
               <MessageList mensagens={listaDeMensagens} />

               <Box as="form" styleSheet={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <TextField value={mensagem} placeholder="Insira sua mensagem aqui..." type="textarea"
                     onChange={(event) => {
                        const valor = event.target.value;
                        setMensagem(valor);
                     }}
                     onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                           event.preventDefault();
                           handleNovaMensagem(mensagem);
                        }
                     }}
                     styleSheet={{
                        width: '100%',
                        border: '0',
                        resize: 'none',
                        borderRadius: '5px',
                        padding: '6px 8px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        marginRight: '12px',
                        color: appConfig.theme.colors.neutrals[200],
                     }}
                  />

                  <ButtonSendSticker onStickerClick={(sticker) => { handleNovaMensagem(':sticker: ' + sticker) }} />

                  <FiSend onClick={() => handleNovaMensagem(mensagem)} style={{
                     position: 'absolute',
                     right: '6rem',
                     opacity: 0.5,
                     cursor: 'pointer'
                  }} />
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

function Header() {
   return (
      <>
         <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
            <Text variant='heading5'>Chat</Text>
            <Button variant='tertiary' colorVariant='neutral' label='Logout' href="/" styleSheet={{ color: appConfig.theme.colors.primary[400] }} />
         </Box>
      </>
   )
}

function MessageList(props) {
   const [user, setUser] = useState({ id: "", name: "" });;
   const [isOpen, setOpenState] = React.useState('');

   useEffect(() => {
      async function teste() {
         const response = await fetch(`https://api.github.com/users/${user.name}`);
         console.log(response);
      }

      teste()
   }, [user])

   return (
      <Box tag="ul" styleSheet={{
         overflow: 'scroll',
         display: 'flex',
         flexDirection: 'column-reverse',
         flex: 1,
         color: appConfig.theme.colors.neutrals["000"],
         marginBottom: '16px',
      }}
      >
         {props.mensagens.length <= 0
            ?
            <Box styleSheet={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <ReactLoading type={"spinningBubbles"} color={appConfig.theme.colors.primary["300"]} height={200} width={200} />
               <h1 style={{ fontSize: 24, color: appConfig.theme.colors.primary["300"], marginTop: '1rem' }}>LOADING...</h1>
            </Box>
            :
            <>
               {props.mensagens.map((mensagem) => {
                  return (
                     <Text key={mensagem.id} tag="li" styleSheet={{
                        borderRadius: '5px', padding: '6px', marginBottom: '12px', width: '100%', display: 'flex',
                        hover: {
                           backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                     }}
                     >
                        <Box styleSheet={{ marginBottom: '8px' }}>
                           <Image src={`https://github.com/${mensagem.de}.png`} styleSheet={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              display: 'inline-block',
                              marginRight: '8px',
                              border: `3px solid ${appConfig.theme.colors.primary[700]}`,
                              transition: '0.5s',
                              hover: {
                                 backgroundColor: appConfig.theme.colors.neutrals[700],
                                 transform: 'scale(1.1)'
                              }
                           }}
                              onClick={() => { setOpenState(!isOpen); setUser({ id: mensagem.id, name: mensagem.de }) }}
                           />
                           {isOpen && mensagem.id === user.id &&
                              <Box styleSheet={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 borderRadius: '5px',
                                 position: 'absolute',
                                 backgroundColor: appConfig.theme.colors.neutrals[800],
                                 width: {
                                    xs: '200px',
                                    sm: '290px',
                                 },
                                 height: '300px',
                                 left: '100px',
                                 top: '30px',
                                 padding: '16px',
                                 boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                              }}
                                 onClick={() => setOpenState(false)}
                              >
                                 {mensagem.de}
                              </Box>
                           }

                           <Text tag="strong">{mensagem.de}</Text>
                           <Text tag="span" styleSheet={{
                              fontSize: '10px',
                              marginLeft: '8px',
                              color: appConfig.theme.colors.neutrals[300],
                           }}
                           >
                              {(new Date().toLocaleDateString())}
                           </Text>
                        </Box>

                        {mensagem.texto.startsWith(':sticker:')
                           ? <Image src={mensagem.texto.replace(':sticker:', '')} styleSheet={{ height: '200px', width: '200px' }} />
                           : mensagem.texto
                        }
                     </Text>
                  );
               })}
            </>
         }
      </Box >
   )
}