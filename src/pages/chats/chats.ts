import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import {ChatItem, InputField, MessageHead} from "../../components";
import {initChatPage} from "../../services/initApp.ts";
import {connect} from "../../utils/connect.ts";

interface Props {
  validate: {
    login: (value: string) => boolean | string
  },
  onReg: (e: Event) => void,
}

type Refs = {
  message: InputField,
  messageHead: MessageHead,
  chatItem: ChatItem,
}

class ChatsPage extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      currentId: "",
      validate: {
        message: validators.message
      },
      checkChat: (id: number, name: string) => {
        console.log(id, name);
        this.refs.messageHead.setProps({id, name});
        this.refs.chatItem.setProps({...window.store.chats, currentId: id});
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
              {{{ ChatItem ava=avatar name=title last=last_message time=created_by count=unread_count id=id currentId=../currentId onClick=../checkChat ref='chatItem'}}}
            {{/each}}
          </div>
      </div>
      <div class="chat__content">
          
          {{{MessageHead ref='messageHead'}}}
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
export default connect(({chats, user}) => ({chats, user}))(ChatsPage);
