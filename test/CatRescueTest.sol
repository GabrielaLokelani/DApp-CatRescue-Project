//SPDX-License-Identifier: Gabriela Kadzielawa 2023
pragma solidity >=0.8.3;

import 'truffle/Assert.sol';
import '../contracts/CatRescue.sol';

contract CatRescueTest {
    function testSettingOwner() public {
        CatRescue catrescue = new CatRescue();
        Assert.equal(catrescue.owner(), address(this), 'The owner is different from the deployer!');
    }
}

// testing push ability