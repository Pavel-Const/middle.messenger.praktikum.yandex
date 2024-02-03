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
    messages: any[],
    chats: Chat[]
}
