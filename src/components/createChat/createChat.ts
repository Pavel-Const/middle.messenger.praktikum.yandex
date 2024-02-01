import Block from "../../core/Block";
import { ErrorValid } from "../errorValid";
import { Input } from "../input";
import { createChat } from "../../services/chat.ts";

interface Props {
  onBlur: () => void;
  type: string,
  name: string,
  label: string,
  validate?: (value: string) => false | string
}

type Refs = {
  input: Input,
  error: ErrorValid,
}

export class CreateChat extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => this.validate(),
      onSave: () => {
        const chatTitle = (this.refs.input.element as HTMLInputElement)?.value;
        if (!chatTitle) {
          this.refs.error.setProps({ error: "Название переписки не может быть пустым" });
          return;
        }

        // eslint-disable-next-line no-undef
        createChat(chatTitle)
          .then(() => {
            const check = document.querySelector(".createChat__btnToggle") as HTMLInputElement;
            if (check !== null) {
              check.checked = false;
            }
          })
          .catch(error => /* this.refs.createChat.setError(error) */ {
            console.log(error);
          });
      }
    });
  }

  value() {
    if (!this.validate()) {
      return null;
    }
    return (this.refs.input.element as HTMLInputElement)?.value;
  }

  private validate() {
    const value = (this.refs.input.element as HTMLInputElement)?.value;
    const error = this.props.validate?.(value);

    if (error) {
      this.refs.error.setProps({ error });
      return false;
    }
    this.refs.error.setProps({ error: "" });
    return true;
  }

  protected render(): string {
    return (`
      <div class="createChat">
        <label class="createChat__btn" for="modal-toggle">
            <img src="/img/svg/create-chat.svg" alt="read">
        </label>
        <input type="checkbox" class="createChat__btnToggle" id="modal-toggle" hidden>
        <div class="createChat__hover ">
          <div class="createChat__field ">
                    {{{ Input
                            type=type
                            ref="input"
                            onBlur=onBlur
                            name=name
                    }}}
            <div class="fieldTitle">Введите название чата</div>
            {{{ErrorValid error=error ref="error"}}}
          </div>
          {{{ Button label="Создать чат" onClick=onSave}}}
        </div>
      </div>
        `);
  }
}
