import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "pages"
import "pages/settings.js" as Mysets
import "pages/frequencies.js" as Myfreq
import "pages/analyze.js" as Myan
import harbour.word.puzzle.sender 1.0
import harbour.word.puzzle.receiver 1.0


ApplicationWindow {
    initialPage: Component { PuzzlePage { } }
    cover: Qt.resolvedUrl("cover/CoverPage.qml")
    allowedOrientations: Orientation.Portrait

    // Global variables
    property int max_time : 120
    property string myPlayerName:""
    property string selectedLanguage: "finnish"
    property int player_id:1 // Default id for playleader 1
    property int numberOfPlayers:1
    property bool debug: false // In releases, set this false
    property string playerlist: ""
    property string letterlist:"" //Perhaps empty string needs to be changed
    property string zeropointwords: "" //Words that all the players had giving zero points
    property string vastedwords:""
    property string myWords:"" //For display to enable wordWrap
    property bool p_timer:false //
    property int errortimer: 60000 // To stop error timer
    property var languages: [{lng:"english", lngtr:qsTr("English")},
        {lng:"finnish", lngtr:qsTr("Finnish")},
        {lng:"swedish", lngtr:qsTr("Swedish")}
    ]


    ListModel {
        id: letterModel
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
    }

    ListModel {
        id: wordModel
        ListElement {
            word: "ABC"
            mypoints : 1
            players: "P1, P2, P3"
            colorerr: false
        }
    }

    ListModel {
        id:pointsModel
        ListElement {
            player:""
            points:0
        }
    }
    ListModel {
        id:languageModel
        /*ListElement {
            language:"english"
            selected: false
            colorsel:"notsel"
        }*/
        ListElement {
            language:"finnish"
            selected: true
            colorsel:"sel"
        }
        /*ListElement {
            language:"swedish"
            selected: false
            colorsel:"notsel"
        }*/
    }

    UdpSender {
        id:usend
    }

    Component.onCompleted: {
        Mysets.clearTables()
        Mysets.loadSettings()
        Myfreq.findLetters(selectedLanguage)
    }
}
