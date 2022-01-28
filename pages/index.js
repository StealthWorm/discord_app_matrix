import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
   const Tag = props.tag || 'h1';
   return (
      <>
         <Tag>{props.children}</Tag>
         <style jsx>{`
             ${Tag} {
               color: ${appConfig.theme.colors.neutrals['000']};
               font-size: 24px;
               font-weight: 600;
             }
             `}</style>
      </>
   );
}

export default function PaginaInicial() {
   // const username = 'omariosouto';
   const [username, setUsername] = React.useState('omariosouto');
   const roteamento = useRouter();

   return (
      <>
         <Box
            styleSheet={{
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               // backgroundColor: appConfig.theme.colors.primary[500],
               backgroundImage: 'url(https://thumbs.gfycat.com/BraveOptimalBaleenwhale-size_restricted.gif)',
               backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
         >
            <Box
               styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: {
                     xs: 'column',
                     sm: 'row',
                  },
                  width: '100%', maxWidth: '700px',
                  borderRadius: '5px', padding: '32px', margin: '16px',
                  boxShadow: '0 2px 10px 10px rgb(0 0 0 / 20%)',
                  // background: 'radial-gradient(106.06% 101.68% at 4.19% 8.33%, rgba(255, 255, 255, 0.2)  0.09%, transparent 100%);'
                  background: 'radial-gradient(106.06% 101.68% at 4.19% 8.33%, rgba(21, 8, 64, 0.4) 0.09%, transparent 28.02%, rgba(138, 31, 138, 0.5) 70%, rgba(254, 94, 83, 0.3) 100%);',
                  backdropFilter: 'blur(9.8px)',
               }}
            >
               {/* Formulário */}
               <Box
                  as="form"
                  onSubmit={function (infosDoEvento) {
                     infosDoEvento.preventDefault();
                     roteamento.push(`/chat?username=${username}`);
                     // window.location.href = '/chat';
                  }}
                  styleSheet={{
                     display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                     width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                  }}
               >
                  <Titulo tag="h2">Boas vindas de volta!</Titulo>
                  <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.primary[900] }}>
                     {appConfig.name}
                  </Text>

                  <TextField
                     value={username}
                     onChange={function (event) {
                        const valor = event.target.value;
                        setUsername(valor);
                     }}
                     fullWidth
                     textFieldColors={{
                        neutral: {
                           textColor: appConfig.theme.colors.neutrals[200],
                           mainColor: appConfig.theme.colors.neutrals[900],
                           mainColorHighlight: appConfig.theme.colors.primary[300],
                           backgroundColor: appConfig.theme.colors.neutrals[800],
                        },
                     }}
                  />
                  <Button
                     type='submit'
                     label='Entrar'
                     fullWidth
                     disabled={username.length < 2}
                     buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: username.length >= 2 ? appConfig.theme.colors.primary[700] : appConfig.theme.colors.neutrals[500],
                        mainColorLight: username.length >= 2 && appConfig.theme.colors.primary[400],
                        mainColorStrong: username.length >= 2 && appConfig.theme.colors.primary[800],
                     }}
                  />
               </Box>
               {/* Formulário */}


               {/* Photo Area */}
               <Box
                  styleSheet={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     maxWidth: '200px',
                     padding: '16px',
                     backgroundColor: appConfig.theme.colors.neutrals[800],
                     border: '1px solid',
                     borderColor: appConfig.theme.colors.primary[100],
                     borderRadius: '10px',
                     flex: 1,
                     minHeight: '240px',
                  }}
               >
                  <Image
                     styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                        border: `3px solid ${appConfig.theme.colors.primary[100]}`
                     }}
                     src={`https://github.com/${username}.png`}
                  />
                  <Text
                     variant="body4"
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        padding: '3px 10px',
                        borderRadius: '1000px'
                     }}
                  >
                     {username}
                  </Text>
               </Box>
               {/* Photo Area */}
            </Box>
         </Box>
      </>
   );
}