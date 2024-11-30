import QtQuick 2.2
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "legality.js" as Mylegal
import "frequencies.js" as Myfreq
import "analyze.js" as Myan
import harbour.word.puzzle.sender 1.0
import harbour.word.puzzle.receiver 1.0

Page {
    id: page

    property int time_current: 0 // Value for the progress timer*1000
    property string currentWord:"" // Word under creation
    property string words:"" // Words, list
    property bool p_timer:false //


    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All

    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaFlickable {
        anchors.fill: parent

        // PullDownMenu and PushUpMenu must be declared in SilicaFlickable, SilicaListView or SilicaGridView
        PullDownMenu {
            MenuItem {
                text: qsTr("About")
                onClicked: pageStack.animatorPush(Qt.resolvedUrl("About.qml"))
            }
            MenuItem {
                text: qsTr("Settings")
                onClicked: pageStack.animatorPush(Qt.resolvedUrl("Settings.qml"))
            }
            MenuItem {
                text: qsTr("Results")
                onClicked: pageStack.animatorPush(Qt.resolvedUrl("ResultsPage.qml"))
            }
            MenuItem {
                text: qsTr("Results2")
                onClicked: pageStack.animatorPush(Qt.resolvedUrl("ResultsPage2.qml"))
            }
            MenuItem {
                text: qsTr("Start")
                onClicked: {
                    Myfreq.findLetters("finnish")
                    p_timer = true
                    time_current = 0
                    progress.value = max_time
                    words = ""
                    //canvaas.requestPaint()
                    if (status == 0 && player_id==1) {
                        //usend.sipadd = player_id + "," + myPlayerName + ",PLAYERS," + playerlist
                        //usend.broadcastDatagram()
                        Myan.analyze(player_id + "," + myPlayerName + ",SET," + letterlist)// If not networked to ensure
                        usend.sipadd = player_id + "," + myPlayerName + ",SET," + letterlist
                        usend.broadcastDatagram()

                    }
                    else {
                        //usend.sipadd = player_id + "," + myPlayerName + ",PLAYERS," + playerlist
                        //usend.broadcastDatagram()
                        Myan.analyze(player_id + "," + myPlayerName + ",SET," + letterlist)// If not networked to ensure
                        usend.sipadd = player_id + "," + myPlayerName + ",SET," + letterlist
                        usend.broadcastDatagram()

                    }
                    commTimer.stop
                }
            }
        }

        // Tell SilicaFlickable the height of its content.
        contentHeight: column.height

        // Place our content in a Column.  The PageHeader is always placed at the top
        // of the page, followed by our content.
        Column {
            id: column

            width: page.width
            spacing: Theme.paddingLarge
            PageHeader {
                title: qsTr("Word puzzle")
            }

            UdpSender {
                id:usend
            }
            UdpReceiver {
                id:urecei
                onRmoveChanged: {
                    //console.log("signal test " + rmove)
                    Myan.analyze(rmove)

                }
            }
            //BackgroundItem {
            //width: page.width
            //height:400
            ProgressBar {
                id:progress
                width: page.width
                maximumValue: max_time
                value:max_time
                Timer {
                    id:progress_timer
                    interval: 100
                    running: p_timer && time_current >= 0
                    onTriggered: {
                        time_current = time_current + progress_timer.interval
                        progress.value = progress.value - interval/1000
                    }
                }
            }

            BackgroundItem {
                width: page.width
                height:page.width
                GridView {
                    id:grid
                    cellWidth: page.width/4
                    cellHeight: page.width/4
                    anchors.fill: parent
                    model:letterModel
                    delegate: Rectangle {
                        id:rec2
                        width: grid.cellWidth
                        height:grid.cellHeight
                        border.width: 3
                        border.color: "black"
                        Canvas {
                            id:canvaas
                            width: grid.cellWidth; height: grid.cellHeight
                            opacity: possible == 1 && temp_possible == 1 && progress.value>0 ? 1.0: 0.2
                            contextType: "2d"
                            onPaint: {
                                var ctx = getContext("2d");
                                ctx.fillStyle = Qt.rgba(1, 1, 0, 1);
                                ctx.strokeStyle = "blue";
                                ctx.lineWidth = "4";
                                //ctx.fillRect(0, 0, width, height);
                                ctx.rect(0, 0, width, height);
                                //ctx.stroke();
                                ctx.fillStyle = "#ff0000";
                                ctx.font='150px Sail Sans Pro';
                                //ctx.font = '30px Sail Sans Pro';
                                ctx.textAlign = "center";
                                //ctx.rotation = rotation_rad
                                ctx.rotate(rotation_rad)
                                if (rotation_rad == 0) {ctx.fillText(letter, width/2, height-60);}
                                else if (rotation_rad == 1.571) {ctx.fillText(letter, width/2, -height/2+60);}
                                else if (rotation_rad == 3.142) {ctx.fillText(letter, -width/2, -height/2+60);}
                                else if (rotation_rad == 4.712) {ctx.fillText(letter, -width/2, height/2+60);}
                                ctx.restore();
                            }
                            MouseArea {
                                anchors.fill: parent
                                height: grid.cellHeight
                                width: grid.cellWidth
                                enabled: possible == 1 && temp_possible == 1 && progress.value > 0
                                onClicked: {
                                    currentWord = currentWord + letterModel.get(index).letter
                                    //if (debug) {console.log(currentWord)}
                                    possible = 0
                                    Mylegal.hideImpossible(index)
                                }
                            }
                        }
                    } // Image
                }
            }

            IconButton{
                anchors.right: parent.right
                icon.source: "image://theme/icon-m-enter-next"
                enabled: progress.value > 0
                onClicked: {
                    //if (debug) {console.log(currentWord)}
                    if (words == "") {words = words + currentWord}
                    else {words = words + "," + currentWord}
                    currentWord = ""
                    for (var i = 0; i<16; i++ ) {
                        letterModel.set(i,{"possible":1})
                        letterModel.set(i,{"temp_possible":1})
                    }
                    if (player_id > 1) {
                        usend.sipadd = player_id + "," + myPlayerName + ",WORDS," + words
                        usend.broadcastDatagram()}
                    else {
                        usend.sipadd = player_id + "," + myPlayerName + ",SET," + letterlist
                        usend.broadcastDatagram()
                        usend.sipadd = player_id + "," + myPlayerName + ",WORDS," + words
                        usend.broadcastDatagram()
                    }
                }
            }

            SectionHeader { text: qsTr("Words") }
            Text {
                font.pixelSize: Theme.fontSizeSmall
                color: Theme.primaryColor
                wrapMode: Text.WordWrap
                width: parent.width
                anchors {
                    left: parent.left
                    right: parent.right
                    margins: Theme.paddingLarge
                }
                text: {words}
            }

            SectionHeader { text: qsTr("Players") }
            Text {
                font.pixelSize: Theme.fontSizeSmall
                color: Theme.primaryColor
                wrapMode: Text.WordWrap
                width: parent.width
                anchors {
                    left: parent.left
                    right: parent.right
                    margins: Theme.paddingLarge
                }
                text: {playerlist}
            }

        }

    Timer {
        id:commTimer
        running: true
        repeat: true
        interval: 3000
        onTriggered: {
            usend.sipadd = player_id + "," + myPlayerName + ",PLAYERS," + playerlist
            usend.broadcastDatagram()

        }
    }

    }
}
