import QtQuick 2.2
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "legality.js" as Mylegal
import "frequencies.js" as Myfreq
import "analyze.js" as Myan
import "settings.js" as Mysets
import harbour.word.puzzle.sender 1.0
import harbour.word.puzzle.receiver 1.0

Page {
    id: page
    onStatusChanged:{
        // Updates lettergridview when visiting e.g. at results page
        if (page.status === 2) {Myan.loadLetters()}
        else if (page.status === 3){
            for (var i = 0; i < 16; i++) {
                Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, letterModel.get(i).temp_possible)
            }
        }
    }
    onVisibleChanged: {
        // Updates lettergridview when minimized and restored
        if (visible){Myan.loadLetters()}
        else if (letterModel.count == 16){
            for (var i = 0; i < 16; i++) {
                Myan.saveLetters(i,letterModel.get(i).letter, letterModel.get(i).rotation_rad, letterModel.get(i).possible, letterModel.get(i).temp_possible)
            }
        }
    }

    property string currentWord:"" // Word under creation
    property string words:"" // Words, list


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
                text: qsTr("Start")
                onClicked: {
                    Myfreq.findLetters(selectedLanguage)
                    p_timer = true
                    progress.value = max_time
                    words = ""
                    myWords = ""
                    currentWord = ""
                    if (usend.cmove != "NO_CONNECTION") {
                        usend.sipadd = player_id + "," + myPlayerName + ",SET," + letterlist
                        usend.broadcastDatagram()
                    }
                    else {
                        Myan.analyze(player_id + "," + myPlayerName + ",SET," + letterlist)// If not networked to ensure
                    }
                    commTimer.stop
                    //Mysets.clearTables() not needed here

                }
            }
            MenuItem {
                text: qsTr("Results")
                visible: progress.value < max_time
                onClicked: {
                    usend.sipadd = player_id + "," + myPlayerName + ",WORDS," + words
                    usend.broadcastDatagram()
                    zeropointwords = "" //REMOVE??
                    pageStack.animatorPush(Qt.resolvedUrl("ResultsPage.qml"))
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

            UdpReceiver {
                id:urecei
                onRmoveChanged: {
                    Myan.analyze(rmove)
                }
            }

            ProgressBar {
                id:progress
                width: page.width
                maximumValue: max_time
                value:max_time
                Timer {
                    id:progress_timer
                    interval: 100
                    repeat:true
                    running: p_timer
                    onTriggered: {
                        progress.value = progress.value - interval/1000
                    }
                }
            }

            BackgroundItem {
                width: page.width*0.9
                height:page.width*0.9
                x:page.width*0.05
                GridView {
                    id:grid
                    cellWidth: page.width/4*0.9
                    cellHeight: page.width/4*0.9
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
                                ctx.rect(0, 0, width, height);
                                ctx.fillStyle = "blue"; // Set text color to blue
                                ctx.font= Theme.fontSizeHuge + 'px ' + Theme.fontFamily;
                                ctx.textAlign = "center";
                                ctx.rotate(rotation_rad)
                                if (rotation_rad == 0) {ctx.fillText(letter, width/2, height/2+Theme.fontSizeSmall);}
                                else if (rotation_rad == 1.571) {ctx.fillText(letter, width/2, -height/2+Theme.fontSizeSmall);}
                                else if (rotation_rad == 3.142) {ctx.fillText(letter, -width/2, -height/2+Theme.fontSizeSmall);}
                                else if (rotation_rad == 4.712) {ctx.fillText(letter, -width/2, height/2+Theme.fontSizeSmall);}
                                ctx.restore();
                            }
                            MouseArea {
                                anchors.fill: parent
                                height: grid.cellHeight
                                width: grid.cellWidth
                                enabled: possible == 1 && temp_possible == 1 && progress.value > 0
                                onClicked: {
                                    currentWord = currentWord + letterModel.get(index).letter
                                    midfield.text = currentWord
                                    possible = 0
                                    Mylegal.hideImpossible(index)
                                }
                            }
                        }
                    } // Image
                }
            }

            Row {
                property int _spacing: (page.width*0.9 - leftb.width - rightb.width - midfield.width)/2
                x: page.width*0.05
                spacing: _spacing > 0 ? _spacing : 0

                IconButton{
                    id:leftb
                    icon.source: "image://theme/icon-m-back"
                    enabled: progress.value > 0
                    onClicked: {
                        //Clear the word
                        currentWord = ""
                        midfield.text = currentWord
                        if (letterModel.get(0).possible == 0 ){
                            letterModel.set(0,{"possible":1})
                            letterModel.set(0,{"possible":0})
                        }
                        else {
                            letterModel.set(0,{"possible":0})
                            letterModel.set(0,{"possible":1})
                        }

                        for (var i = 0; i<16; i++ ) {
                            letterModel.set(i,{"possible":1})
                            letterModel.set(i,{"temp_possible":1})
                        }
                    }
                }

                Text {
                    id:midfield
                    font.pixelSize: Theme.fontSizeSmall
                    color: Theme.primaryColor
                    width: 0.6*page.width
                    horizontalAlignment: TextEdit.AlignHCenter
                    enabled: false
                    text: currentWord
                }

                IconButton{
                    id:rightb
                    icon.source: "image://theme/icon-m-forward"
                    enabled: progress.value > 0
                    onClicked: {
                        Mylegal.addWord(currentWord)
                        currentWord = ""
                        midfield.text = currentWord
                        for (var i = 0; i<16; i++ ) {
                            letterModel.set(i,{"possible":1})
                            letterModel.set(i,{"temp_possible":1})
                        }
                        if(usend.cmove != "NO_CONNECTION") {
                            usend.sipadd = player_id + "," + myPlayerName + ",WORDS," + words
                            usend.broadcastDatagram()}
                        else {
                            Myan.analyze(player_id + "," + myPlayerName + ",WORDS," + words)
                        }
                    }
                }
            }

            SectionHeader { text:{qsTr("Words") + ", " + qsTr("player") + ": " + myPlayerName} }
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
                text: {myWords}
            }

            SectionHeader { text: qsTr("Players") }
            Text {
                id:players_list
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
            running: true && Qt.ApplicationActive
            repeat: true
            interval: 3000
            onTriggered: {
                if(usend.cmove != "NO_CONNECTION") {
                    usend.sipadd = player_id + "," + myPlayerName + ",PLAYERS," + playerlist
                    usend.broadcastDatagram()
                }
                else {
                    Myan.analyze(player_id + "," + myPlayerName + ",PLAYERS," + playerlist)
                }

            }
        }

    }
}
