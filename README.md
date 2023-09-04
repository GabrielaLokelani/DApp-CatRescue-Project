# DApp-CatRescue-Project
## Welcome to the Cat Rescue!

### About
Welcome to my personal practical project where I have built a fully functional DApp consisting of a Solidity smart contract connected to the Ethereum blockchain, paired with MetaMask web3 implementation, and of course client-side application UI. 
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
     - Run `npm install`
   - Check to make sure dependencies got installed (all will be listed but IPFS and MetaMask, that will be done next)
2. Download IPFS using the link provided above
   - Install IPFS either into your file path or elsewhere on your machine and follow the download instructions
   - Open IPFS in a separate command line under the path it was downloaded to 
     - Run `ipfs`
   - Locate and show the ipfs config file to see if `"Access-Control-Allow-Origin":["*"]`
     - Run `ipfs config show`
   - If it does not, set the API HTTP CORS header to `"Access-Control-Allow-Origin":["*"]` so there will be CORS errors in the browser
     - Run `ipfs config edit`
     - Check the config file again to make sure the edit was made
3. Start the IPFS Daemon and it will say `Daemon is ready`
   - Run `ipfs deamon`
4. Start the Ganache Client in a seperate terminal in the project file path
   - Run `ganache-cli` or `ganache`
   - Take note of the RPC server started listing the 10 Accounts with their resepctive private key
5. Download MetaMask Chrome browser extension and login
   - Once logged-in, switch to the Local Network of 8545 which connects it to Ganache
   - Import two of the private keys from the started Ganache RPC server
     - One of the keys is to be the contract creator account (the cat rescue owner)
     - The other key is a user (a patron of the cat rescue)
6. Deploy the Solidity smart contract
   - Run `npx truffle migrate`
   - Make sure in the public/index.js file line 8 the catRescueContractAddress is equal to the deployed contract address
7. Start and run the application in a separate terminal in the project file path
   - Run `npm start`

**RUNNING TEST COVERAGE**

8. To run solidity coverage to see our test coverage (should cover 100% of lines)
   - Run `npx truffle run coverage`


### Usage Instructions

- In the browser go to: [CATRESCUE](http://localhost:3000/#) or enter `http://localhost:3000/#` 
  - This is the endpoint where the Cat Rescue runs after starting the application as described above
  - Here you will see the homepage and the other tabs for navigating the site
- **"Home"** tab will take the user to the homepage of the site and can see information about the Cat Rescue
  - Here it is recommended to click on the chrome browser `Extentions` button in the upper right hand corner which looks like a puzzle piece
  - Select the MetaMask extension, login, and connect to the wallet you wish to use
- **"Shelter Cat"** tab will take the user to a page where the _contract owner_ can rescue (upload) a new cat to the Cat Rescue
  - Fill out the form:
    - Cat Name: enter the name of the new cat going into the Cat Rescue
    - Cat Gender: input the age of this new cat (either male or female)
    - Cat Age: enter the new cat's age
    - Cat Description: fill out a short but enticing description of the newest addition to the Cat Rescue
    - Cat Availability: this is a booleen value (true or false) and upon adding a new kitty to the rescue this should be `true`
    - Choose File: press this button to be given access to your computer's files and select the image to be used for the new cat in the rescue
  - Click "Submit" to add the new ball of fluff to the Cat Rescue
  - The MetaMask Page will automatically pop-up to complete the blockchain transaction using the _contract owner_ address
  - A notification banner will drop down showing the _contract owner's_ Transaction Hash and a message
- **"View All Cats"** tab will take the user to a page where the user may view all of the Cat Rescue's wonderful kitties
  - If there are currently no cats in the shelter, the user will see a message expressing this
- **"View Specific Cats"** tab will take the user to a page where the user can enter the index of a certain special cat they wish to see
  - Enter:
    - Cat's Index: the index of the cat the user wishes to view, to find the index for a kitty go to the "View All Cats" tab 
  - Click the "Submit" button to either return the desired cat or display an error message
- **"Adopt Cat"** tab will take the user to a page where the user can adopt a cat from the Cat Rescue
  - Users may only adopt one cat per person/address
  - May only adopt a cat that has the "Cat Availability" marked as `true`
  - Fill out the form:
    - Your Name: enter the user's name
    - Your Gender: input the user's gender (either male or female) 
    - Your Age: enter the user's age 
    - Cat's Name To Adopt: enter the name of the cat the user wants to adopt
    - Cat's Index: enter the index of the cat the user wants to adopt
  - Click the "Submit" button to go ahead with the adoption 
  - The MetaMask Page will automatically pop-up to complete the blockchain transaction using the user's address
  - A notification banner will drop down showing the user's Transaction Hash and a message
- **"Donate To The Cat Rescue"** tab will take the user to the Cat Rescue's donation page where users may contribute their very own donation to help the kitties
  - All donations to the Cat Rescue are final, sorry no refunds
  - Users fill out the short form:
    - Donation Amount: enter the desired value the user wishes to donate to the rescue
  - Click the "Submit" button to make the donation
  - The MetaMask Page will automatically pop-up to complete the blockchain transaction using the user's address
  - A notification banner will drop down showing the user's Transaction Hash and a message
- **"Return Cat"** tab will take the user to the page where the user may return their adopted cat back to the shelter
  - All returns must be conducted within 24 hours of adoption or else the return will not be accepted
  - Fill out the single form input:
    - Cat's Index: the index of the cat the user adopted and now wishes to return 
  - Click the "Submit" button to make the return final
  - The MetaMask Page will automatically pop-up to complete the blockchain transaction using the user's address
  - A notification banner will drop down showing the user's Transaction Hash and a message
