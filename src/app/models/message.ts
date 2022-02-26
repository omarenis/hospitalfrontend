export interface Message {
    sender: string;
    receivers: string;
    subject: string;
    content: string;
    read: boolean;
    date: Date | string;
    id ?: string;
}
