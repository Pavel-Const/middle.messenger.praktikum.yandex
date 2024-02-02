import Block from "../../core/Block";

interface IProps {
  id:number,
  currentId:number,
  name: string,
  time: string,
  count: string,
  my: boolean,
  last: string,
  onClick: (id:number, name: string) => void,
  events: { click: (id:number, name: string) => void },
}

export class ChatItem extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick(props.id, props.name)
      }
    });
    console.log(props);
  }

  protected render(): string {
    const {
      name, time, count, my, last, currentId
    } = this.props;
    return (`
            <div class="chatItem {{#if currentId=id}}messageItem_my{{/if}}" >
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
