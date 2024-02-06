export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
};

type LastMessage = {
    user: User,
    time: string,
    content: string
}
type Message = {
    chat_id: number,
    content: string,
    file: null,
    id: number,
    is_read: boolean,
    time: string,
    type: string,
    user_id: number
}

export type Chat = {
    id: number,
    title: string,
    // eslint-disable-next-line no-undef
    avatar: Nullable<string>,
    unreadCount: number,
    lastMessage: LastMessage | null
}

export type AppState = {
    error: string | null,
    user: User | null,
    messages: Message[],
    chats: Chat[],
    currentChat: {
        id: number | null,
        name: string
    }
}
