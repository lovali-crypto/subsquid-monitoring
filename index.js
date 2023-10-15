const axios = require('axios');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

// Load environment variables from .env
dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const VALIDATOR_P2P_ADDRESS = process.env.VALIDATOR_P2P_ADDRESS;
const SUBSQUID_NETWORK = process.env.SUBSQUID_NETWORK;
const HEALTHCHECK_URL = process.env.HEALTHCHECK_URL;
const API_URL = `https://app.subsquid.io/network/api/metrics/${SUBSQUID_NETWORK}/workers`;

let is_down = false;

// Initialize the Telegram bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

// Function to check the status of the validator
async function checkValidatorStatus() {
  try {
    const response = await axios.get(API_URL);
    const workers = response.data.payload;
    
    for (const worker of workers) {
      if (worker.p2pAddress === VALIDATOR_P2P_ADDRESS) {
        if (!worker.online) {
          // Validator is offline, send a Telegram notification
          console.log(`Validator ${VALIDATOR_P2P_ADDRESS} is offline!`);
          const message = `[Subsquid - Testnet] [🔴 Down] Validator ${VALIDATOR_P2P_ADDRESS} is offline!`;
          if(is_down === false){
            is_down = true;
            bot.sendMessage(TELEGRAM_CHAT_ID, message);
          }
        }
        else{
            const message = `[Subsquid - Testnet] [✅ Up] Validator ${VALIDATOR_P2P_ADDRESS} is online and it's uptime is ${worker.uptime}%!`;
            console.log(`Validator ${VALIDATOR_P2P_ADDRESS} is online and it's uptime is ${worker.uptime}%!`);
            if(is_down === true){
              is_down = false;
              bot.sendMessage(TELEGRAM_CHAT_ID, message);
            }
        }
        // Validator found, no need to continue checking
        if(HEALTHCHECK_URL){
          axios.get(HEALTHCHECK_URL);
        }
        return;
      }
    }

    // Validator not found in the list
    console.log(`Validator ${VALIDATOR_P2P_ADDRESS} not found.`);
    if(HEALTHCHECK_URL){
      axios.get(HEALTHCHECK_URL);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to check validator status periodically
setInterval(checkValidatorStatus, 60000); // Check every minute (adjust as needed)