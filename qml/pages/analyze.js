function analyze(_move) {

    // Splitting the message to array
    var message = _move.split(",");
    var _letterlist = _move.split(",");
    var _playerlist = playerlist.split(",");
    var found = false

    if (message[2] == "PLAYERS") {
        if (message[1] == ""){
            console.log("Some player has no name")
        }
        if (playerlist == "") {
            playerlist = playerlist + message[1]
        }
        else {
            for (var i=0;i<_playerlist.length;i++){
                if (message[1] == _playerlist[i]){found = true}
            }
            if (!found) {
                playerlist = playerlist + "," + message[1]
            }
        }
        numberOfPlayers = _playerlist.length
        players_list.text = playerlist
    }

    //if (message[2] == "SET" && player_id > 1 ) {
    if (message[2] == "SET") {

        console.log("analyze_SET", _letterlist[2], letterlist)
        letterModel.clear();
        for (i=3;i<_letterlist.length-1;i++){
            if ((i-3)%2==0){
                letterModel.set((i-3)/2,{"letter":_letterlist[i]})
                letterModel.set((i-3)/2,{"rotation_rad":parseFloat(_letterlist[i+1])})
                letterModel.set((i-3)/2,{"possible":1})
                letterModel.set((i-3)/2,{"temp_possible":1})

            }
            else {

            }
        }
        p_timer = true
    }

    if (message[2]=="WORDS") {
        console.log("Words", message[2], message)
        saveWords(_move)

    }

}

function saveWords(msg) {

    var _msg = msg.split(",");

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');

        // Check if the row already exists
        var rs = tx.executeSql('SELECT * FROM Words WHERE id = ? AND player = ?', [_msg[0], _msg[1]]);
        if (rs.rows.length > 0) {
            console.log("Updating existing row...");
            // Update the message if the row exists
            tx.executeSql('UPDATE Words SET message = ? WHERE id = ? AND player = ?', [msg, _msg[0], _msg[1]]);
        } else {
            console.log("Inserting new row...");
            // Insert a new row if it doesn't exist
            tx.executeSql('INSERT INTO Words (id, player, message) VALUES (?, ?, ?)', [_msg[0], _msg[1], msg]);
        }
    });
}

function fillResults () {

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Results (word TEXT, player TEXT, UNIQUE(word, player))');
        tx.executeSql('DELETE FROM Results')

        var _players = "" //adding only the players who are in Words table
        // First clear pointsModel
        pointsModel.clear();

        // Check if the row already exists
        var rs = tx.executeSql('SELECT * FROM Words');
        for (var i = 0; i<rs.rows.length;i++) {
            pointsModel.append({player:rs.rows.item(i).player,points:0})

            var __msg = rs.rows.item(i).message.split(",")
            for (var j =3;j< __msg.length;j++){
                tx.executeSql('INSERT INTO Results (word, player) VALUES (?, ?)', [__msg[j], __msg[1]]);
            }
        }
        // Query to group by word, concatenate players, and count players
        _players =  playerlist.split(",")
        var _pla_length = rs.rows.length // Same as numberOfPlayers
        var rt = tx.executeSql("SELECT word, GROUP_CONCAT(player, ' ') AS players, (? - COUNT(player)) AS player_count FROM Results GROUP BY word ORDER BY word ASC ", _pla_length );
        wordModel.clear();

        var _zero_words = ""

        for (var k = 0;k<rt.rows.length;k++) {
            // Adding common words to the string. If only one player point are counted differently
            if (rt.rows.item(k).player_count == 0 && _pla_length < 2) {
                _zero_words = _zero_words + ", " + rt.rows.item(k).word
                wordModel.append({word: rt.rows.item(k).word, mypoints : rt.rows.item(k).player_count + 1, players: rt.rows.item(k).players})
                for (var m = 0;m < rs.rows.length;m++ ) {
                    if (String(rt.rows.item(k).players).indexOf(String(rs.rows.item(m).player)) !== -1){
                        pointsModel.set(m,{points:(pointsModel.get(m).points + rt.rows.item(k).player_count) + 1 });
                    }
                }
                if (zeropointwords == ""){
                    zeropointwords = rt.rows.item(k).word
                }
                else {
                    zeropointwords = zeropointwords +  ", " + rt.rows.item(k).word
                }
            }
            else if (rt.rows.item(k).player_count == 0) {
                _zero_words = _zero_words + ", " + rt.rows.item(k).word
                if (zeropointwords == ""){
                    zeropointwords = rt.rows.item(k).word
                }
                else {
                    zeropointwords = zeropointwords +  ", " + rt.rows.item(k).word
                }
            }
            else{
                wordModel.append({word: rt.rows.item(k).word, mypoints : rt.rows.item(k).player_count, players: rt.rows.item(k).players})
                for (m = 0;m < rs.rows.length;m++ ) {
                    if (String(rt.rows.item(k).players).indexOf(rs.rows.item(m).player) !== -1){
                        pointsModel.set(m,{points:(pointsModel.get(m).points + rt.rows.item(k).player_count)});
                    }
                }

            }
        }

        //wordModel.append({word: _zero_words, mypoints : 0, players: qsTr("All players")})
        //zeropointwords = _zero_words

    });

}
