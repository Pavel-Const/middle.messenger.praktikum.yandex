import Block from "../../core/Block";
import "./messageBlock.scss";

interface IProps {
    text: string,
    time: string,
}

export class MessageBlock extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected render(): string {
    return (`
      <div class="chat__contentBody">
         <!-- <div class="chat__contentDate">19 июня</div>-->
            {{#each messages}}
              {{{ MessageItem text=content time=time userId=user_id}}}
            {{/each}}
        </div>
        `);
  }
}
