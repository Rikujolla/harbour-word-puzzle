// Copyright (C) 2017 The Qt Company Ltd.
// BSD-3-Clause

#include <QUdpSocket>
//#include <QCoreApplication>

#include "receiver.h"

Receiver::Receiver()

{
    udpSocket = new QUdpSocket(this);

    // Bind the socket to any IPv4 address on port 45454, allowing address reuse for multiple devices
    udpSocket->bind(QHostAddress::AnyIPv4, 45454, QUdpSocket::ShareAddress | QUdpSocket::ReuseAddressHint);

    // Connect readyRead signal to process incoming datagrams
    connect(udpSocket, &QUdpSocket::readyRead,
            this, &Receiver::processPendingDatagrams);
}

void Receiver::setRmove(const QString &newRmove) {
    if (myRmove != newRmove) {  // Only update if there is a change
        myRmove = newRmove;
        emit rmoveChanged(myRmove);
    }
    myRmove = newRmove;
    emit rmoveChanged(myRmove);
}

void Receiver::processPendingDatagrams()
{
    while (udpSocket->hasPendingDatagrams()) {
        QByteArray datagram;
        QHostAddress sender;
        quint16 senderPort;

        datagram.resize(int(udpSocket->pendingDatagramSize()));
        udpSocket->readDatagram(datagram.data(), datagram.size(), &sender, &senderPort);

        //qDebug() << "Received datagram from" << sender.toString() << ":" << senderPort << "Data:" << datagram;

        QString newRmove = QString::fromUtf8(datagram.constData());
        setRmove(newRmove);
    }
}
