let CatRescue = artifacts.require("CatRescue");
const truffleAssert = require("truffle-assertions");

contract('CatRescue', function(accounts) {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];
    const thirdAccount = accounts[2];

    // test adding a cat to shelter **
    // test only contract owner may add cats to shelter **
    // test non-contract owner adds cat, fails **
    // test donating to contract **
    // test cats count array should start at 0 **
    // test adopting cat !!!!!
    // test isAllowed cat is available for adoption **!!
    // test can only adopt one cat per person **
    // test return cat 
    // test return cat within time limit
    // test returning cat that isn't the one that was adopted
    // test getting cat by its index

    it("sets owner", async function() {
        const instance = await CatRescue.deployed();
        assert.equal(await instance.owner.call(), firstAccount, "wrong owner");
    });

    it("cat array length starts at zero", async function() {
        const instance = await CatRescue.deployed();
        let val = await instance.getCatsCount();
        assert.equal(val, 0, "should be set to 0")
    });

    it("should donate 100", async function() {
        let instance = await CatRescue.deployed();
        await instance.donate(100);
        let val = await instance.getDonationBalance();
        assert.equal(val, 100, '100 should be donated')
    });

    it("adds cat to the shelter", async function() {
        const instance = await CatRescue.deployed();
        await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
        let catCount = await instance.getCatsCount();
        assert.equal(catCount, 1, 'cats count should increase above 0');
    });

    it("only contract owner can add cats", async function() {
        const instance = await CatRescue.deployed();
        await truffleAssert.passes(instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true", {from: firstAccount}));
    });

    it("non-contract owner cannot add cat", async function() {
        const instance = await CatRescue.deployed();
        await truffleAssert.fails(instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true", {from: secondAccount}));
    });

    it("can adopt", async function() {
        const instance = await CatRescue.deployed();
        await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
        await truffleAssert.passes(instance.adopt("Jake", "male", 25, "Jojo", 0));  
    });

    it("can only adopt one cat per person", async function() {
        const instance = await CatRescue.deployed();
        await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
        await instance.add("Freeway", "male", 5, "fluffyBoi", "ipfshash", "true");
        await truffleAssert.passes(instance.adopt("Jake", "male", 25, "Jojo", 1, {from: secondAccount}));
        await truffleAssert.fails(instance.adopt("Jake", "male", 25, "Freeway", 1, {from: secondAccount}));
    });

    it("is not a valid cat to adopt", async function() {
        const instance = await CatRescue.deployed();
        await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "false");
        await truffleAssert.fails(instance.adopt("Jake", "male", 25, "Jojo", 0, {from: secondAccount}));
    });

    // it("can return cat", async function() {
    //     const instance = await CatRescue.deployed();
    //     await instance.add("Jojo", "male", 2, "fuzzball", "ipfshash", "true");
    //     await instance.adopt("Jake", "male", 25, "Jojo", 0, {from: secondAccount});
    //     await truffleAssert.passes(instance.returnCatToShelter(0, {from: secondAccount}));        
    // });

});