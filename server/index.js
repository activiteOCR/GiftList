const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
//const merkleTree = new MerkleTree(niceList);
//const hexString = merkleTree.getRoot();

const MERKLE_ROOT = '6ecddf47bff1a5c9e9ac8b5bd24dd54a1151d223073513305d008edafad30658';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list 
  
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
