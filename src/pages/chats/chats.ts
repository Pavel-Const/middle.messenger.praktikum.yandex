import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import { ChatItem, InputField, MessageHead } from "../../components";
import { initChatPage } from "../../services/initApp.ts";
import { connect } from "../../utils/connect.ts";
import { addWsChat } from "../../services/chat.ts";
import { AppState } from "../../type.ts";

interface Props extends Partial<AppState> {
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
      validate: {
        message: validators.message
      },
      checkChat: (id: number, name: string) => {
        addWsChat(id, window.store.state.user?.id);
        const state = window.store.getState();
        window.store.set({
          ...state,
          messages: [],
          currentChat: {
            id: id,
            name: name
          }
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
              {{{ ChatItem ava=avatar name=title last=last_message.content time=created_by count=unread_count id=id onClick=../checkChat ref='chatItem'}}}
            {{/each}}
          </div>
      </div>
      <div class="chat__content">
          
          {{{MessageHead ref='messageHead'}}}
          {{{MessageBlock messages=messages}}}
        <div class="chat__contentBottom">
          <img src="/img/svg/message-options-icon.svg" alt="options">
          {{{InputField type="text" label="" name="message" ref="message" validate=validate.message}}}
          {{{ Button label="" type='send' className='chat__contentSend'}}}
        </div>
        </div>
      </div>
        `);
  }
}

export default connect(({ chats, user, messages }) => ({ chats, user, messages }))(ChatsPage);
