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
import Sailfish.Pickers 1.0
import harbour.word.puzzle.sender 1.0
import "./settings.js" as Mysets

Page {
    id: page

    SilicaFlickable {
        anchors.fill: parent

        PullDownMenu {

            MenuItem {
                text: qsTr("Save settings")
                onClicked: Mysets.saveSettings()
            }
        }

        PushUpMenu {
            MenuItem {
                text: qsTr("About")
                onClicked: pageStack.push(Qt.resolvedUrl("About.qml"))
            }

        }
        contentHeight: column.height

        Item {
            id: sets
            property bool indexUpdater: false;
            property var labels: [
                //: Increase time by 10 seconds
                {lab:qsTr("+10 s")},
                //: Reduce time by 10 seconds
                {lab:qsTr("-10 s")}
            ]

        }

        Column {
            id: column

            width: page.width
            spacing: Theme.paddingMedium
            PageHeader {
                title: qsTr("Settings page")
            }

            UdpSender {
                id:usend
            }

            SectionHeader { text: qsTr("Time settings")}

            Row {
                x: Theme.paddingLarge
                spacing: Theme.paddingLarge
                Text {
                    width: page.width /2
                    color: Theme.secondaryHighlightColor
                    font.pixelSize: Theme.fontSizeSmall
                    text: qsTr("Game endurance") +" " + max_time + "s"
                }

                Button {
                    text: sets.labels[0].lab
                    width: page.width /6
                    onClicked: {
                        max_time = max_time + 10
                    }
                }
                Button {
                    text: sets.labels[1].lab
                    width: page.width /6
                    onClicked: {
                        if (max_time> 30) {max_time = max_time - 10}
                    }
                }
            }

            SectionHeader { text: qsTr("Player settings")}

            Row {
                x: Theme.paddingLarge
                spacing: Theme.paddingMedium
                visible: true
                Text {
                    text: qsTr("Player name")
                    color: Theme.secondaryHighlightColor
                    x: Theme.paddingLarge
                    font.pixelSize: Theme.fontSizeSmall
                    width:page.width/2
                    wrapMode: Text.WordWrap
                }

                TextField {
                    id: player
                    //: Typical woman name in the country adding number to give a hint for the format
                    placeholderText: qsTr("Sophia5")
                    text:myPlayerName
                    width: page.width/2
                    validator: RegExpValidator { regExp: /^([A-Za-zÅÄÖåäö]+[0-9]*)|([A-Za-zÅÄÖåäö]*)$/ }
                    color: (errorHighlight || text.length < 2) ? "red" : Theme.primaryColor
                    EnterKey.enabled: !errorHighlight && text.length > 1
                    EnterKey.iconSource: "image://theme/icon-m-enter-close"
                    EnterKey.onClicked: {
                        focus = false
                        myPlayerName = player.text
                        usend.sipadd = myPlayerName
                        Mysets.saveSettings()
                    }
                }
            }

            SectionHeader { text: qsTr("Words language")}

            ColumnView {
                id: languageColumn
                model:languageModel
                width: parent.width
                itemHeight: Theme.itemSizeSmall

                delegate: BackgroundItem {
                    width: parent.width
                    Label {
                        text: language
                        x: Theme.paddingLarge
                        color: colorsel == "sel" ? Theme.primaryColor : Theme.secondaryColor
                    }
                    onClicked: {
                        for (var i = 0;i < languages.length;i++){
                            if(i == index){
                                languageModel.set(i,{colorsel:"sel"})
                                selectedLanguage = languages[index].lng
                            }
                            else {
                                languageModel.set(i,{colorsel:"notsel"})
                            }
                        }
                        Mysets.saveSettings()
                    }
                }
            }

            VerticalScrollDecorator {}

        }
    }
}
