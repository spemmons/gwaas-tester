GWaaS Tester
====

Setup
----

Copy "config.example.js" to "config.js" and update the various configuration options inside.

Run
----

The "heartbeat.js" script will attempt to sequentially send 4 heartbeat messages in response to ACKs.

    node heartbeat.js

The "send-all-data.js" script will attempt to send a single message with each supported data type.

    node send-all-data.js

The "hex-dumper.js" script will prompt for hex strings that will be interpreted as inbound M2M-OTA messages to be parsed and dumped to the console.
