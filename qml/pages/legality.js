// The function hides impossible letters.
function hideImpossible(ind) {

    var sarake = ind%4 + 1
    var rivi = (ind-ind%4)/4 + 1

    for (var i = 0; i<16; i++ ) {
        var sarake_i = i%4 + 1
        var rivi_i = (i-i%4)/4 + 1

        if (Math.abs(rivi_i-rivi) > 1) {
            letterModel.set(i,{"temp_possible":0})
            //Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, 0)
        }
        else if (Math.abs(sarake_i-sarake) > 1) {
            letterModel.set(i,{"temp_possible":0})
            //Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, 0)
        }
        else {
            letterModel.set(i,{"temp_possible":1})
            //Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, 1)
        }
    }
}

function addWord (_word) {

    var db = LocalStorage.openDatabaseSync("WordPuzzleDB", "1.0", "Memory database", 1000000);

    db.transaction(function (tx) {
        // Create the table if it does not exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS Results (word TEXT, player TEXT, downvote INTEGER, UNIQUE(word, player))');
        var rs = tx.executeSql('SELECT * FROM Results WHERE word = ? AND player = ?',[_word, myPlayerName]);
        // Add word if not duplicate
        if (rs.rows.length == 0 && _word != "" && _word.length>2){
            tx.executeSql('INSERT INTO Results (word, player) VALUES (?, ?)', [_word, myPlayerName]);
            if (words == "") {
                words = _word
                myWords = _word //For display to enable wordWrap
            }
            else {
                words = words + "," + _word
                myWords = myWords + ", " + _word //For display to enable wordWrap
            }
        }
    })

}
