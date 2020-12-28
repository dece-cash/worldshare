pragma solidity 0.6.10;
// SPDX-License-Identifier: GPL-3.0 pragma solidity >=0.4.16 <0.7.0;
pragma experimental ABIEncoderV2;

import "../common/strings.sol";
import "../common/math.sol";
import "../common/ownable.sol";
contract Code {

    uint64 private dictLength = 62;

    byte[] private dict = [byte('0'), byte('1'), byte('2'), byte('3'), byte('4'), byte('5'), byte('6'), byte('7'),
    byte('8'), byte('9'), byte('a'), byte('b'), byte('c'), byte('d'), byte('e'), byte('f'),
    byte('g'), byte('h'), byte('i'), byte('j'), byte('k'), byte('l'), byte('m'), byte('n'),
    byte('o'), byte('p'), byte('q'), byte('r'), byte('s'), byte('t'), byte('u'), byte('v'),
    byte('w'), byte('x'), byte('y'), byte('z'), byte('A'), byte('B'), byte('C'), byte('D'),
    byte('E'), byte('F'), byte('G'), byte('H'), byte('I'), byte('J'), byte('K'), byte('L'),
    byte('M'), byte('N'), byte('O'), byte('P'), byte('Q'), byte('R'), byte('S'), byte('T'),
    byte('U'), byte('V'), byte('W'), byte('X'), byte('Y'), byte('Z')];

    function encode(uint64 number ) public view returns (string memory) {
        number = hash64(number);
        bytes memory datas = new bytes(32);
        uint charLen;
        while(number > 0) {
            uint64 round = number / dictLength;
            uint64 remain = number % dictLength;
            datas[charLen++] = dict[remain];
            number = round;
        }

        bytes memory result = new bytes(charLen);
        for(uint i= charLen;i>0;i--) {
            result[charLen-i] = datas[i-1];
        }
        return string(result);
    }

    function decode(string memory code) public view returns (uint64) {
        bytes memory datas = bytes(code);
        uint64 codeLength = uint64(datas.length);

        uint64 ret;
        for(uint i=0;i<codeLength;i++) {
            ret += uint64(indexByte(datas[i])) * uint64(dictLength ** (codeLength-1-i));
        }
        return unHash64(ret);
    }

    function indexByte(byte b) internal view returns(uint) {
        for(uint i=0;i<62;i++) {
            if(dict[i] == b) {
                return i;
            }
        }
    }


    function hash64(uint64 x) internal pure returns (uint64) {
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        x = x ^ (x >> 31);
        return x;
    }

    function unHash64(uint64 x) internal pure returns (uint64) {
        x = (x ^ (x >> 31) ^ (x >> 62)) * 0x319642b2d24d8ec3;
        x = (x ^ (x >> 27) ^ (x >> 54)) * 0x96de1b173f119089;
        x = x ^ (x >> 30) ^ (x >> 60);
        return x;
    }

}

contract BaseInterface {

    bytes32 private topic_issueToken = 0x3be6bf24d822bcd6f6348f6f5a5c2d3108f04991ee63e80cde49a8c4746a0ef3;
    bytes32 private topic_balanceOf = 0xcf19eb4256453a4e30b6a06d651f1970c223fb6bd1826a28ed861f0e602db9b8;
    bytes32 private topic_send = 0x868bd6629e7c2e3d2ccf7b9968fad79b448e7a2bfb3ee20ed1acbc695c3c8b23;
    bytes32 private topic_currency = 0x7c98e64bd943448b4e24ef8c2cdec7b8b1275970cfe10daf2a9bfa4b04dce905;
    bytes32 private topic_setTokenRate   =  0x6800e94e36131c049eaeb631e4530829b0d3d20d5b637c8015a8dc9cedd70aed;

    function balanceOf(string memory _currency) internal returns (uint256 amount){
        bytes memory temp = new bytes(32);
        assembly {
            mstore(temp, _currency)
            log1(temp, 0x20, sload(topic_balanceOf_slot))
            amount := mload(temp)
        }
    }


    function msg_currency() internal returns (string memory) {
        bytes memory tmp = new bytes(32);
        bytes32 b32;
        assembly {
            log1(tmp, 0x20, sload(topic_currency_slot))
            b32 := mload(tmp)
        }
        return strings._bytes32ToStr(b32);
    }

    function issueToken(uint256 _total, string memory _currency) internal returns (bool success){
        bytes memory temp = new bytes(64);
        assembly {
            mstore(temp, _currency)
            mstore(add(temp, 0x20), _total)
            log1(temp, 0x40, sload(topic_issueToken_slot))
            success := mload(add(temp, 0x20))
        }
    }

    function send_token(address _receiver, string memory _currency, uint256 _amount) internal returns (bool success){
        return send(_receiver, _currency, _amount, "", 0);
    }

    function send(address _receiver, string memory _currency, uint256 _amount, string memory _category, bytes32 _ticket) internal returns (bool success){
        bytes memory temp = new bytes(160);
        assembly {
            mstore(temp, _receiver)
            mstore(add(temp, 0x20), _currency)
            mstore(add(temp, 0x40), _amount)
            mstore(add(temp, 0x60), _category)
            mstore(add(temp, 0x80), _ticket)
            log1(temp, 0xa0, sload(topic_send_slot))
            success := mload(add(temp, 0x80))
        }
    }

    function setTokenRate(string memory _currency, uint256 _tokenAmount, uint256 _taAmount) internal returns (bool success){
        bytes memory temp = new bytes(96);
        assembly {
            let start := temp
            mstore(start, _currency)
            mstore(add(start, 0x20), _tokenAmount)
            mstore(add(start, 0x40), _taAmount)
            log1(start, 0x60, sload(topic_setTokenRate_slot))
            success := mload(add(start, 0x40))
        }
    }

}


contract NewDKRW is Code, BaseInterface, Ownable {
    using SafeMath for uint256;
    string constant CY = "DKRW";
    uint256 constant LEVEL_1 = 12e22;
    uint256 constant LEVEL_2 = 36e22;
    uint256 constant LEVEL_3 = 12e23;
    uint256 constant LEVEL_4 = 36e23;
    uint256 constant LEVEL_5 = 12e24;

    uint256 constant BOOSTER_LEVEL_1 = 1e26;
    uint256 constant BOOSTER_LEVEL_2 = 3e26;
    uint256 constant BOOSTER_LEVEL_3 = 1e27;
    uint256 constant BOOSTER_LEVEL_4 = 3e27;
    uint256 constant BOOSTER_LEVEL_5 = 1e28;

    uint256 constant private MAXHEIGHT = 100;

    struct Locaction {
        uint256 x;
        uint256 y;
    }

    struct Player {
        uint256 refferId;
        uint256 value;
        uint256 returnValue;
        uint256 canDrawupValue;
        uint256 level;
        uint256 recommendProfit;
        uint256 boosterProfit;
        uint256 roolupProfit;
        uint256 suportProfit;

        uint256 achievement;
        uint256 otherAchievement;

        uint256 avatarValue;
        uint256 overflowValue;
    }

    struct Detail {
        uint256 ID;
        string idLeft;
        string idRight;
        uint256 leftAchievement;
        uint256 rightAchievement;
        uint256 boosterLevel;

        Player player;

        string reffer;
    }

    event profitLog(uint256 id, uint256 pType, uint256 value, uint256 profit);
    event avatarLog(uint256 id, uint256 level, string reffer);
    event generationLog(uint256 id, uint256 refferId);

    mapping(uint256 => mapping(uint256=>bool)) avatarIds;
    Player[] public players;
    Locaction[] public locations;
    mapping(address => uint256) public idsMap;
    mapping(bytes32 => uint256) public locationToIdMap;
    mapping(uint256 => uint8) public flags;

    address private marketAddr;

    bool private _start;

    constructor(address _marketAddr) public {
        marketAddr = _marketAddr;
        locations.push(Locaction({x:0,y:0}));
        players.push(Player({refferId:0,value:0,returnValue:0,canDrawupValue:0,level:0,recommendProfit:0,boosterProfit:0,roolupProfit:0,suportProfit:0,achievement:0,otherAchievement:0,avatarValue:0,overflowValue:0}));
    }

    function start() public onlyOwner {
        _start = true;
    }

    function setMarketAddr(address _marketAddr) public onlyOwner {
        marketAddr = _marketAddr;
    }

    function details() public view returns (Detail memory detail) {
        uint256 id = idsMap[msg.sender];
        if(id == 0) {
            return detail;
        }

        detail.ID = id;
        uint256 leftId = locationToId(locations[id].x*2, locations[id].y+1);
        uint256 rightId = locationToId(locations[id].x*2+1, locations[id].y+1);
        if(leftId != 0) {
            detail.leftAchievement = players[leftId].achievement;
        }

        if(rightId != 0) {
            detail.rightAchievement = players[rightId].achievement;
        }

        if(leftId != 0 && rightId != 0 && flags[id] == 3) {
            uint256 small;
            if(detail.leftAchievement < detail.rightAchievement) {
                small = detail.leftAchievement;
            } else {
                small = detail.rightAchievement;
            }
            detail.boosterLevel = boosterLevel(small);
        }

        detail.idLeft = encode(uint64(id*2));
        detail.idRight = encode(uint64(id*2+1));

        detail.player = players[id];
        detail.reffer = encode(uint64(players[id].refferId));
        return detail;
    }

    function withdraw() public {
        uint256 value = players[idsMap[msg.sender]].canDrawupValue;
        require(value > 0);
        players[idsMap[msg.sender]].canDrawupValue = 0;
        require(send_token(msg.sender, CY, value));
    }

    function agent(string memory refferCode, address addr) public payable {
        require(strings._stringEq(CY, msg_currency()));
        uint256 value = msg.value;
        require(send_token(marketAddr, CY, value.mul(15).div(100)));

        _register(refferCode, addr, value);
    }

    function register(string memory refferCode) public payable {
        require(strings._stringEq(CY, msg_currency()));
        uint256 value = msg.value;
        require(send_token(marketAddr, CY, value.mul(15).div(100)));

        _register(refferCode, msg.sender, value);
    }

    function _register(string memory refferCode, address sender, uint256 value) internal {
        if(players.length == 1) {
            addNode(sender, 0, value);
            setLevel(1);
            return;
        }

        uint256 id = idsMap[sender];
        if(id == 0) {
            uint64 refferId = decode(refferCode);
            uint256 pid = refferId/2;
            require(pid < players.length && players[pid].value > 0);
            if(flags[pid] != 3) {
                if(refferId &1 == 1) {
                    flags[pid] = flags[pid]|2;
                } else {
                    flags[pid] = flags[pid]|1;
                }
            }

            id = addNode(sender, refferId, value);
            setLevel(id);
            emit generationLog(id, refferId);
            process(id, refferId, value);
        } else {
            if(players[id].value == value) {
                (uint256 avatarId, uint256 refferId) = findAvatarId(id);
                require(avatarIds[id][refferId] == false);
                avatarIds[id][refferId] = true;
                players[id].avatarValue = players[id].avatarValue.add(value.mul(times(id)));
                emit avatarLog(id, players[id].level, encode(uint64(refferId)));

                processOverflow(id);
                process(avatarId, refferId, value);
            } else {
                players[id].value = players[id].value.add(value);
                players[id].achievement = players[id].achievement.add(value);

                setLevel(id);
                processOverflow(id);
                process(id, players[id].refferId, value);
            }
        }
    }

    function processOverflow(uint256 id) internal {
        if(players[id].overflowValue > 0) {
            uint256 _times = times(id);
            uint256 expect = players[id].value.mul(_times).add(players[id].avatarValue);
            if(expect > players[id].returnValue) {

                uint256 _profit;
                if(expect.sub(players[id].returnValue) >= players[id].overflowValue ) {
                    _profit = players[id].overflowValue;
                    players[id].overflowValue = 0;
                } else {
                    _profit = expect.sub(players[id].returnValue);
                    players[id].overflowValue = players[id].overflowValue.sub(_profit);
                }

                emit profitLog(id, 4, _profit, 0);
                players[id].returnValue = players[id].returnValue.add(_profit);
                if(_start) {
                    players[id].canDrawupValue = players[id].canDrawupValue.add(_profit);
                }
            }
        }
    }

    function process(uint256 id, uint256 refferId, uint256 value) internal {
        uint256 childId = id;

        uint256 parentId = getParentId(childId);
        uint256 height;
        uint256 otherAmount = value;
        while (parentId != uint256(0)) {
            if (players[childId].otherAchievement != 0) {
                otherAmount = otherAmount.add(players[childId].otherAchievement);
                players[childId].achievement = players[childId].achievement.add(players[childId].otherAchievement);
                players[childId].otherAchievement = 0;
            }

            if (height == MAXHEIGHT && parentId != 1) {
                players[parentId].otherAchievement = players[parentId].otherAchievement.add(otherAmount);
                break;
            } else {
                players[parentId].achievement = players[parentId].achievement.add(otherAmount);
            }

            (childId, parentId) = (parentId, getParentId(parentId));
            height++;
        }

        _recommendProfit(refferId/2, value);
        _suportProfit(id, value);
        _boosterProfit(id,value);
        _rollupProfit(id, value, layer(id));
    }

    function _recommendProfit(uint256 id, uint256 value) internal {
        if(players[id].value > 0) {
            players[id].recommendProfit = players[id].recommendProfit.add(_calceProfit(id, 0, value/10));
            id = players[id].refferId/2;
            if(players[id].value > 0) {
                players[id].recommendProfit = players[id].recommendProfit.add(_calceProfit(id, 0, value*8/100));

                id = players[id].refferId/2;
                if(players[id].value > 0) {
                    players[id].recommendProfit = players[id].recommendProfit.add(_calceProfit(id, 0, value*7/100));
                }
            }
        }
    }

    function _suportProfit(uint256 id, uint256 _value) internal {
        uint256 parentId = getParentId(id);
        uint256 height;

        while (parentId != 0 && height < MAXHEIGHT) {
            uint256 brotherId = getBotherId(id);
            if(flags[parentId] != 3 || players[brotherId].achievement < players[id].achievement) {
                (id, parentId) = (parentId, getParentId(parentId));
                height++;
                continue;
            }

            uint currentRate = players[parentId].level * 3;
            uint256 _profit = _value.mul(currentRate) / 100;
            players[parentId].suportProfit = players[parentId].suportProfit.add(_calceProfit(parentId, 1, _profit));

            (id, parentId) = (parentId, getParentId(parentId));
            height++;
        }
    }

    function _boosterProfit(uint256 id, uint256 _value) internal {

        uint256 parentId = getParentId(id);
        uint256 height;
        uint256 rate;

        uint256 selfId = idsMap[msg.sender];

        while (parentId != 0 &&  rate < 15 && height < MAXHEIGHT) {
            if(parentId == selfId || players[parentId].value ==0) {
                (id, parentId) = (parentId, getParentId(parentId));
                continue;
            }


            uint256 brotherId = getBotherId(id);
            uint256 achievement;
            if(brotherId == 0 || players[brotherId].achievement < players[id].achievement) {
                achievement = players[brotherId].achievement;
            } else {
                achievement = players[id].achievement;
            }

            uint currentRate = boosterLevel(achievement) * 3;

            if (currentRate <= rate || flags[parentId] != 3) {
                (id, parentId) = (parentId, getParentId(parentId));
                height++;
                continue;
            }

            (rate, currentRate) = (currentRate, currentRate - rate);
            uint256 _profit = _value.mul(currentRate)/100;
            players[parentId].boosterProfit = players[parentId].boosterProfit.add(_calceProfit(parentId, 2, _profit));

            (id, parentId) = (parentId, getParentId(parentId));
            height++;
        }
    }

    function _rollupProfit(uint256 id, uint256 _value, uint256 _layer) internal {
        uint256 parentId = getParentId(id);
        while(parentId > 0) {
            uint256 layers = 10;
            if(players[parentId].level == 5) {
                layers = 20;
            } else if(players[parentId].level ==4) {
                layers = 18;
            } else if(players[parentId].level == 3) {
                layers = 15;
            } else if(players[parentId].level == 2) {
                layers = 12;
            }

            if(_layer.sub(layer(parentId)) > 20) {
                return;
            }

            if(_layer.sub(layer(parentId)) <= layers) {
                players[parentId].roolupProfit = players[parentId].roolupProfit.add(_calceProfit(parentId, 3,_value.div(100)));
            }

            parentId =  getParentId(parentId);
        }
    }

    function _calceProfit(uint256 id, uint256 pType, uint256 profit) internal returns (uint256 _profit){
        uint256 _times = times(id);
        uint256 expect = players[id].value.mul(_times).add(players[id].avatarValue);
        if(players[id].returnValue >= expect) {
            emit profitLog(id, pType, 0, profit);
            players[id].overflowValue = players[id].overflowValue.add(profit);
            return 0;
        }

        if(expect < players[id].returnValue + profit) {
            _profit = expect.sub(players[id].returnValue);
            players[id].overflowValue = players[id].overflowValue.add(profit.sub(_profit));
        } else {
            _profit = profit;
        }

        emit profitLog(id, pType, _profit, profit);
        players[id].returnValue = players[id].returnValue.add(_profit);
        if(_start) {
            players[id].canDrawupValue = players[id].canDrawupValue.add(_profit);
        }
    }

    function addNode(address owner, uint256 refferId, uint256 value) internal returns (uint256 id) {
        id = players.length;

        (uint256 x, uint256 y) = findLocation(refferId);

        _addNode(refferId, value, x, y);
        idsMap[owner] = id;
        locationToIdMap[keccak256(abi.encode(x, y))] = id;
    }

    function _addNode(uint256 refferId, uint256 value, uint256 x, uint256 y) internal {
        locations.push(Locaction({x:x,y:y}));
        players.push(Player({
            refferId:refferId,
            value:value,
            returnValue:0,
            canDrawupValue:0,
            level:0,
            recommendProfit:0,
            boosterProfit:0,
            roolupProfit:0,
            suportProfit:0,
            achievement:value,
            otherAchievement:0,
            avatarValue:0,
            overflowValue:0
            }));
    }

    function setLevel(uint256 id) internal {
        if(players[id].value == LEVEL_5) {
            require(players[id].level == 0 || players[id].level == 4);
            players[id].level = 5;
        } else if(players[id].value == LEVEL_4) {
            require(players[id].level == 0 || players[id].level == 3);
            players[id].level = 4;
        }else if(players[id].value == LEVEL_3) {
            require(players[id].level == 0 || players[id].level == 2);
            players[id].level = 3;
        }else if(players[id].value == LEVEL_2) {
            require(players[id].level == 0 || players[id].level == 1);
            players[id].level = 2;
        }else if(players[id].value == LEVEL_1) {
            players[id].level = 1;
        } else {
            require(false);
        }
    }

    function getBotherId(uint256 id) public view returns(uint256) {
        return  locationToId(locations[id].x^1, locations[id].y);
    }

    function getParentId(uint256 childId) public view returns(uint256) {
        if(childId == 1) {
            return 0;
        }
        return locationToId(locations[childId].x >> 1, locations[childId].y.sub(1));
    }

    function leftLocation(uint256 id) private view returns(uint256, uint256) {
        return (locations[id].x*2, locations[id].y+1);
    }

    function rightLocation(uint256 id) private view returns(uint256, uint256) {
        return (locations[id].x*2+1, locations[id].y+1);
    }

    function findLocation(uint256 referId) public view returns(uint256, uint256) {
        if(referId == 0) {
            return (0, 0);
        }

        bool isLeft = referId&1 == 0;
        uint256 id = referId >> 1;

        uint256 x;
        uint256 y;
        if(isLeft) {
            while(id != 0){
                (x, y) = leftLocation(id);
                id = locationToId(x, y);
            }
        } else {
            while(id != 0){
                (x, y) = rightLocation(id);
                id = locationToId(x, y);
            }
        }
        return (x,y);
    }

    function locationToId(uint256 x, uint256 y) public view returns(uint256) {
        return locationToIdMap[keccak256(abi.encode(x, y))];
    }

    function findAvatarId(uint256 id) internal returns(uint256, uint256) {
        uint256 hash = uint256(keccak256(abi.encode(id, now)));
        uint256 x;
        uint256 y;
        uint256 referId;
        for(uint256 i=0;i<256;i++) {
            uint256 n = hash&1;
            if(n == 0) {
                if(players[id].value != 0) {
                    referId = id * 2;
                }
                (x, y) = leftLocation(id);
                id = locationToId(x, y);
            } else {
                if(players[id].value != 0) {
                    referId = id * 2 + 1;
                }
                (x, y) = rightLocation(id);
                id = locationToId(x, y);
            }
            if(id == 0) {
                id = players.length;
                _addNode(referId, 0, x, y);
                return (id, referId);
            }
            hash = hash >> 1;
        }
        require(false);
    }

    function times(uint256 id) internal view returns (uint256) {
        uint256 _times = players[id].level + 2;
        if(_times > 5) {
            _times = 5;
        }
        return _times;
    }

    function boosterLevel(uint256 value) internal pure returns(uint256) {
        if(value >= BOOSTER_LEVEL_5) {
            return 5;
        } else if(value >= BOOSTER_LEVEL_4) {
            return 4;
        } else if(value >= BOOSTER_LEVEL_3) {
            return 3;
        } else if(value >= BOOSTER_LEVEL_2) {
            return 2;
        } else if(value >= BOOSTER_LEVEL_1) {
            return 1;
        }
        return 0;
    }

    function layer(uint256 id) internal view returns(uint256 n) {
        return locations[id].y;
    }
}
