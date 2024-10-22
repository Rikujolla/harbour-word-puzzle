import QtQuick 2.2
import Sailfish.Silica 1.0
import "legality.js" as Mylegal
Page {
    id: page

    property int time_current: 0 // Value for the progress timer*1000
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
                text: qsTr("Results")
                onClicked: pageStack.animatorPush(Qt.resolvedUrl("ResultsPage.qml"))
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
            //BackgroundItem {
            //width: page.width
            //height:400
            ProgressBar {
                id:progress
                width: page.width
                maximumValue: 180
                value:180
                Timer {
                    id:progress_timer
                    interval: 100
                    running: true && time_current >= 0
                    onTriggered: {
                        time_current = time_current + progress_timer.interval
                        progress.value = progress.value - interval/1000
                    }

                }

            }
            //}
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
                        id:hh_rec
                        width: grid.cellWidth
                        height:grid.cellHeight
                        border.width: 3
                        border.color: "black"
                        Image {
                            fillMode: Image.PreserveAspectFit
                            source: "./images/" + letterModel.get(index).letter + ".svg"
                            opacity: possible == 1 && temp_possible == 1 ? 1.0: 0.2
                            anchors.fill: parent
                            MouseArea {
                                anchors.fill: parent
                                height: grid.cellHeight
                                width: grid.cellWidth
                                //enabled: coins > index*20 ? true: false
                                enabled: possible == 1 && temp_possible == 1

                                onClicked: {
                                    currentWord = currentWord + letterModel.get(index).letter
                                    if (developer) {console.log(currentWord)}
                                    possible = 0
                                    //letterModel.set(index,{"possible":0})
                                    Mylegal.hideImpossible(index)
                                }

                            }
                        } // Image
                    }

                }
            }
            BackgroundItem {
                width: page.width
                height:page.width
                GridView {
                    id:grid2
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
                            width: grid2.cellWidth; height: grid2.cellHeight
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
                                ctx.fillText(letter, width/2, height-25);
                                ctx.restore();
                            }
                            MouseArea {
                                anchors.fill: parent
                                height: grid2.cellHeight
                                width: grid2.cellWidth
                                enabled: possible == 1 && temp_possible == 1
                                onClicked: {
                                    currentWord = currentWord + letterModel.get(index).letter
                                    if (developer) {console.log("currentWord")}
                                    possible = 0
                                    //letterModel.set(index,{"possible":0})
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
                onClicked: {
                    if (developer) {console.log(currentWord)}
                    words = words + currentWord + ", "
                    currentWord = ""
                    for (var i = 0; i<16; i++ ) {
                        letterModel.set(i,{"possible":1})
                        letterModel.set(i,{"temp_possible":1})
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
        }
    }
}
