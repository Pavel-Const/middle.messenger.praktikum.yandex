import Block from "../../core/Block";
/*
import button from "./button.hbs?raw";
*/

interface IProps {
    text: string,
    time: string,
}

export class MessageItem extends Block<IProps> {
    constructor(props: IProps) {
        super(props);
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
