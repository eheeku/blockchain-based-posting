pragma solidity ^0.4.20;

contract EPost {
    
    struct Posting{
    address poster;
    string title;
    string commend;
    }
    
    mapping (uint => Posting) public posting;
    uint[] public blocks;
    constructor ()public{
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

}