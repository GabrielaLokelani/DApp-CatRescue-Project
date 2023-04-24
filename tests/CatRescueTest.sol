
pragma solidity ^0.8.7;

import 'truffle/Assert.sol';
import '../public/CatRescue.sol';

contract CatRescueTest {
    function testSettingOwner() public {
        CatRescue catrescue = new CatRescue();
        Assert.equal(catrescue.owner(), address(this), 'The owner is different from the deployer!')
    }
}