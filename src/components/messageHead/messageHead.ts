import Block from "../../core/Block";
import "./messageHead.scss";
import * as validators from "../../utils/validators.ts";
import { addUserChat, deleteChat, removeUserChat } from "../../services/chat.ts";
import { Input } from "../input";
import { ErrorValid } from "../errorValid";
interface IProps {
  id: number,
  name: string,
}
type Refs = {
  input: Input,
  removeInput: Input,
  error: ErrorValid,
  errorRemove: ErrorValid,
}
export class MessageHead extends Block<IProps, Refs> {
  constructor(props: IProps) {
    super({
      ...props,
      validate: {
        message: validators.message
      },
      onDelete: () => {
        if (window.store.state.currentChat.id) {
          deleteChat(window.store.state.currentChat.id)
            .then(() => {
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      onSave: () => {
        const value: string = (this.refs.input.element as HTMLInputElement)?.value;
        if (!value) {
          this.refs.error.setProps({ error: "Поле не может быть пустым" });
          return;
        }
        if (window.store.state.currentChat.id) {
          addUserChat(window.store.state.currentChat.id, +value)
            .then(() => {
              const check = document.querySelector(".chatAddUser__btnToggle") as HTMLInputElement;
              if (check !== null) {
                check.checked = false;
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
      onRemove: () => {
        const value: string = (this.refs.removeInput.element as HTMLInputElement)?.value;
        if (!value) {
          this.refs.errorRemove.setProps({ error: "Поле не может быть пустым" });
          return;
        }
        if (window.store.state.currentChat.id) {
          removeUserChat(window.store.state.currentChat.id, +value)
            .then(() => {
              const check = document.querySelector(".chatRemoveUser__btnToggle") as HTMLInputElement;
              if (check !== null) {
                check.checked = false;
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
    });
  }

  protected render(): string {
    // Проверяем, есть ли id у текущего чата
    if (window.store.state.currentChat.id) {
      // Если id есть, рендерим содержимое
      return (`
      <div class="chat__contentHead">
        <div class="chat__box">
          <div class="chat__contentAva"></div>
          <div class="chat__contentName">${window.store.state.currentChat.name}</div>
        </div>
        <div class="chat__contentOptions">
          <div class="chatAddUser">
            <label class="chatAddUser__btn" for="modal-add">
                Добавить пользователя
            </label>
            <input type="checkbox" class="chatAddUser__btnToggle" id="modal-add" hidden>
            <div class="chatAddUser__hover ">
              <div class="chatAddUser__field">
                        {{{ Input
                                type=type
                                ref="input"
                                onBlur=onBlur
                                name=name
                        }}}
                <div class="fieldTitle">Введите ID пользователя</div>
                {{{ErrorValid error=error ref="error"}}}
              </div>
              {{{ Button label="Добавить" onClick=onSave}}}
            </div>
          </div>
          <div class="chatRemoveUser">
            <label class="chatRemoveUser__btn" for="modal-remove">
                Удалить пользователя
            </label>
            <input type="checkbox" class="chatRemoveUser__btnToggle" id="modal-remove" hidden>
            <div class="chatRemoveUser__hover ">
              <div class="chatRemoveUser__field">
                        {{{ Input
                                type=type
                                ref="removeInput"
                                onBlur=onBlur
                                name=name
                        }}}
                <div class="fieldTitle">Введите ID пользователя</div>
                {{{ErrorValid error=error ref="errorRemove"}}}
              </div>
              {{{ Button label="Удалить" onClick=onRemove}}}
            </div>
          </div>
          {{{ Button label="Удалить чат" onClick=onDelete}}}
        </div>
      </div>
    `);
    }
    return "<div class='chat__contentNone'>Выберите чат для отображения деталей</div>";
  }
}
