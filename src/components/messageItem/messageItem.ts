import Block from "../../core/Block";
/*
import button from "./button.hbs?raw";
*/

interface IProps {
    name: string,
    time: string,
    count: string,
    my: boolean
}

export class MessageItem extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected init(): void {
        this.props.events = {
            click: this.props.onClick
        }
    }

    protected render(): string {
        const { text, time } = this.props;
        return (`
            <div class="messageItem {{#if my}}messageItem_my{{/if}}">
                <div class="messageItem__text">
                    ${text}
                </div>
                <div class="messageItem__time">
                    <img src="/img/svg/read-icon.svg" alt="read">
                    ${time}
                </div>
            </div>
        `)
    }
}
