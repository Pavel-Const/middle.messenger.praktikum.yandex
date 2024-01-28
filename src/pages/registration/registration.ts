import Block from "../../core/Block";
import { CreateUser } from "../../api/type";
import * as validators from "../../utils/validators";
import { InputField } from "../../components";
import { signup } from "../../services/auth";

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

        const newUser: CreateUser = {
          login: this.refs.login.value()!,
          first_name: this.refs.first_name.value()!,
          second_name: this.refs.second_name.value()!,
          email: this.refs.email.value()!,
          phone: this.refs.phone.value()!,
          password: this.refs.password.value()!
        };
        if (!newUser.password || !newUser.email || !newUser.login || !newUser.phone || !newUser.first_name || !newUser.second_name) {
          return;
        }
        signup(newUser).catch(error => console.log(error) /* this.refs.errorLine.setProps({error}) */);
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
                        {{{ Link label="Войти" page="/"}}}
                    </div>
                {{/Form}}
            </div>
        `);
  }
}
