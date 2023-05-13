let CatRescue = artifacts.require("CatRescue");

contract('CatRescue', function(accounts) {
    it("should donate 100", async function() {
        let instance = await CatRescue.deployed();
        await instance.donate(100);
        let val = await instance.getDonationBalance();
        assert.equal(val, 100, '100 should be set')
    });
});