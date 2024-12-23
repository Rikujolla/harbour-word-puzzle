function findLetters(lang) {

    // Finnish frequency from the page https://fi.wikipedia.org/wiki/Suomen_kieli
    var finnish = [
                {letter:"A",less:114}, //89->114
                {letter:"B",less:116}, //96->116
                {letter:"C",less:118}, //108->118
                {letter:"D",less:130},
                {letter:"E",less:262}, //218->262
                {letter:"F",less:264}, //234->264
                {letter:"G",less:266}, //246->266
                {letter:"H",less:268},
                {letter:"I",less:414},
                {letter:"J",less:426},
                {letter:"K",less:484},
                {letter:"L",less:526},
                {letter:"M",less:550},
                {letter:"N",less:614},
                {letter:"O",less:670},
                {letter:"P",less:705},
                {letter:"R",less:739},
                {letter:"S",less:809},
                {letter:"T",less:898},
                {letter:"U",less:934},
                {letter:"V",less:960}, //951->960
                {letter:"W",less:979}, //969->979
                {letter:"X",less:980}, //971->980
                {letter:"Y",less:981},
                {letter:"Ä",less:997},
                {letter:"Ö",less:999}
            ];

    // Swedish frequency from the page https://sv.wikipedia.org/wiki/Sverige
    var swedish = [
                {letter:"A",less:76},
                {letter:"D",less:118},
                {letter:"E",less:208},
                {letter:"G",less:244},
                {letter:"H",less:269},
                {letter:"I",less:378},
                {letter:"K",less:424},
                {letter:"L",less:459},
                {letter:"M",less:481},
                {letter:"N",less:539},
                {letter:"O",less:586},
                {letter:"P",less:625},
                {letter:"R",less:697},
                {letter:"S",less:772},
                {letter:"T",less:854},
                {letter:"V",less:883},
                {letter:"W",less:914}
            ];

    // Setting letters
    letterlist = ""
    letterModel.clear();
    for (var i = 0;i < 16; i++) {
        var rand = Math.random() * (finnish[finnish.length-1].less);
        var _letter = ""
        var _notfound = true
        for (var j = 0;j<finnish.length-1;j++) {
            if (j == 0 && rand < finnish[j].less && _notfound) {
                _letter = finnish[j].letter
                _notfound = false
            }
            else if (j > 0 && rand > finnish[j-1].less && rand < finnish[j].less && _notfound) {
                _letter = finnish[j].letter
                _notfound = false
            }
        }
        if (_notfound){_letter = finnish[finnish.length-1].letter}
        letterModel.set(i,{"letter":_letter})

        letterModel.set(i,{"possible":0})
        letterModel.set(i,{"temp_possible":1})

        var rand_rot = Math.floor(Math.random()* 4)
        //if (debug){console.log(rand_rot)}
        if (rand_rot==0) {letterModel.set(i,{"rotation_rad":0})}
        else if (rand_rot == 1) {letterModel.set(i,{"rotation_rad":1.571})}
        else if (rand_rot == 2) {letterModel.set(i,{"rotation_rad":3.142})}
        else if (rand_rot == 3) {letterModel.set(i,{"rotation_rad":4.712})}

        if (letterlist == "") {
            letterlist = letterModel.get(i).letter + "," + letterModel.get(i).rotation_rad
        }
        else {
            letterlist = letterlist + "," + letterModel.get(i).letter + "," + letterModel.get(i).rotation_rad
        }
    }

    if (debug) {console.log(letterlist)}

}
