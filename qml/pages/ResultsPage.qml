import QtQuick 2.0
import Sailfish.Silica 1.0
import QtQuick.LocalStorage 2.0
import "analyze.js" as Myan

Page {
    id: page

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All

    SilicaListView {
        id: listView
        model: wordModel
        anchors.fill: parent
        header: PageHeader {
            title: qsTr("Result Page")
        }
        delegate: BackgroundItem {
            id: delegate

            Label {
                x: Theme.horizontalPageMargin
                text: word + "; " + mypoints + "; " + players
                anchors.verticalCenter: parent.verticalCenter
                color: delegate.highlighted ? Theme.highlightColor : Theme.primaryColor
            }
            onClicked: console.log("Clicked " + index)
        }
        SectionHeader { text: qsTr("Players") }

        VerticalScrollDecorator {}
    }

    Component.onCompleted: {
        Myan.fillResults()

    }
}
