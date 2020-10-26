module.exports = {
  apps : [{
    name: 'viber-bot-node-starter',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      LANGUAGE: 'en',
      PORT: 3000,
      VIBER_TOKEN: 'token',
      WEBHOOK: 'webhook',
      MONGODB_URI: 'mongo_uri',
      CHAT_BOT_NAME: 'viber production bot',
      CHAT_BOT_AVATAR: 'viber production avatar'
    }
  }]
};
