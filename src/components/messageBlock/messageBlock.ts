import Block from "../../core/Block";

interface IProps {
    text: string,
    time: string,
}

export class MessageBlock extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
    console.log(props);
  }

  protected render(): string {
    return (`
      <div class="chat__contentBody">
          <div class="chat__contentDate">19 июня</div>
            {{#each messages}}
              {{{ MessageItem text=content my="true" time=time}}}
            {{/each}}
        </div>
        `);
  }
}
