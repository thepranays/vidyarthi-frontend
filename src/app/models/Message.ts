

export class Message {
    msg_id: string
    convo_id: string
    msg: string
    sender_uid: string
    recipient_uid: string
    createdAt: string

    constructor(msg_id: string, convo_id: string, msg: string, sender_uid: string, recipient_uid: string, timestamp: string) {
        this.msg_id = msg_id;
        this.convo_id = convo_id;
        this.msg = msg;
        this.sender_uid = sender_uid;
        this.recipient_uid = recipient_uid;
        this.createdAt = timestamp;
    }
}; 