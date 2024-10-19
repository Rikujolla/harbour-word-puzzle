import QtQuick 2.0
import Sailfish.Silica 1.0
import "pages"

ApplicationWindow {
    initialPage: Component { PuzzlePage { } }
    cover: Qt.resolvedUrl("cover/CoverPage.qml")
    allowedOrientations: defaultAllowedOrientations
    property bool developer: true //Developer setting to prevent console logs in production

    ListModel {
        id: letterModel
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "A"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "B"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "C"
            possible: 1
            temp_possible : 1
        }
        ListElement {
            letter: "D"
            possible: 1
            temp_possible : 1
        }
    }

}
