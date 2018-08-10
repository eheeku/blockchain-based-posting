//define
var contractAddress = '0x95ef625da29bcb877d5fe767209ee318487bca35';
var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "posting",
    "outputs": [
      {
        "name": "poster",
        "type": "address"
      },
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
    "inputs": [
      {
        "name": "_block",
        "type": "uint256"
      }
    ],
    "name": "get_posting",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
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
    "name": "get_lastblock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get_instructorAccts",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "blocks",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
    "name": "setInstructor",
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
  var last_block;
 Epost.get_lastblock(function(e,r){
    document.getElementById('last-block').innerHTML = r;
    Epost.get_posting(r,function(e,r){
      document.getElementById('Epost-name').innerHTML = r[0];
      document.getElementById('Epost-title').innerHTML = r[1];
      document.getElementById('Epost-commend').innerHTML = r[2];
  });
  });
}
function get_posting(){
  
}

function set_value(){
	var new_title = document.getElementById('new_title').value;
	var new_commend = document.getElementById('new_commend').value;
	//if raise error
	var Transaction_id
	Epost.setInstructor(new_title,new_commend,function (e,r){
		document.getElementById('new_title','new_commend').innerHTML=  'Transaction id: ' + r + '<span id="pending" style="color:red;">(Pending)</span>';
		Transaction_id = r;
	});

}