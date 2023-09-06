// SPDX-License-Identifier: Gabriela Kadzielawa 2023
// compiler version must be greater than or equal to 0.8.3 and less than 0.9.0
pragma solidity >=0.8.7;

contract CatRescue {

    address payable public owner;
    uint256 balance = address(this).balance;
    mapping(address => uint) adopted;
    uint returnExpiration;

    modifier isAllowed(uint8 catIndex) {
        require(cat[catIndex].available == true, "Sorry! This cat has been adopted already");
        _;
    } 

    struct Cat {
        string catsName;
        string gender;
        uint8 age;
        string description;
        string hash;
        bool available;   
    }
    Cat[] public cat;

    struct Customer {
        string gender;
        uint8 age;
        string name;
        string pet;
        uint adoptionTime;
    }
    mapping (address => Customer) private Customers;

    constructor() public {
        owner = payable(msg.sender);
        adopted[msg.sender] = 0;
    }

    function add(string memory _catName, string memory _catGender, uint8 _catAge, string memory _description, string memory _hash, bool _available) public {
        require(msg.sender == owner, "Sorry! Only the owner may shelter cats.");

        cat.push(Cat({
            catsName : _catName,
            gender : _catGender,
            age : _catAge,
            description : _description,
            hash : _hash,
            available : _available
        }));
    }

    function adopt(string memory personName, string memory personGender, uint8 personAge, string memory _catsName, uint8 catIndex) public isAllowed(catIndex) returns(bool adoptionSuccess) {
        require(adopted[msg.sender] == 0, "You already adopted!");
        require(keccak256(abi.encodePacked(_catsName)) == keccak256(abi.encodePacked(cat[catIndex].catsName)), "Sorry! Cat's name does not match with the index given");

        Customers[msg.sender].gender = personGender;
        Customers[msg.sender].age = personAge;
        Customers[msg.sender].name = personName;
        Customers[msg.sender].pet = _catsName;
        cat[catIndex].available = false;
        Customers[msg.sender].adoptionTime = block.timestamp;
        adopted[msg.sender]++;
        return true;
    }

    function returnCatToShelter(uint8 catIndex) public returns(bool returnSuccess) {
        returnExpiration = Customers[msg.sender].adoptionTime + 1 days;
        require(block.timestamp <= returnExpiration, "Returns must be within 24 hours of adoption!");

        Customers[msg.sender].pet = "RETURNED";
        cat[catIndex].available = true;
        adopted[msg.sender]--;
        return true;
    }

    function donate(uint256 value) public payable {
        balance += value;
    }

    function getDonationBalance() public view returns(uint256 donationTotal) {
        require(msg.sender == owner, "Sorry! Only the owner may inquire the donation balance.");
        return balance;
    }

    function withdrawDonations() public payable {
        require(msg.sender == owner, "Sorry! Only the owner may collect donations.");
        owner.balance + balance;
        balance = 0;
    }

    function getCatsCount() public view returns (uint256 catCount) {
        return cat.length;
    }

    function getCat(uint8 catIndex) public view returns(string memory name, string memory gender, uint8 age, string memory description, string memory _hash, bool available) {
        Cat memory specificCat = cat[catIndex];
        return(specificCat.catsName, specificCat.gender, specificCat.age, specificCat.description, specificCat.hash, specificCat.available);
    }

    // function getReceipt() public view returns(string memory customers_name, uint customers_age, string memory customers_gender, string memory customers_pet) {
    //     return(Customers[msg.sender].name, Customers[msg.sender].age, Customers[msg.sender].gender, Customers[msg.sender].pet);
    // }
}