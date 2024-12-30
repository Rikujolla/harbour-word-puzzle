function findLetters(lang) {

    var _lang = []

    // Finnish frequency from the page https://fi.wikipedia.org/wiki/Suomen_kieli
    // Modifications by Riku Lahtinen
    var finnish = [
                {letter:"A",less:114}, //89->114
                {letter:"B",less:116}, //96->116
                {letter:"C",less:118}, //108->118
                {letter:"D",less:130},
                {letter:"E",less:256}, //218->256
                {letter:"F",less:260}, //234->260
                {letter:"G",less:264}, //246->264
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
                {letter:"V",less:958}, //951->958
                {letter:"W",less:979}, //969->979
                {letter:"X",less:980}, //971->980
                {letter:"Y",less:981},
                {letter:"Ä",less:997},
                {letter:"Ö",less:999}
            ];
    // English frequency from the page https://en.wikipedia.org/wiki/English_language
    var english = [
                {letter:"A",less:75},
                {letter:"B",less:91},
                {letter:"C",less:123},
                {letter:"D",less:162},
                {letter:"E",less:267},
                {letter:"F",less:286},
                {letter:"G",less:322},
                {letter:"H",less:361},
                {letter:"I",less:475},
                {letter:"J",less:477},
                {letter:"K",less:501},
                {letter:"L",less:541},
                {letter:"M",less:557},
                {letter:"N",less:631},
                {letter:"O",less:698},
                {letter:"P",less:734},
                {letter:"R",less:791},
                {letter:"S",less:852},
                {letter:"T",less:929},
                {letter:"U",less:950},
                {letter:"V",less:958},
                {letter:"W",less:987},
                {letter:"X",less:989},
                {letter:"Y",less:998},
                {letter:"Z",less:999}
            ];

    // Swedish frequency from the page https://sv.wikipedia.org/wiki/Sverige
    var swedish = [
                {letter:"A",less:76},
                {letter:"B",less:89},
                {letter:"C",less:107},
                {letter:"D",less:149},
                {letter:"E",less:240},
                {letter:"F",less:254},
                {letter:"G",less:289},
                {letter:"H",less:314},
                {letter:"I",less:423},
                {letter:"J",less:427},
                {letter:"K",less:473},
                {letter:"L",less:508},
                {letter:"M",less:530},
                {letter:"N",less:588},
                {letter:"O",less:635},
                {letter:"P",less:674},
                {letter:"R",less:746},
                {letter:"S",less:821},
                {letter:"T",less:903},
                {letter:"U",less:917},
                {letter:"V",less:945},
                {letter:"W",less:977},
                {letter:"X",less:978},
                {letter:"Y",less:983},
                {letter:"Å",less:987},
                {letter:"Ä",less:994},
                {letter:"Ö",less:999}
            ];

    // Setting letters
    if (lang == "english"){
    _lang = english
    }
    else if (lang == "finnish") {
        _lang = finnish
    }
    else if (lang == "swedish") {
        _lang = swedish
    }
    else {
        _lang = finnish
    }

    letterlist = ""
    letterModel.clear();
    for (var i = 0;i < 16; i++) {
        var rand = Math.random() * (_lang[_lang.length-1].less);
        var _letter = ""
        var _notfound = true
        for (var j = 0;j<_lang.length-1;j++) {
            if (j == 0 && rand < _lang[j].less && _notfound) {
                _letter = _lang[j].letter
                _notfound = false
            }
            else if (j > 0 && rand > _lang[j-1].less && rand < _lang[j].less && _notfound) {
                _letter = _lang[j].letter
                _notfound = false
            }
        }
        if (_notfound){_letter = _lang[_lang.length-1].letter}
        letterModel.set(i,{"letter":_letter})

        letterModel.set(i,{"possible":0})
        letterModel.set(i,{"temp_possible":1})

        var rand_rot = Math.floor(Math.random()* 4)
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
