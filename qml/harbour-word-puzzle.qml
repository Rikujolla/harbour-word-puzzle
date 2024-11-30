import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "pages"
import "pages/settings.js" as Mysets
import "pages/frequencies.js" as Myfreq


ApplicationWindow {
    initialPage: Component { PuzzlePage { } }
    cover: Qt.resolvedUrl("cover/CoverPage.qml")
    allowedOrientations: Orientation.Portrait
    //_defaultPageOrientations: Orientation.Portrait
    // Global variables
    property int max_time : 120

    property string piePat_up: "images/" // Piece sub path
    property string piePat: "images/piece0/" // Piece sub path
    property string myPlayerName:""
    property int myPort: 45454
    property string playMode: "othDevice"
    property string cardPositionString:""
    property string cardMoveString:""
    property int player_id:1 // Default id for playleader 1
    property int numberOfPlayers:2
    property int currentPlayer:1
    property int roundNumber:0 //Round number (same for every player on the same round)
    property int turnNumber: 0 // Turn number (depending on amount of the players)
    property bool debug: true // In releases, set this false
    property string playerlist: ""
    property int status: 0 //0 = not started, 1 = search players or join the play
    property string letterlist:"" //Perhaps empty string needs to be changed
    property string zeropointwords: "" //Words that all the players had giving zero points

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
        }
    }

    ListModel {
        id:pointsModel
        ListElement {
            player:""
            points:0
        }
    }

    Component.onCompleted: {
        Myfreq.findLetters("finnish")
        Mysets.clearTables()
        Mysets.loadSettings()

    }
}
