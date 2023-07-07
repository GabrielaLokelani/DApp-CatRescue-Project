const CatRescue = artifacts.require("CatRescue");
const SECONDS_IN_1_HOUR = 3600;
const HOURS_IN_A_DAY = 24;

const DAY = SECONDS_IN_1_HOUR * HOURS_IN_A_DAY;

module.exports = function(deployer) {
    deployer.deploy(CatRescue);
};