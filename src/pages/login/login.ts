import Block from '../../core/Block';
import * as validators from '../../utils/validators';

export class LoginPage extends Block {
    constructor() {
        super({
            validate: {
                login: validators.login,
                password: validators.password
            },
            onLogin: (event: MouseEvent) => {
                event.preventDefault();
             /*    const login = this.refs.login.value();
                const password = this.refs.password.value(); */

                const login = this.refs.login.element?.querySelector('input')?.value;
                const password = this.refs.password.element?.querySelector('input')?.value;
                console.log({
                    login,
                    password
                });
            },
        });
    }

    protected render(): string {
        return (`
            <div class="formBlock">
                {{#> Form }}
                    <div class="formBlock__head">
                        <div class="formBlock__title">Вход</div>
                        <div class="formBlock__box">
                            {{{InputField type="text" name="login" label="Логин" ref="login" validate=validate.login}}}
                            {{{InputField type="password" name="password" label="Пароль" ref="password" validate=validate.password}}}
                        </div>
                    </div>
                    <div class="formBlock__actions">
                        {{{ Button label="Авторизоваться" onClick=onLogin}}}
                        {{{ Link label="Нет аккаунта?" page="registration"}}}
                    </div>
                {{/Form}}
            </div>
        `);
    }
}
