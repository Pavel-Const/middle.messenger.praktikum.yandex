import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import { InputField } from "../../components";
import { signin } from "../../services/auth";

interface Props {
    validate: {
        login: (value: string) => boolean | string
    },
    onLogin: (e: Event) => void,
}

type Refs = {
    login: InputField,
    password: InputField,
}

export class LoginPage extends Block<Props, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        password: validators.password
      },
      onLogin: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        if (!login) {
          return;
        }
        if (!password) {
          return;
        }
        signin({
          login,
          password
        }).catch(error => console.error(error));
      }
    });
  }

  protected render(): string {
    return (`
            <div class="formBlock">
                <form class="form">
                    <div class="formBlock__head">
                        <div class="formBlock__title">Вход</div>
                        <div class="formBlock__box">
                            {{{InputField type="text" name="login" label="Логин" ref="login" validate=validate.login}}}
                            {{{InputField type="password" name="password" label="Пароль" ref="password" validate=validate.password}}}
                        </div>
                    </div>
                    <div class="formBlock__actions">
                        {{{ Button label="Авторизоваться" onClick=onLogin}}}
                        {{{ Link label="Нет аккаунта?" page="/sign-up"}}}
                    </div>
                </form>
            </div>
        `);
  }
}
