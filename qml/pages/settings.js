function clearTables () {
    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);
    db.transaction(
                function(tx) {
                    // Create the table, if not existing
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Words (id TEXT, player TEXT, message TEXT, PRIMARY KEY (id, player))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Results (word TEXT, player TEXT, downvote INTEGER, UNIQUE(word, player))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Votes (word TEXT, player TEXT, UNIQUE(word, player))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Abandon (word TEXT, UNIQUE(word))');
                    tx.executeSql('DELETE FROM Words');
                    tx.executeSql('DELETE FROM Results');
                    tx.executeSql('DELETE FROM Votes');
                    tx.executeSql('DELETE FROM Abandon');
                    playerlist = ""
                    zeropointwords = ""
                    myWords = ""
                    vastedwords = ""
                }
                )
}

function saveSettings() {

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(
                function(tx) {
                    // Create the table, if not existing
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Settings(name TEXT, subname TEXT, valte TEXT, valre REAL, valint INTEGER)');

                    // myPlayerName
                    var rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', 'myPlayerName');
                    if (rs.rows.length > 0 && myPlayerName.length>0) {tx.executeSql('UPDATE Settings SET valte=? WHERE name=?', [myPlayerName, 'myPlayerName'])}
                    // If no players add active player
                    else {tx.executeSql('INSERT INTO Settings VALUES(?, ?, ?, ?, ?)', [ 'myPlayerName', '', myPlayerName, '', '' ])}
                    // player_id
                    rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', 'player_id');
                    if (rs.rows.length > 0) {tx.executeSql('UPDATE Settings SET valint=? WHERE name=?', [player_id, 'player_id'])}
                    // If no players add active player
                    else {tx.executeSql('INSERT INTO Settings VALUES(?, ?, ?, ?, ?)', [ 'player_id', '', '', '', player_id ])}
                    // playMode
                    rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', 'playMode');
                    if (rs.rows.length > 0) {tx.executeSql('UPDATE Settings SET valte=? WHERE name=?', [playMode, 'playMode'])}
                    // If no players add active player
                    else {tx.executeSql('INSERT INTO Settings VALUES(?, ?, ?, ?, ?)', [ 'playMode', '', playMode, '', '' ])}

                }
                )
}

function loadSettings() {

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(
                function(tx) {
                    // Create the table, if not existing
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Settings(name TEXT, subname TEXT, valte TEXT, valre REAL, valint INTEGER)');

                    // myPlayerName
                    var rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', ['myPlayerName']);
                    if (rs.rows.length > 0) {myPlayerName = rs.rows.item(0).valte}
                    else {myPlayerName = "P" + Math.floor(Math.random() * 99 + 1);}
                    // player_id
                    rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', ['player_id']);
                    if (rs.rows.length > 0) {player_id = rs.rows.item(0).valint}
                    else {}
                    // playMode
                    rs = tx.executeSql('SELECT * FROM Settings WHERE name = ?', ['playMode']);
                    if (rs.rows.length > 0) {playMode = rs.rows.item(0).valte}
                    else {}
                }
                )
}
