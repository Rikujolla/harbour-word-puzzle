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

    // Dutch frequency from the page https://nl.wikipedia.org/wiki/Nederlands
    var dutch = [
                {letter:"A",less:76},
                {letter:"B",less:92},
                {letter:"C",less:107},
                {letter:"D",less:172},
                {letter:"E",less:309},
                {letter:"F",less:318},
                {letter:"G",less:349},
                {letter:"H",less:376},
                {letter:"I",less:478},
                {letter:"J",less:485},
                {letter:"K",less:521},
                {letter:"L",less:569},
                {letter:"M",less:583},
                {letter:"N",less:670},
                {letter:"O",less:720},
                {letter:"P",less:753},
                {letter:"R",less:811},
                {letter:"S",less:863},
                {letter:"T",less:930},
                {letter:"U",less:944},
                {letter:"V",less:958},
                {letter:"W",less:992},
                {letter:"X",less:994},
                {letter:"Y",less:995},
                {letter:"Z",less:1000}
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
    // French frequency from the page https://fr.wikipedia.org/wiki/Fran%C3%A7ais
    var french = [
                {letter:"A",less:88},
                {letter:"B",less:97},
                {letter:"C",less:136},
                {letter:"D",less:174},
                {letter:"E",less:282},
                {letter:"F",less:311},
                {letter:"G",less:337},
                {letter:"H",less:359},
                {letter:"I",less:466},
                {letter:"J",less:468},
                {letter:"K",less:488},
                {letter:"L",less:532},
                {letter:"M",less:551},
                {letter:"N",less:614},
                {letter:"O",less:667},
                {letter:"P",less:708},
                {letter:"Q",less:713},
                {letter:"R",less:780},
                {letter:"S",less:841},
                {letter:"T",less:909},
                {letter:"U",less:943},
                {letter:"V",less:952},
                {letter:"W",less:976},
                {letter:"X",less:980},
                {letter:"Y",less:983},
                {letter:"À",less:984},
                {letter:"Ç",less:987},
                {letter:"É",less:996},
                {letter:"È",less:998}
            ];

    // German frequency from the page https://de.wikipedia.org/wiki/Deutsche_Sprache
    var german = [
                {letter:"A",less:61},
                {letter:"B",less:78},
                {letter:"C",less:119},
                {letter:"D",less:177},
                {letter:"E",less:313},
                {letter:"F",less:323},
                {letter:"G",less:352},
                {letter:"H",less:403},
                {letter:"I",less:509},
                {letter:"J",less:511},
                {letter:"K",less:538},
                {letter:"L",less:566},
                {letter:"M",less:584},
                {letter:"N",less:649},
                {letter:"O",less:681},
                {letter:"P",less:715},
                {letter:"R",less:778},
                {letter:"S",less:844},
                {letter:"T",less:916},
                {letter:"U",less:948},
                {letter:"V",less:954},
                {letter:"W",less:982},
                {letter:"X",less:984},
                {letter:"Y",less:986},
                {letter:"Z",less:992},
                {letter:"Ä",less:995},
                {letter:"Ö",less:997},
                {letter:"Ü",less:999}
            ];

    // Italian frequency from the page https://it.wikipedia.org/wiki/Lingua_italiana
    var italian = [
                {letter:"A",less:104},
                {letter:"B",less:115},
                {letter:"C",less:146},
                {letter:"D",less:186},
                {letter:"E",less:271},
                {letter:"F",less:281},
                {letter:"G",less:312},
                {letter:"H",less:329},
                {letter:"I",less:492},
                {letter:"K",less:517},
                {letter:"L",less:574},
                {letter:"M",less:589},
                {letter:"N",less:646},
                {letter:"O",less:716},
                {letter:"P",less:754},
                {letter:"Q",less:755},
                {letter:"R",less:804},
                {letter:"S",less:847},
                {letter:"T",less:934},
                {letter:"U",less:956},
                {letter:"V",less:965},
                {letter:"W",less:991},
                {letter:"X",less:992},
                {letter:"Y",less:993},
                {letter:"Z",less:999}
            ];

    // Portuguese frequency from the page https://pt.wikipedia.org/wiki/L%C3%ADngua_portuguesa
    var portuguese = [
                {letter:"A",less:102},
                {letter:"B",less:118},
                {letter:"C",less:156},
                {letter:"D",less:207},
                {letter:"E",less:289},
                {letter:"F",less:300},
                {letter:"G",less:335},
                {letter:"H",less:355},
                {letter:"I",less:461},
                {letter:"J",less:463},
                {letter:"K",less:487},
                {letter:"L",less:519},
                {letter:"M",less:541},
                {letter:"N",less:584},
                {letter:"O",less:662},
                {letter:"P",less:717},
                {letter:"Q",less:720},
                {letter:"R",less:774},
                {letter:"S",less:830},
                {letter:"T",less:906},
                {letter:"U",less:943},
                {letter:"V",less:951},
                {letter:"W",less:978},
                {letter:"X",less:981},
                {letter:"Y",less:982},
                {letter:"Z",less:984},
                {letter:"Á",less:986},
                {letter:"Ã",less:988},
                {letter:"Ç",less:990},
                {letter:"É",less:992},
                {letter:"Ê",less:994},
                {letter:"Í",less:997}
            ];

    // Russian frequency from the pagehttps://ru.wikipedia.org/wiki/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA
    var russian = [
                {letter:"А",less:77},
                {letter:"Б",less:88},
                {letter:"В",less:130},
                {letter:"Г",less:151},
                {letter:"Д",less:177},
                {letter:"Е",less:253},
                {letter:"Ё",less:255},
                {letter:"Ж",less:261},
                {letter:"З",less:279},
                {letter:"И",less:363},
                {letter:"Й",less:379},
                {letter:"К",less:424},
                {letter:"Л",less:465},
                {letter:"М",less:493},
                {letter:"Н",less:558},
                {letter:"О",less:658},
                {letter:"П",less:680},
                {letter:"Р",less:735},
                {letter:"С",less:807},
                {letter:"Т",less:858},
                {letter:"У",less:884},
                {letter:"Ф",less:891},
                {letter:"Х",less:901},
                {letter:"Ц",less:907},
                {letter:"Ч",less:919},
                {letter:"Ш",less:923},
                {letter:"Щ",less:927},
                {letter:"Ы",less:950},
                {letter:"Ь",less:963},
                {letter:"Э",less:965},
                {letter:"Ю",less:970},
                {letter:"Я",less:1000}
            ];

    // Spanish frequency from the page https://es.wikipedia.org/wiki/Idioma_espa%C3%B1ol
    var spanish = [
                {letter:"A",less:105},
                {letter:"B",less:122},
                {letter:"C",less:166},
                {letter:"D",less:212},
                {letter:"E",less:324},
                {letter:"F",less:335},
                {letter:"G",less:359},
                {letter:"H",less:379},
                {letter:"I",less:480},
                {letter:"J",less:482},
                {letter:"K",less:501},
                {letter:"L",less:547},
                {letter:"M",less:567},
                {letter:"N",less:623},
                {letter:"O",less:694},
                {letter:"P",less:736},
                {letter:"Q",less:738},
                {letter:"R",less:787},
                {letter:"S",less:857},
                {letter:"T",less:918},
                {letter:"U",less:942},
                {letter:"V",less:951},
                {letter:"W",less:975},
                {letter:"X",less:978},
                {letter:"Y",less:983},
                {letter:"Z",less:985},
                {letter:"Ñ",less:989},
                {letter:"Á",less:991},
                {letter:"É",less:993},
                {letter:"Í",less:996},
                {letter:"Ó",less:999}
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
    // Ukrainian frequency from the page https://uk.wikipedia.org/wiki/%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0_%D0%BC%D0%BE%D0%B2%D0%B0
    var ukrainian = [
                {letter:"А",less:84},
                {letter:"Б",less:93},
                {letter:"В",less:150},
                {letter:"Г",less:163},
                {letter:"Д",less:190},
                {letter:"Е",less:229},
                {letter:"Є",less:233},
                {letter:"Ж",less:240},
                {letter:"З",less:255},
                {letter:"И",less:310},
                {letter:"І",less:370},
                {letter:"Ї",less:389},
                {letter:"Й",less:401},
                {letter:"К",less:455},
                {letter:"Л",less:487},
                {letter:"М",less:518},
                {letter:"Н",less:598},
                {letter:"О",less:692},
                {letter:"П",less:717},
                {letter:"Р",less:772},
                {letter:"С",less:826},
                {letter:"Т",less:870},
                {letter:"У",less:906},
                {letter:"Ф",less:910},
                {letter:"Х",less:921},
                {letter:"Ц",less:929},
                {letter:"Ч",less:940},
                {letter:"Ш",less:945},
                {letter:"Щ",less:947},
                {letter:"Ь",less:972},
                {letter:"Ю",less:979},
                {letter:"Я",less:1000}
            ];


    // Setting letters
    if (lang === "dutch"){
        _lang = dutch
    }
    else if (lang === "english") {
        _lang = english
    }
    else if (lang === "finnish") {
        _lang = finnish
    }
    else if (lang === "french") {
        _lang = french
    }
    else if (lang === "german") {
        _lang = german
    }
    else if (lang === "italian") {
        _lang = italian
    }
    else if (lang === "portuguese") {
        _lang = portuguese
    }
    else if (lang === "russian") {
        _lang = russian
    }
    else if (lang === "spanish") {
        _lang = spanish
    }
    else if (lang === "swedish") {
        _lang = swedish
    }
    else if (lang === "ukrainian") {
        _lang = ukrainian
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
        Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, letterModel.get(i).temp_possible)
    }

    if (debug) {console.log(letterlist)}

}

