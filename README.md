# Install dependencies
`npm i`

# Development
- Development variables are located in
`src/common/common.constants.ts`
variables
```
// In the case where you use mongo as a database
export const MONGODB_URI_LOCAL = 'mongodb://viber-bot-node-starter:viber-bot-node-starter@0.0.0.0:27017/viber-bot-node-starter';
export const VIBER_PORT_LOCAL = 3000; // dev port
export const VIBER_TOKEN_LOCAL = 'viber-bot-node-starter'; // development account for the bot
export const CHAT_BOT_NAME = 'Viber Bot Node Starter';
export const CHAT_BOT_AVATAR = 'viber-bot-node-starter'; 
export const NGROK_URL = 'viber-bot-node-starter'; // in the case where you use ngrok for development
```
You can set language in case of internationalization i `src/common/language.ts`

- Build 
`npm run build`

- Run
`npm run start`

# Production

- Production variables are located in root folder
`ecosystem.config.js`
variables
```
  LANGUAGE: 'en', // languadge of the bot in case internationalization
  PORT: 3000, // production port
  VIBER_TOKEN: 'token', // production token
  WEBHOOK: 'webhook', // production domain with https
  MONGODB_URI: 'mongo_uri' // database url,
  CHAT_BOT_NAME: 'viber production bot',
  CHAT_BOT_AVATAR: 'viber production avatar'
```

- Build 
`npm run build`

- Run (we are running the viber bot with http://pm2.io/)
`pm2 start ecosystem.config.js`

- Rebuild
`npm run build`
`pm2 restart viber-bot-node-starter` // or the name you have selected

# Internationalization
You can selected the environment variable LANGUAGE 
and set the desired language in `src/common/i18n` folder
and the add it to the language in `src/common/message-text.ts`
The would create language specific bot instance.
 
In the case where you want translation to be provided
by the language of the user, consider wrapping the message 
variables in a function and provide it with the language of the user.
Example
```
getMessage(MessageKey, UserLanguage, UserCountry)
``` 

In case of any question, suggestion and requests 
please write to `preslavsemov@gmail.com`
