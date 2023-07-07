const CatRescue = artifacts.require("CatRescue");
const utils = require("./utils");
const truffleAssert = require("truffle-assertions");
const { time, BN, expectRevert  } = require('@openzeppelin/test-helpers');
const web3 = require('web3');

const SECONDS_IN_1_HOUR = 3600;
const HOURS_IN_A_DAY = 24;

const DAY = SECONDS_IN_1_HOUR * HOURS_IN_A_DAY;

contract('CatRescue', (accounts) => {
  let contractInstance;
  const owner = accounts[0];
  const jake = accounts[1];
  const gabi = accounts[2];

  beforeEach(async () => {
    contractInstance = await CatRescue.new();
  });


  it('should add a new cat', async () => {
    await contractInstance.add(
      'Cat 1',
      'Male',
      3,
      'Description',
      'ipfshash',
      true,
      { from: owner }
    );

    const cat = await contractInstance.getCat(0);
    assert.equal(cat.name, 'Cat 1');
    assert.equal(cat.gender, 'Male');
    assert.equal(cat.available, true);
  });

  it('should allow adoption of a cat', async () => {
    await contractInstance.add(
      'Cat 2',
      'Female',
      2,
      'Description',
      'ipfshash',
      true,
      { from: owner }
    );

    await contractInstance.adopt(
      'jake',
      'Male',
      25,
      'Cat 2',
      0,
      { from: jake }
    );

    const cat = await contractInstance.getCat(0);
    assert.equal(cat.available, false, "should be not available/false");
  });

  it('should allow returning a cat to the shelter', async () => {
    await contractInstance.add(
      'Cat 3',
      'Male',
      4,
      'Description',
      'ipfshash',
      true,
      { from: owner }
    );

    await contractInstance.adopt(
        'Jake',
        'Male',
        25,
        'Cat 3',
        0,
        { from: jake }
      );

    await contractInstance.returnCatToShelter(0, { from: jake });

    const cat = await contractInstance.getCat(0);
    assert.equal(cat.available, true, "should be available/true");
  });

  it('should revert returning a cat after 24 hours', async () => {
    await contractInstance.add(
        'Cat 4',
        'Male',
        4,
        'Description',
        'ipfshash',
        true,
        { from: owner }
    );

    await contractInstance.adopt(
      'Gabriela',
      'Female',
      30,
      'Cat 4',
      0,
      { from: gabi }
    );

    await time.increase(25 * 60 * 60);
    await truffleAssert.reverts(contractInstance.returnCatToShelter(0, { from: gabi }));

    // await utils.timeTravel(web3, DAY);
    // try {
    //     await contractInstance.returnCatToShelter(0, { from: gabi });
    //     assert.fail();
    // } catch (err) {
    //     assert.ok(/revert/.test(err.message));
    // }
  });

  it("should donate 100", async function() {
    await contractInstance.donate(100);
    let val = await contractInstance.getDonationBalance();
    assert.equal(val, 100, '100 should be donated');
  });

  it('should allow the owner to withdraw donations', async () => {
    const donationAmount = web3.utils.toWei('1', 'ether');
  
    await contractInstance.donate(donationAmount, { from: jake });
  
    // const initialOwnerBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
  
    await contractInstance.withdrawDonations({ from: owner });
  
    // const finalOwnerBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
  
    // assert.isTrue(finalOwnerBalance.gt(initialOwnerBalance), 'Owner balance should increase after withdrawal');
  
    const donationBalance = await contractInstance.getDonationBalance();
    assert.equal(donationBalance.toString(), '0', 'Donation balance should be zero after withdrawal');
  });

  it('should not let non-owner withdraw donations', async () => {
    await truffleAssert.fails(contractInstance.withdrawDonations({ from: jake }));
  });

  it("should set owner", async function() {
    assert.equal(await contractInstance.owner.call(), owner, "wrong owner");
  });

  it("should not let non-contract owner add cat", async function() {
    await truffleAssert.fails(contractInstance.add("Jojo", "male", 2, "fuzzball", "ipfshash", true, { from: jake }));
  });

  it("should start cat array length at zero", async function() {
    let val = await contractInstance.getCatsCount();
    assert.equal(val, 0, "should be set to 0");
  });

  it("should only be able to adopt one cat per person", async function() {
    await contractInstance.add("Uno", "Male", 2, "description", "ipfshash", true, {from: owner});
    await contractInstance.add("Dos", "Female", 5, "description", "ipfshash", true, {from: owner});
    await truffleAssert.passes(contractInstance.adopt("Gabi", "Female", 25, "Uno", 0, {from: gabi}));
    await truffleAssert.fails(contractInstance.adopt("Gabi", "Female", 25, "Dos", 1, {from: gabi}));
  });

});

//     // test adding a cat to shelter **
//     // test only contract owner may add cats to shelter **
//     // test non-contract owner adds cat, fails **
//     // test donating to contract **
//     // test cats count array should start at 0 **
//     // test adopting cat !!!!!
//     // test isAllowed cat is available for adoption **!!
//     // test can only adopt one cat per person **
//     // test return cat 
//     // test return cat within time limit
//     // test returning cat that isn't the one that was adopted
//     // test getting cat by its index

// test should add a cat to the shelter **
// test should allow adoption of a cat **
// test should allow returning a cat to the shelter **
// test should donate 100 **
// test should set owner **
// test should start cat array length at zero **
// test should only be able to adopt one cat per person **

    // it("sets owner", async function() {
    //     const instance = await CatRescue.deployed();
    //     assert.equal(await instance.owner.call(), firstAccount, "wrong owner");
    // });

    // it("cat array length starts at zero", async function() {
    //     const instance = await CatRescue.deployed();
    //     let val = await instance.getCatsCount();
    //     assert.equal(val, 0, "should be set to 0")
    // });

    // it("should donate 100", async function() {
    //     let instance = await CatRescue.deployed();
    //     await instance.donate(100);
    //     let val = await instance.getDonationBalance();
    //     assert.equal(val, 100, '100 should be donated')
    // });

//     it("adds cat to the shelter", async function() {
//         const instance = await CatRescue.deployed();
//         await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
//         let catCount = await instance.getCatsCount();
//         assert.equal(catCount, 1, 'cats count should increase above 0');
//     });

    // it("only contract owner can add cats", async function() {
    //     const instance = await CatRescue.deployed();
    //     await truffleAssert.passes(instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true", {from: firstAccount}));
    // });

    // it("non-contract owner cannot add cat", async function() {
    //     const instance = await CatRescue.deployed();
    //     await truffleAssert.fails(instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true", {from: secondAccount}));
    // });

//     it("can adopt", async function() {
//         const instance = await CatRescue.deployed();
//         await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
//         await truffleAssert.passes(instance.adopt("Jake", "male", 25, "Jojo", 0));  
//     });

    // it("can only adopt one cat per person", async function() {
    //     const instance = await CatRescue.deployed();
    //     await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
    //     await instance.add("Freeway", "male", 5, "fluffyBoi", "ipfshash", "true");
    //     await truffleAssert.passes(instance.adopt("Jake", "male", 25, "Jojo", 1, {from: secondAccount}));
    //     await truffleAssert.fails(instance.adopt("Jake", "male", 25, "Freeway", 1, {from: secondAccount}));
    // });

//     it("is not a valid cat to adopt", async function() {
//         const instance = await CatRescue.deployed();
//         await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "false");
//         await truffleAssert.fails(instance.adopt("Jake", "male", 25, "Jojo", 0, {from: secondAccount}));
//     });

//     // it("can return cat", async function() {
//     //     const instance = await CatRescue.deployed();
//     //     await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
//     //     await instance.adopt("Jake", "male", 25, "Jojo", 0, {from: secondAccount});
//     //     await truffleAssert.passes(instance.returnCatToShelter(0, {from: secondAccount}));        
//     // });

// });


// it('should withdraw all donations to the owner', async () => {
//     const donationAmount = web3.utils.toWei('1000', 'ether');
//     const initialOwnerBalance = web3.utils.toBN(await web3.eth.getBalance(owner));
//     const initialContractBalance = web3.utils.toBN(await web3.eth.getBalance(contractInstance.address));
//     await contractInstance.donate({ from: gabi, value: donationAmount });

//     // Withdraw donations
//     const tx = await contractInstance.withdrawDonations({ from: owner, value: 0 });

//     // Get gas cost of the transaction
//     const gasPrice = new BN(await web3.eth.getGasPrice());
//     const gasUsed = new BN(tx.receipt.gasUsed);
//     const transactionCost = gasPrice.mul(gasUsed);

//     // Get final balances
//     const finalOwnerBalance = new BN(await web3.eth.getBalance(owner));
//     const finalContractBalance = new BN(await web3.eth.getBalance(contractInstance.address));

//     // Verify the withdrawals
//     const expectedOwnerBalance = initialOwnerBalance.add(new BN(web3.utils.fromWei(donationAmount))).sub(transactionCost);
//     const expectedContractBalance = initialContractBalance.sub(new BN(web3.utils.fromWei(donationAmount)));

//     assert.equal(finalOwnerBalance.toString(), expectedOwnerBalance.toString(), 'Owner balance is incorrect');
//     assert.equal(finalContractBalance.toString(), expectedContractBalance.toString(), 'Contract balance is incorrect');
//   });