import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import { InputField } from "../../components";
import { initChatPage } from "../../services/initApp.ts";
import { connect } from "../../utils/connect.ts";

interface Props {
    validate: {
        login: (value: string) => boolean | string
    },
    onReg: (e: Event) => void,
}

type Refs = {
    message: InputField,
}
class ChatsPage extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      validate: {
        message: validators.message
      },
      checkChat: (id: number) => {
        console.log(id);
      },
      onSend: (event: Event) => {
        event.preventDefault();
        const message = this.refs.message.value();
        console.log({
          message
        });
      }
    });
    initChatPage();
  }

  protected render(): string {
    return (`
      <div class="chat">
        <div class="chat__aside">
          <div class="chat__asideHead">
            <div class="chat__asideHeadBlock">
              {{{ CreateChat ava="" last="Изображение"}}}
              <div class="chat__asideLink" page="/settings">Профиль
                  <img src="/img/svg/arrow-right.svg" alt="arrow">
              </div>
            </div>
            <div class="chat__asideSearch">
              <input type="text" class="chat__asideSearchInput" placeholder="Поиск">
              <img src="/img/svg/search-icon.svg" alt="arrow">
            </div>
          </div>
          <div class="chat__asideList">
            {{#each chats}}
              {{{ ChatItem ava=this.avatar name=this.title last=this.last_message time=this.created_by count=this.unread_count id=id onClick=this.handleClick }}}
            {{/each}}
          </div>
      </div>
      <div class="chat__content">
        <div class="chat__contentHead">
          <div class="chat__box">
            <div class="chat__contentAva"></div>
            <div class="chat__contentName">Имя</div>
          </div>
          <div class="chat__contentOptions">
            <img src="/img/svg/options-icon.svg" alt="options">
          </div>
        </div>
          {{{MessageBlock }}}
        <div class="chat__contentBottom">
          <img src="/img/svg/message-options-icon.svg" alt="options">
          {{{InputField type="text" label="" name="message" ref="message" validate=validate.message}}}
          {{{ Button label="" onClick=onSend type='send' className='chat__contentSend'}}}
        </div>
        </div>
      </div>
        `);
  }
}
// @ts-ignore
export default connect(({ chats, user }) => ({ chats, user }))(ChatsPage);
