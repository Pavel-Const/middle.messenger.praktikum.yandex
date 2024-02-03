import Block from "../../core/Block";

interface IProps {
  id:number,
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
        click: (e: Event) => {
          props.onClick(props.id, props.name);
          const chatItemElement = (e.target as HTMLElement).closest(".chatItem");
          if (!chatItemElement) return;
          document.querySelectorAll(".chatItem").forEach((item) => {
            item.classList.remove("chatItem_active");
          });
          const currentId = chatItemElement.getAttribute("data-id");
          if (currentId) {
            if (+currentId === props.id) {
              chatItemElement.classList.add("chatItem_active");
            } else {
              chatItemElement.classList.remove("chatItem_active");
            }
          }
        }
      }
    });
  }

  protected render(): string {
    const {
      name,
      time,
      count,
      my,
      last,
      id
    } = this.props;
    return (`
            <div class="chatItem" data-id="${id}">
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
