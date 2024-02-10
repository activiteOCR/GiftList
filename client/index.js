const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Check if a name is provided as a command line argument
  const name = process.argv[2]; // Assuming the name is provided as the third argument
  if (!name) {
    console.error('Please provide a name as a command line argument.');
    return;
  }
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that argv[2] is in the list 
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    index,
    proof,
    root
  });

  console.log({ gift });
}

main();