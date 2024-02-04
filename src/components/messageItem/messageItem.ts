import Block from "../../core/Block";

interface IProps {
    text: string,
    time: string,
    userId: number
}

export class MessageItem extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    const {
      text,
      time,
      userId
    } = this.props;
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return (`
            <div class="messageItem ${userId === window.store.state.user?.id ? "messageItem_my" : "" }">
                <div class="messageItem__text">
                    ${text}
                </div>
                <div class="messageItem__time">
                    <img src="/img/svg/read-icon.svg" alt="read">
                    ${formattedTime}
                </div>
            </div>
        `);
  }
}
