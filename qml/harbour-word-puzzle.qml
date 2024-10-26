import QtQuick 2.0
import Sailfish.Silica 1.0
import "pages"
import "pages/frequencies.js" as Myfreq


ApplicationWindow {
    initialPage: Component { PuzzlePage { } }
    cover: Qt.resolvedUrl("cover/CoverPage.qml")
    allowedOrientations: defaultAllowedOrientations
    property bool developer: true //Developer setting to prevent console logs in production
    property int max_time : 120

    ListModel {
        id: letterModel
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        /*ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
            rotation_rad: 1.571
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
            rotation_rad: 3.142
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
            rotation_rad: 4.712
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
            rotation_rad: 0
        }*/
    }
    Component.onCompleted: {
    Myfreq.findLetters("finnish")
    }
}
