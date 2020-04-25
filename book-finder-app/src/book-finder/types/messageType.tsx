export interface MessageType {
    _id: string;
    createdAt: string;
    text: string;
    user: MessageUserType;
}

interface MessageUserType {
    _id: string;
    name: string;
}