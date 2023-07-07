/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
  },
  plugins: ["solidity-coverage"],
  compilers: {
    solc: {
      version: "0.8.7+commit.e28d00a7.Emscripten.clang",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}

// const coverage = process.env.COVERAGE === 'true';

// if (coverage) {
//   require('babel-register');
//   require('babel-polyfill');
// }
// if (coverage) {
//   module.exports = {
//     networks: {
//       development: {
//         host: '127.0.0.1',
//         port: 8545,
//         network_id: '*',
//       },
//     },
//     compilers: {
//       solc: {
//         version: '0.8.3',
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 200,
//           },
//         },
//       },
//     },
//     mocha: {
//       reporter: 'eth-gas-reporter',
//       reporterOptions: {
//         currency: 'USD',
//         gasPrice: 21,
//       },
//     },
//   };
// }
