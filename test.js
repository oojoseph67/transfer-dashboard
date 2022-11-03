const { ethers } = require('ethers')
const transferABI = require('./transfer/transferAbi.json')

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/glfliZlFGdCDw7nIPRPhgju5x0oWfCWb")

// Contracts
const transferContractAddress = new ethers.Contract('0x09522bbc444cE17D7feFB965485bDC68a3D26af4', transferABI, provider)

async function getData() {
    const get = await transferContractAddress.filters.recipients()
    const trans = await transferContractAddress.queryFilter(get)
    console.log(trans)
}

getData()