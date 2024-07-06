import { User } from "./User"

export class Conversation {
    convo_id: string
    buyer_uid: string
    seller_uid: string
    recipient_user: User
    lastMsg: string
    lastMsg_uid: string
    product_id: string
    createdAt: string

    constructor(convo_id: string,
        buyer_uid: string,
        seller_uid: string,
        lastMsg: string,
        recipient_user: User,
        lastMsg_uid: string,
        product_id: string,
        createdAt: string
    ) {
        this.convo_id = convo_id;
        this.buyer_uid = buyer_uid;
        this.seller_uid = seller_uid;
        this.lastMsg = lastMsg;
        this.recipient_user = recipient_user;
        this.lastMsg_uid = lastMsg_uid;
        this.product_id = product_id;
        this.createdAt = createdAt;

    }
};