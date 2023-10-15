# Subsquid Validator Monitoring Script

This Node.js script monitors the status of a Subsquid validator and sends Telegram notifications if the validator goes offline. It retrieves data from the Subsquid API and checks the online status of a specific validator.

## Prerequisites

Before using this script, make sure you have the following prerequisites:

- Node.js: Install Node.js on your system if it's not already installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

**1. Clone the repository to your local machine:**

```bash
git clone https://github.com/your-username/subsquid-validator-monitor.git
cd subsquid-validator-monitor
```

**2. Install Dependencies**

Before running the monitoring script, you need to install the required Node.js packages. Ensure that you have Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

```bash
npm install
```

**3. Configure Environment Variables**

Create a `.env` file in the project's root directory and add the following environment variables:

```env
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-cha-id
VALIDATOR_P2P_ADDRESS=your-validator-p2p-address
```

Replace the placeholders with your actual values. Here's how to obtain these values:

- TELEGRAM_BOT_TOKEN: You can get a Telegram Bot API token by creating a new bot through the BotFather on Telegram.

- TELEGRAM_CHAT_ID: Determine the chat ID where you want to receive the notifications. You can either create a dedicated chat group or use your personal chat ID.

- VALIDATOR_P2P_ADDRESS: Set the P2P address of the validator you want to monitor.

**4. Run the Monitoring Script**

Execute the monitoring script using Node.js:

```bash
node monitor.js
```

The script will periodically check the status of the specified validator and send Telegram notifications if it goes offline.

**5. Customizing the Script**

The script is provided as a basic example and can be extended to meet your specific monitoring requirements. You can adjust the setInterval in the script to control the frequency of status checks (the default is every minute).