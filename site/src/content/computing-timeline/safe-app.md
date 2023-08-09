---
info:
    company: SafeApp (getsafeapp.com)
    role: Contract Engineer
summary: Built a chrome extension for signing & encrypting emails.
start_date: 2021-07-01
end_date: 2022-06-01
tags: Architecture React Typescript Mocha Cypress TDD CI/CD DevOps Firebase Twilio OpenPGP Encryption Chrome-Extensions GMail front-end  nodejs back-end full-stack HTML css redux
---

My contract with Safe involved building their initial MVP fron the ground up. I started by setting up a testing & deployment using Github Actions, and deploying builds to Firebase. The system involved multiple components - a sign-up flow, a user dashboard, the extension's interaction with GMail, and the back end services running on top of Firebase Cloud Functions & Firestore. Initially, the product was built to provide verification of emails - allowing you to know the email was really sent by the sender, and hasn't been tampered with. However, over time we added support for sending encrypted emails, with the capacity to expire, and without storing the full decryption keys on the server. This meant that to decrypt the email - you would have to be in possession of the recieving email and (optionally) a passphrase.

Once the MVP was complete and had proven itself, the client hired an additional front end developer, and a designer was contracted to re-design the sign-up flow & dashboard. My work shifted to focus on the back end, while guiding the new developer and empowering them to do work on the system - and eventually to take over the entire project.