import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import { InputField } from "../../components";

interface Props {
  validate: {
    login: (value: string) => boolean | string
  },
  onReg: (e: Event) => void,
}

type Refs = {
  login: InputField,
  password: InputField,
  email: InputField,
  first_name: InputField,
  second_name: InputField,
  phone: InputField,
  repeatPassword: InputField
}

export class RegistrationPage extends Block<Props, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        email: validators.email,
        names: validators.names,
        password: validators.password,
        phone: validators.phone
      },
      onReg: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const password = this.refs.password.value();
        const email = this.refs.email.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const repeatPassword = this.refs.repeatPassword.value();
        console.log({
          login,
          password,
          email,
          first_name,
          second_name,
          phone,
          repeatPassword
        });
      }
    });
  }

  protected render(): string {
    return (`
            <div class="formBlock">
                {{#> Form }}
                    <div class="formBlock__head">
                        <div class="formBlock__title">Вход</div>
                        <div class="formBlock__box">
                            {{{ InputField type="text" label="Почта" name="email" ref="email" validate=validate.email}}}
                            {{{ InputField type="text" label="Логин" name="login" ref="login" validate=validate.login}}}
                            {{{ InputField type="text" label="Имя" name="first_name" ref="first_name" validate=validate.names}}}
                            {{{ InputField type="text" label="Фамилия" name="second_name" ref="second_name" validate=validate.names}}}
                            {{{ InputField type="number" label="Телефон" name="phone" ref="phone" validate=validate.phone}}}
                            {{{ InputField type="password" label="Пароль" name="password" ref="password" validate=validate.password}}}
                            {{{ InputField type="password" label="Пароль (еще раз)"  ref="repeatPassword" validate=validate.password}}}
                        </div>
                    </div>
                    <div class="formBlock__actions">
                        {{{ Button label="Зарегистрироваться" onClick=onReg}}}
                        {{{ Link label="Войти" page="login"}}}
                    </div>
                {{/Form}}
            </div>
        `);
  }
}
