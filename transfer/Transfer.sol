// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Transfer {

    event transactions(address indexed from, address to, uint amount, string symbol);
    event recipients(address indexed recipientOf, address recipient, string recipientName);

    // function transfer(address payable _to, uint256 _amount) public {
    //     _to.transfer(_amount);
    // }

    function _transfer(address payable _to, string memory symbol) public payable {
        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol); 
    }

    function saveTx(address from, address to, uint amount, string memory symbol) public payable {
        emit transactions(from, to, amount, symbol);
    }

    function addRecipient(address recipient, string memory name) public {
        emit recipients(msg.sender, recipient, name);
    }
} 