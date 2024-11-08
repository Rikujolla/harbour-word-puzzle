function findLetters(lang) {

    // Finnish frequency from the page https://fi.wikipedia.org/wiki/Suomen_kieli
    // Swedish frequency from the page https://sv.wikipedia.org/wiki/Sverige
    var finnish = [
    {letter:"A",less:89},
    {letter:"D",less:112},
    {letter:"E",less:200},
    {letter:"H",less:222},
    {letter:"I",less:368},
    {letter:"K",less:426},
    {letter:"L",less:468},
    {letter:"M",less:492},
    {letter:"N",less:556},
    {letter:"O",less:612},
    {letter:"P",less:647},
    {letter:"R",less:680},
    {letter:"S",less:751},
    {letter:"T",less:840},
    {letter:"U",less:876}
    ];

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

    console.log(finnish.length, finnish[finnish.length-1].less +1)

    for (var i = 0;i < 16; i++) {
        var rand = Math.random() * (finnish[finnish.length-1].less +1);
        for (var j = 0;j<finnish.length-1;j++) {
            if (finnish[j+1].less > rand) {
                letterModel.set(i,{"letter":finnish[j].letter})
                break;
            }
        }

        letterModel.set(i,{"possible":1})
        letterModel.set(i,{"temp_possible":1})

        var rand_rot = Math.floor(Math.random()* 4)
        //if (debug){console.log(rand_rot)}
        if (rand_rot==0) {letterModel.set(i,{"rotation_rad":0})}
        else if (rand_rot == 1) {letterModel.set(i,{"rotation_rad":1.571})}
        else if (rand_rot == 2) {letterModel.set(i,{"rotation_rad":3.142})}
        else if (rand_rot == 3) {letterModel.set(i,{"rotation_rad":4.712})}

    }

}
