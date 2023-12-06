---
info:
  project: Spin Message Trigger
summary: A plugin for using message brokers with Fermyon Spin.
start_date: 2023-05-13
tags: rust wasm wasi nats redis messaging websocket mqtt fermyon-spin tdd architecture dev-containers back-end
github: https://github.com/lee-orr/spin-message-trigger
---

Fermyon Spin is one of two WASM server platforms I've been experimenting with, and I felt limited by it's restriction to using either HTTP or Redis to trigger the WASM components.

This plugin allows you to use a variety of message brokers as triggers - an in-memory broker, reds, NATs & MQTT. But beyond that, it also provides an HTTP gateway & WebSocket connectivity, allowing it to be used with those protocols as well.
