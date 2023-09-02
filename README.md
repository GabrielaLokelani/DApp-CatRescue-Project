# DApp-CatRescue-Project
## Welcome to the Cat Rescue!

### About
A fully functional DApp consisting of a Solidity smart contract connected to the Ethereum blockchain, paired with MetaMask web3 implementation, and of course client-side application UI. 
**GOALS**
+ To deploy a simple Smart Contract using Truffle or Remix IDE in Ganache CLI – command version of Ganache, a personal Ethereum blockchain perfect for our development purposes.
+ A simple JavaScript app, which will interact with the contract using Web3 API and MetaMask.
+ To utilize IPFS in storing binary data. For the example, sheltered cat images will not be stored in the contract, but in IPFS. The contract should only store a representation of the images using the IPFS hash.

**DEPENDENCIES**
+ NodeJS v13.5.0 [NodeJS Download](https://nodejs.org/en/download/releases/)
+ NPM v9.5.0
+ MetaMask v7.7.8
+ IPFS v0.4.23 [IPFS Download](https://dist.ipfs.io/go-ipfs/v0.4.23)
+ Ganache CLI v6.12.2 `npm install ganache-cli@6.12.2`
+ Ganache v7.8.0
+ Truffle v5.3.9 or Able to access [Remix IDE](https://remix.ethereum.org/)
+ Truffle Assertations v0.9.2
+ Web3 v1.5.3
+ Solc v0.8.4
+ Solidity Coverage v0.7.22
+ @OpenZeppelin / Test-Helpers v0.5.16
+ Serve v11.3.0

Let's rescue these cats folks!

### Getting Started

**STARTING THE APP**
1. Open the repo locally and open the commnand line at the project file path
   - Install all the dependencies that are listed above
     - `npm install`
   - Check to make sure dependencies got installed (all will be listed but IPFS and MetaMask, that will be done next)
2. Download IPFS using the link provided above
   - Install IPFS either into your file path or elsewhere on your machine and follow the download instructions
   - Open IPFS in a separate command line under the path it was downloaded to 
     - `ipfs`
   - Locate and show the ipfs config file to see if `"Access-Control-Allow-Origin":["*"]`
     - `ipfs config show`
   - If it does not, set the API HTTP CORS header to `"Access-Control-Allow-Origin":["*"]` so there will be CORS errors in the browser
     - `ipfs config edit`
     - Check the config file again to make sure the edit was made
3. Start the IPFS Daemon and it will say `Daemon is ready`
   - `ipfs deamon`
4. Start the Ganache Client in a seperate terminal in the project file path
   - `ganache`
   - Take note of the RPC server started listing the 10 Accounts with their resepctive private key
5. Download MetaMask Chrome browser extension and login
   - Once logged-in, switch to the Local Network of 8545 which connects it to Ganache
   - Import two of the private keys from the started Ganache RPC server
     - One of the keys is to be the contract creator account (the cat rescue owner)
     - The other key is a user (a patron of the cat rescue)
6. Deploy the Solidity smart contract
   - Run `npx truffle migrate` `npx truffle deploy`
   - Make sure in the public/index.js file line 8 the catRescueContractAddress is equal to the deployed contract address
7. Start and run the application
   - run `npm start`

**RUNNING TEST COVERAGE**
8. To run solidity coverage to see our test coverage (should cover 100% of lines)
   - run `npx truffle run coverage`


### Usage Instructions