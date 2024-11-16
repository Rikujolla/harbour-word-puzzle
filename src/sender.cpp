// Copyright (C) 2017 The Qt Company Ltd.
// BSD-3-Clause

#include <QtNetwork>
#include <QtCore>
#include <QDebug>

#include "sender.h"

Sender::Sender()
{
    udpSocket = new QUdpSocket(this);
    //qDebug() << " Constructor test" << mySipadd << mySport;
}

void Sender::startSender()
{
    qDebug() << " testi2" ;
    //startBroadcasting();
    //broadcastDatagram();
}

/*void Sender::sendPosition() //sendInitialPosition
{
    //timer.start(1000);
    qDebug() << "Send initial position" << myCmove;
    QByteArray datagram = myCmove.toUtf8();
    udpSocket->writeDatagram(datagram, QHostAddress::Broadcast, 45454);
}*/

QHostAddress Sender::getBroadcastAddress()
{
    foreach (const QNetworkInterface &interface, QNetworkInterface::allInterfaces()) {
        if (interface.flags().testFlag(QNetworkInterface::IsUp) &&
                interface.flags().testFlag(QNetworkInterface::IsRunning) &&
                !interface.flags().testFlag(QNetworkInterface::IsLoopBack)) {
            foreach (const QNetworkAddressEntry &entry, interface.addressEntries()) {
                if (entry.ip().protocol() == QAbstractSocket::IPv4Protocol) {
                    return entry.broadcast(); // Return the broadcast address
                }
            }
        }
    }
    return QHostAddress::Null;
}

void Sender::broadcastDatagram() // sendMove
{
    QByteArray datagram = mySipadd.toUtf8();
    QHostAddress broadcastAddress = getBroadcastAddress();
    ++messageNo;
    if (!broadcastAddress.isNull()) {
            udpSocket->writeDatagram(datagram, broadcastAddress, 45454);
            //qDebug() << "Sent move:" << mySipadd << "to broadcast address:" << broadcastAddress.toString();
        } else {
            qDebug() << "Failed to determine broadcast address!";
        }
}
