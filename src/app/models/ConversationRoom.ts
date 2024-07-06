
import { Conversation } from "./Conversation";
import { Message } from "./Message";

//Defined to store conversation and messages belong to that conversation to gether
export class ConversationRoom {
    convo: Conversation
    msgs: Message[]

    constructor(convo: Conversation, msgs: Message[]) {
        this.convo = convo;
        this.msgs = msgs;
    }
}