function analyze(_move) {

    // Splitting the message to array
    var message = _move.split(",");
    var _letterlist = _move.split(",");
    var _playerlist = playerlist.split(",");
    var found = false

    if (message[2] == "PLAYERS") {
        if (message[1] == ""){
            if (debug) {console.log("Some player has no name")}
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
    }

    if (message[2] == "SET") {

        if (debug) {console.log("analyze_SET", _letterlist[2], letterlist)}
        letterModel.clear();
        for (i=3;i<_letterlist.length-1;i++){
            if ((i-3)%2==0){
                letterModel.set((i-3)/2,{"letter":_letterlist[i]})
                letterModel.set((i-3)/2,{"rotation_rad":parseFloat(_letterlist[i+1])})
                letterModel.set((i-3)/2,{"possible":1})
                letterModel.set((i-3)/2,{"temp_possible":1})

            }
        }
        p_timer = true
        progress.value = max_time
        currentWord = ""
        midfield.text = currentWord
        myWords = ""
        words = ""
    }

    if (message[2] == "WORDS") {
        if (debug) {console.log("Words", message[2], message)}
        saveWords(_move)
    }

    if (message[2] == "DOWNVOTE") {
        if (debug) {console.log("Downvote", message[2], message)}
        deleteWord(message[3], message[1])
    }

    if (message[2] == "REFRESH") {
        if (debug) {console.log("Refresh", message[2], message)}
        fillResults()
    }
}

function saveLetters(ind, lett, rotat, poss, tposs){
    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);
    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Letter (id INTEGER PRIMARY KEY, letter TEXT, rotation REAL, possible INTEGER, temp_possible INTEGER)');
        tx.executeSql('INSERT OR REPLACE INTO Letter (id, letter, rotation, possible, temp_possible) VALUES (?, ?, ?, ?, ?)', [ind,lett,rotat, poss, tposs]);
    })
};

function loadLetters() {
    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);
    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Letter (id INTEGER PRIMARY KEY, letter TEXT, rotation REAL, possible INTEGER, temp_possible INTEGER)');
        var rs = tx.executeSql('SELECT * FROM Letter');
        letterModel.clear();
        for (var i = 0; i < rs.rows.length; i++) {
            letterModel.set(i,{"letter":rs.rows.item(i).letter})
            letterModel.set(i,{"rotation_rad":rs.rows.item(i).rotation})
            letterModel.set(i,{"possible":rs.rows.item(i).possible})
            letterModel.set(i,{"temp_possible":rs.rows.item(i).temp_possible})
        }
    })
};

function saveWords(msg) {

    var _msg = msg.split(",");

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');

        // Check if the row already exists
        var rs = tx.executeSql('SELECT * FROM Words WHERE id = ? AND player = ?', [_msg[0], _msg[1]]);
        if (rs.rows.length > 0) {
            if (debug) {console.log("Updating existing row...")};
            // Update the message if the row exists
            tx.executeSql('UPDATE Words SET message = ? WHERE id = ? AND player = ?', [msg, _msg[0], _msg[1]]);
        } else {
            if (debug) {console.log("Inserting new row...")};
            // Insert a new row if it doesn't exist
            tx.executeSql('INSERT INTO Words (id, player, message) VALUES (?, ?, ?)', [_msg[0], _msg[1], msg]);
        }
    });
}

function fillResults() {
    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create tables if they do not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Results (word TEXT, player TEXT, downvote INTEGER, UNIQUE(word, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Votes (word TEXT, player TEXT, UNIQUE(word, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Abandon (word TEXT, UNIQUE(word))');

        zeropointwords = "";

        var _players = ""; // Adding only the players who are in Words table
        pointsModel.clear(); // First clear pointsModel

        var rs = tx.executeSql('SELECT * FROM Words');
        for (var i = 0; i < rs.rows.length; i++) {
            pointsModel.append({player: rs.rows.item(i).player, points: 0});

            var __msg = rs.rows.item(i).message.split(",");
            for (var j = 3; j < __msg.length; j++) {
                tx.executeSql('INSERT OR IGNORE INTO Results (word, player, downvote) VALUES (?, ?, ?)', [__msg[j], __msg[1], 0]);
            }
        }

        _players = playerlist.split(",");
        var _pla_length = rs.rows.length; // Number of players
        wordModel.clear();

        // Combined query for points calculation and filtering valid words
        var combinedQuery = tx.executeSql(
                    "SELECT r.word AS word, " +
                    "GROUP_CONCAT(DISTINCT r.player) AS players, " + // Removed second argument from GROUP_CONCAT
                    "(? - COUNT(DISTINCT r.player)) AS player_points, " +
                    "SUM(CASE WHEN v.player IS NOT NULL THEN 1 ELSE 0 END) AS total_downvotes " +
                    "FROM Results r " +
                    "LEFT JOIN Votes v ON r.word = v.word " +
                    "GROUP BY r.word " +
                    "ORDER BY r.word ASC",
                    [_pla_length]
                    );

        for (var k = 0; k < combinedQuery.rows.length; k++) {
            var word = combinedQuery.rows.item(k).word;
            var players = combinedQuery.rows.item(k).players;
            var playerPoints = combinedQuery.rows.item(k).player_points;
            var totalDownvotes = combinedQuery.rows.item(k).total_downvotes;


            if (word.length<3) {}
            // If word belongs to all the players, add to zeropointslist
            else if (players.split(",").length == _pla_length && _pla_length > 1) {
                zeropointwords += (zeropointwords ? ", " : "") + word;
            }
            // Check if the word is valid based on downvotes, sinle player mode
            else if (totalDownvotes <= Math.floor(_pla_length / 2) && _pla_length < 2) {
                // Append valid words to wordModel
                wordModel.append({word: word, mypoints: playerPoints + 1, players: players});
                //}

                // Update points for each player who contributed to this word
                for (var m = 0; m < rs.rows.length; m++) {
                    if (String(players).indexOf(rs.rows.item(m).player) !== -1) {
                        pointsModel.set(m, {points: pointsModel.get(m).points + playerPoints + 1});
                    }
                }
            }
            // Multiplayermode
            else if (totalDownvotes < Math.floor(_pla_length / 2)){

                // Append valid words to wordModel
                if (totalDownvotes > 0){
                    wordModel.append({word: word, mypoints: playerPoints, players: players, colorerr: true});
                }
                else {
                    wordModel.append({word: word, mypoints: playerPoints, players: players});
                }

                // Update points for each player who contributed to this word
                for (m = 0; m < rs.rows.length; m++) {
                    if (String(players).indexOf(rs.rows.item(m).player) !== -1) {
                        pointsModel.set(m, {points: pointsModel.get(m).points + playerPoints});
                    }
                }
            }

            else {
                // Words with excessive downvotes can be logged or handled separately if needed
                tx.executeSql('INSERT OR IGNORE INTO Abandon (word) VALUES (?)', [word]);
                var abandonQuery = tx.executeSql('SELECT * FROM Abandon');
                vastedwords = ""
                for (m = 0; m < abandonQuery.rows.length; m++) {
                    vastedwords += (vastedwords ? ", " : "") + abandonQuery.rows.item(m).word;
                }
            }
        }
    });

    // Assuming pointsModel has been populated already
    var pointsArray = [];

    // Extract data from pointsModel into an array
    for (var i = 0; i < pointsModel.count; i++) {
        var item = pointsModel.get(i);
        pointsArray.push({player: item.player, points: item.points});
    }

    // Sort the array in descending order by points
    pointsArray.sort(function(a, b) {
        return b.points - a.points; // Descending order
    });

    // Clear the pointsModel
    pointsModel.clear();

    // Re-populate pointsModel with sorted data
    for (var j = 0; j < pointsArray.length; j++) {
        pointsModel.append(pointsArray[j]);
    }

}

function deleteWord(wrd, playr) {

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Results (word TEXT, player TEXT, downvote INTEGER, UNIQUE(word, player))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS Votes (word TEXT, player TEXT, UNIQUE(word, player))');
        tx.executeSql('INSERT OR IGNORE INTO Votes (word, player) VALUES (?, ?)', [wrd, playr]);
        if (debug) {console.log(wrd,playr)}
    })
}
