//define
var contractAddress = '0xe1e148595874a23753dc4c3f826e9e9d979914ce';
var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "posting",
    "outputs": [
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "commend",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTitle",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCommend",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_commend",
        "type": "string"
      }
    ],
    "name": "setPosting",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
];

var EPostContract;
var EPost;

window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  // Now you can start your app & access web3 freely:
  start_app();
});


//


function start_app (){
	EpostConstract = web3.eth.contract(abi);
	Epost = EpostConstract.at(contractAddress);

	document.getElementById('contract-addr').innerHTML = get_link(contractAddress);
	web3.eth.getAccounts(function(e,r){
		document.getElementById('account-addr').innerHTML =get_link(r[0]);
	});
get_value()
}

function get_link(addr){
	return '<a target="_blank" href=https://testnet.etherscan.io/address/' + addr + '>' + addr +'</a>';
}

function get_value(){
	Epost.getTitle(function(e,r){
		document.getElementById('Epost-title').innerHTML=r.toString();
	});

	Epost.getCommend(function(e,r){
		document.getElementById('Epost-commend').innerHTML=r.toString();
	});
web3.eth.getBlockNumber(function(e,r){
    document.getElementById('last-block').innerHTML = r;
  });
}

function set_value(){
	var new_title = document.getElementById('new_title').value;
	var new_commend = document.getElementById('new_commend').value;
	//if raise error
	var Transaction_id
	Epost.setPosting(new_title,new_commend,function (e,r){
		document.getElementById('new_title','new_commend').innerHTML=  'Transaction id: ' + r + '<span id="pending" style="color:red;">(Pending)</span>';
		Transaction_id = r;
	});

}