function analyze(_move) {

    // Splitting the message to array
    var message = _move.split(",");
    var _letterlist = _move.split(",",3);
    var _playerlist = playerlist.split(",");
    var found = false

    if (message[2] == "PLAYERS") {
        if (playerlist == "") {
            playerlist = playerlist + message[1]
        }
        else {
            if(debug){console.log(_playerlist.length)}
            for (var i=0;i<_playerlist.length;i++){
                if (message[1] == _playerlist[i]){found = true}
            }
            if (!found) { playerlist = playerlist + "," + message[1]}
        }
    }

    //if (message[2] == "SET" && player_id > 1 ) {
    if (message[2] == "SET") {

        console.log("analyze_SET", _letterlist[2], letterlist)

    }

}
