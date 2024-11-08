// The function hides impossible letters.
function hideImpossible(ind) {

    var sarake = ind%4 + 1
    var rivi = (ind-ind%4)/4 + 1
    if (debug) {console.log("sarake " + sarake)}
    if (debug) {console.log("rivi " + rivi)}

    for (var i = 0; i<16; i++ ) {
        var sarake_i = i%4 + 1
        var rivi_i = (i-i%4)/4 + 1

        if (Math.abs(rivi_i-rivi) > 1) {
            letterModel.set(i,{"temp_possible":0})
        }
        //else if (Math.abs(sarake_i-sarake) == 1 && Math.abs(rivi_i-rivi) == 1) {
        //    letterModel.set(i,{"temp_possible":0})
        //}
        else if (Math.abs(sarake_i-sarake) > 1) {
            letterModel.set(i,{"temp_possible":0})
        }
        else {
            letterModel.set(i,{"temp_possible":1})
        }
    }
}
