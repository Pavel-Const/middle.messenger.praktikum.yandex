import Block from "../../core/Block";

interface IProps {
  id: number,
  name: string
}

export class MessageHead extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  
  protected render(): string {
    return (`
      <div class="chat__contentHead">
        <div class="chat__box">
          <div class="chat__contentAva"></div>
          <div class="chat__contentName" >${this.props.name}</div>
        </div>
        <div class="chat__contentOptions">
          <img src="/img/svg/options-icon.svg" alt="options">
        </div>
      </div>
      `);
  }
}
