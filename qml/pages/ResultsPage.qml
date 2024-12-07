/*Copyright (c) 2018, Riku Lahtinen
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


Page {
    id:page

    /*onStatusChanged: {
        if (page.status === 2) {
        }
    }*/

    SilicaFlickable {
        anchors.fill: parent
        contentHeight: mainColumn.height
        /*PullDownMenu {
            MenuItem {
                text: qsTr("Edit data")
                onClicked: {}
            }
        }*/

        Column {
            id: mainColumn
            width: parent.width

            PageHeader {
                title: qsTr("Results")
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

                        //anchors.centerIn: parent
                    }
                }
            }

            SectionHeader { text: qsTr("Words, points and players") }

            ColumnView {
                id: firstColumn
                model:wordModel
                width: parent.width
                itemHeight: Theme.itemSizeSmall
                delegate: ComboBox {
                    id: listos
                    x: Theme.paddingLarge
                    label: word + "; " + mypoints + "; " + players
                    menu: ContextMenu {
                        id:listosMenu
                        /*
                        MenuItem {
                            text: qsTr("Delete")
                            onClicked: {dayValues_g.indexEdit=index;
                                remorseDel.execute(qsTr("Deleting"), console.log("remorse") , 3000 )
                            }
                            RemorsePopup { id: remorseDel
                                onTriggered: {
                                    Mydbases.deleteRecord_n();
                                    editDataUpdate.start();
                                }
                            }
                        }
                        */
                    }

                }
            }

            SectionHeader { text: qsTr("Common words for all")}

            ColumnView {
                id: secondColumn
                model:1
                width: parent.width
                itemHeight: Theme.itemSizeSmall

                delegate: BackgroundItem {
                    width: parent.width
                    Label {
                        text: zeropointwords
                        x: Theme.paddingLarge
                        //anchors.centerIn: parent
                    }
                }
            }

        }

    }
    Component.onCompleted:{
        Myan.fillResults()
    }
}
