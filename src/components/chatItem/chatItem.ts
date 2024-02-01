import Block from "../../core/Block";

interface IProps {
  id:number,
  name: string,
  time: string,
  count: string,
  my: boolean,
  last: string,
  onClick: (id:number) => void,
  events: { click: (id:number) => void },
}

export class ChatItem extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick(props.id)
      }
    });
    console.log(props);
  }

  protected render(): string {
    const {
      name, time, count, my, last
    } = this.props;
    return (`
            <div class="chatItem" >
                <div class="chatItem__box">
                    <div class="chatItem__ava">
                    </div>
                    <div class="chatItem__info">
                        <div class="chatItem__name">${name}</div>
                        <div class="chatItem__last">${my ? "<span>Вы:</span>" : ""}${last}</div>
                    </div>
                </div>
                <div class="chatItem__add">
                    <div class="chatItem__time">${time}</div>
                    <div class="chatItem__counter">${count}</div>
                </div>
            </div>
        `);
  }
}
