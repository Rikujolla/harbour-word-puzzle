/*Copyright (c) 2024, Riku Lahtinen
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "analyze.js" as Myan
import harbour.word.puzzle.sender 1.0
import harbour.word.puzzle.receiver 1.0

Page {
    id:page

    /*onStatusChanged: {
        if (page.status === 2) {
        }
    }*/

    SilicaFlickable {
        anchors.fill: parent
        contentHeight: mainColumn.height
        PullDownMenu {
            MenuItem {
                text: qsTr("Refresh")
                onClicked: {Myan.fillResults()}
            }
        }

        Column {
            id: mainColumn
            width: parent.width

            PageHeader {
                title: qsTr("Results")
            }

            UdpReceiver {
                id:urecei
                onRmoveChanged: {
                    Myan.analyze(rmove)
                }
            }

            SectionHeader { text: qsTr("Ranking list")}

            ColumnView {
                id: thirdColumn
                model:pointsModel
                width: parent.width
                itemHeight: Theme.itemSizeSmall

                delegate: BackgroundItem {
                    width: parent.width
                    Label {
                        text: player + ": " + points + " " + qsTr("points")
                        x: Theme.paddingLarge
                    }
                }
            }

            SectionHeader {
                text: qsTr("Words, points and players")
            }

            ColumnView {
                id: firstColumn
                model:wordModel
                width: parent.width
                itemHeight: Theme.itemSizeSmall
                delegate: Row {
                    id: listos
                    x: Theme.paddingLarge
                    spacing: 0.1*page.width
                    IconButton {
                        id: ic
                        icon.source: "image://theme/icon-m-cancel"
                        onClicked: {
                            remorseDel.execute(qsTr("Deleting"), console.log("remorse") , 2000 )
                        }
                        RemorsePopup { id: remorseDel
                            width: page.width
                            onTriggered: {
                                if(usend.cmove != "NO_CONNECTION") {
                                    usend.sipadd = player_id + "," + myPlayerName + ",DOWNVOTE," + word
                                    usend.broadcastDatagram()}
                                else {
                                    Myan.analyze(player_id + "," + myPlayerName + ",DOWNVOTE," + word)
                                }
                                refreshing.start()
                            }
                        }
                    }
                    BackgroundItem {
                        id: bg
                        height:ic.height
                        width: 0.9*page.width - ic.width -Theme.paddingLarge
                        Text {
                            id:word_text
                            font.pixelSize: Theme.fontSizeSmall
                            font.italic: colorerr ? true : false
                            color: colorerr ? Theme.errorColor : Theme.primaryColor
                            anchors.verticalCenter: parent.verticalCenter
                            text: word + "; " + mypoints + "; " + players
                        }
                    }
                }
            }

            SectionHeader {
                visible: vastedwords != ""
                text: qsTr("Abandoned words")
            }

            Text {
                font.pixelSize: Theme.fontSizeSmall
                color: Theme.primaryColor
                wrapMode: Text.WordWrap
                width: parent.width
                visible:vastedwords != ""
                text: vastedwords
                x: Theme.paddingLarge
            }

            SectionHeader {
                visible: zeropointwords != ""
                text: qsTr("Common words for all")}

            Text {
                font.pixelSize: Theme.fontSizeSmall
                color: Theme.primaryColor
                wrapMode: Text.WordWrap
                width: parent.width
                visible:zeropointwords != ""
                text: zeropointwords
                x: Theme.paddingLarge
            }
        }
    }

    Timer { //not working, have to do manually
        id:refreshing
        interval: 500
        running: false
        repeat: false
        onTriggered: {
            if(usend.cmove != "NO_CONNECTION") {
                usend.sipadd = player_id + "," + myPlayerName + ",REFRESH"
                usend.broadcastDatagram()}
            else{
                Myan.analyze(player_id + "," + myPlayerName + ",REFRESH")
            }
            refreshing.stop()
        }
    }

    Component.onCompleted:{
        Myan.fillResults()
    }
}
