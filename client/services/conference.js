/*jshint browser: true */
/*global angular, console, alert, getUserMedia, attachMediaStream, RTCSessionDescription, RTCIceCandidate, RTCPeerConnection, webrtcDetectedBrowser */

(function () {
    'use strict';

    angular.module('App').factory('$conference', function ($rootScope, $adapter, $io, $routeParams) {

        var signal, peerconn, localStream;

        var namespace = '/room/conference';

        var configuration = {
            iceServers: [
                {url:'stun:stun1.l.google.com:19302'},
                {url:'stun:stun2.l.google.com:19302'},
                {url:'stun:stun3.l.google.com:19302'},
                {url:'stun:stun4.l.google.com:19302'},
                {url:'stun:stun.l.google.com:19302'},
                {url:'stun:stun01.sipphone.com'},
                {url:'stun:stun.voiparound.com'},
                {url:'stun:stun.voipbuster.com'},
                {url:'stun:stun.rixtelecom.se'},
                {url:'stun:stun.voipstunt.com'},
                {url:'stun:stun.voxgratia.org'},
                {url:'stun:stun.softjoys.com'},
                {url:'stun:stun.ideasip.com'},
                {url:'stun:stun.fwdnet.net'},
                {url:'stun:stun.schlund.de'},
                {url:'stun:stun.ekiga.net'},
                {url:'stun:stunserver.org'},
                {url:'stun:stun.iptel.org'},
                {url:'stun:stun.xten.com'},

                {
                    url: 'turn:numb.viagenie.ca',
                    username: 'webrtc@live.com',
                    credential: 'muazkh'
                },
                {
                    url: 'turn:192.158.29.39:3478?transport=udp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    url: 'turn:192.158.29.39:3478?transport=tcp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                }
            ]
        };

        var options = {
            optional: [
                { DtlsSrtpKeyAgreement: true }
            ]
        };

        var constraints = {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };

        var mediaOptions = {
            video: true,
            audio: true
        };

        function openSignaling() {
            signal = $io.connect(namespace, {
                multiplex: false
            });

            signal.on('created', function () {
                console.log("You have created this room");
            });

            signal.on('joined', function () {
                console.log("You have joined this room");
                createOffer();
            });

            signal.on('offer', function (offer) {
                console.log("A peer has sent you an offer");
                createAnswer(offer);
            });

            signal.on('answer', function (answer) {
                console.log("A peer has answered your offer");

                peerconn.setRemoteDescription(new RTCSessionDescription(answer));
            });

            signal.on('ice candidate', function (candidate) {
                console.log("A peer has sent you an ICE candidate");
                peerconn.addIceCandidate(new RTCIceCandidate(candidate));
            });

            signal.on('leave', function () {
                if (peerconn) {
                    peerconn.close();
                    peerconn = null;
                }

                document.getElementById('remote-video').innerHTML = null;
            });
        }


        /** Append a video element */
        function addVideo(local, stream) {
            var video = document.createElement('video');
            document.getElementById((local ? 'local-video' : 'remote-video')).appendChild(video);

            video.setAttribute('autoplay', 'autoplay');

            if (local) {
                video.setAttribute('muted', 'muted');
            }

            attachMediaStream(video, stream);
        }

        /** Join the room */
        function joinRoom() {
            signal.emit('join', $routeParams.sic);
        }

        /** Create the RTCPeerConnection */
        function createPeerConnection() {
            var pc = new RTCPeerConnection(configuration, options);

            pc.addStream(localStream);

            pc.onicecandidate = function (event) {
                if (event.candidate) {
                    console.log("Got ICE candidate");
                    signal.emit('ice candidate', event.candidate);
                }

            };

            pc.onaddstream = function (event) {
                console.log("Adding remote stream");
                addVideo(false, event.stream);
            };

            return pc;
        }

        /** Create a connection offer */
        function createOffer() {
            peerconn = createPeerConnection();

            peerconn.createOffer(function (offer) {
                peerconn.setLocalDescription(offer);
                signal.emit('offer', offer);
            }, function (err) {
                console.error(err);
            }, constraints);
        }

        /** Create an answer for an offer */
        function createAnswer(offer) {
            peerconn = createPeerConnection();

            peerconn.setRemoteDescription(new RTCSessionDescription(offer));

            peerconn.createAnswer(function (answer) {
                peerconn.setLocalDescription(answer);
                signal.emit('answer', answer);
            }, function (err) {
                console.error(err);
            }, constraints);
        }

        function leave() {
            if (peerconn) {
                peerconn.close();
                peerconn = null;
            }

            document.getElementById('local-video').innerHTML = null;

            localStream.stop();
            signal.emit('leave');
        }

        $rootScope.$on('$locationChangeStart', function () {
            leave();
        });

        /* Open the signaling channel */
        openSignaling();

        return {
            active: false,

            /** Initialize the connection */
            start: function () {
                this.active = true;

                /* Perform Web RTC adapter tasks if necessary */
                $adapter.adaptIfNeeded();

                getUserMedia(mediaOptions, function (stream) {
                    localStream = stream;

                    addVideo(true, localStream);

                    joinRoom();
                }, function (err) {
                    console.error(err);
                });
            },

            stop: function () {
                this.active = false;

                document.getElementById('local-video').innerHTML = null;
                document.getElementById('remote-video').innerHTML = null;

                leave();
            }
        };

    });

}());
