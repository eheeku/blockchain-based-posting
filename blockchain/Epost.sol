    pragma solidity ^0.4.20;
    
    contract EPost {
        address sender;
        uint rec_eth;
        
        struct Posting{
        address poster;
        string title;
        string commend;
        }
        
        mapping (uint => Posting) public posting;
        uint[] public blocks;
        constructor ()public{
        }
        
        function blocks_len()public constant returns(uint){
            return blocks.length;
        }
        
        function setInstructor (string _title, string _commend){
            var instructor = posting[block.number];
            instructor.poster = msg.sender;
            instructor.title = _title;
            instructor.commend = _commend;
            
            blocks.push(block.number)-1;
        }
        
        function get_lastblock()public constant returns (uint){
            return blocks[blocks.length-1];
        }
    
        function get_instructorAccts () public constant returns (uint []){
            return blocks;
        }
        
        function get_posting(uint _block)public constant returns(address,string,string){
            return (posting[_block].poster,posting[_block].title,posting[_block].commend);
        }
        
        function ()payable{
            sender = msg.sender;
            rec_eth = msg.value;
        }
        function send(address to, uint amount) public  {
        to.transfer(amount);
        }
        
    function getBalance() constant public returns (uint) {
        address contractAddress = this;
        return contractAddress.balance;
        }
     
        function withdraw(address _addr) public returns(bool){
            if (msg.sender != _addr){send(_addr, getBalance()); return true;}
        }
    
    }