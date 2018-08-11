//define
var contractAddress = '0xaac502d3b4da6db87b72f150081de52abc9a26b9';
var abi =[
  {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
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
    "constant": false,
    "inputs": [
      {
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
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
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "send",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blocks_len",
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
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  }
];

var EPostContract;
var EPost;

window.addEventListener('load', function() {

  if (typeof web3 !== 'no web3') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  start_app();
});

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
      Epost.get_instructorAccts(function(e,r){
        for (i = 0; i <r.length;i++){
         Epost.get_posting(r[i].c,function(e,r){
          document.getElementById('post-list').innerHTML += "<ul class = post-"+i+">";
          document.getElementById('post-list').innerHTML += "<li><a onclick="+"'in_address("+r[0]+")'"+">"+r[0]+"</a></li>";
          document.getElementById('post-list').innerHTML += "<li>"+r[1]+"</li>";
          document.getElementById('post-list').innerHTML += "<li>"+r[2]+"</li>";
          document.getElementById('post-list').innerHTML += "</ul>"
          console.log(r);
         })
        }
      });
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
function fallBack(){
    var value = document.getElementById('eth_value').value;
    var pw = document.getElementById('eth_pw').value;

    web3.personal.unlockAccount(web3.eth.accounts,pw,600,function(e,r){ console.log(r)});
    console.log("gg");
    var txHash = web3.eth.sendTransaction({
    from: "0x03ee96a26b1102f8edc90b29674425d19f2f44a2",
    //web3.eth.accounts[0],
    to: "0xf3f62a773ff777193a36bfcf4cfe0316f43e56f0",
    value: value
},function(e,r){console.log(r);});
    console.log(txHash);
}