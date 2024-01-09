import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { ProfileItem } from '../../components';

interface Props {
    validate: {
        login: (value: string) => boolean | string
    },
    onSave: (e: Event) => void,
}

type Refs = {
    oldPassword: ProfileItem,
    newPassword: ProfileItem,
    repeatPassword: ProfileItem,
}
export class PasswordEditPage extends Block<Props, Refs> {
    constructor() {
        super({
            validate: {
                password: validators.password
            },
            onSave: (event: any) => {
                event.preventDefault();
                const oldPassword = this.refs.oldPassword.value();
                const newPassword = this.refs.newPassword.value();
                const repeatPassword = this.refs.repeatPassword.value();

                console.log({
                    oldPassword,
                    newPassword,
                    repeatPassword
                });
            }
        });
    }

    protected render(): string {
        return (`
            <form class="profile">
                <div class="profile__back">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" page="profile">
                        <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3" page="profile"/>
                        <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white" page="profile"/>
                        <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6" page="profile"/>
                    </svg>
                </div>
                <div class="profile__wrapper">
                    <div class="profile__content">
                        <div class="profile__ava" >
                            <img src="/img/ava-default.png" alt="avatarImage">
                            <div class="profile__avaHov">Поменять аватар</div>
                        </div>
                        <ul class="profile__infoList">
                            {{{ ProfileItem name="oldPassword" type="password" label="Старый пароль"  edit="true" ref="oldPassword" validate=validate.password  value=''}}}
                            {{{ ProfileItem name="newPassword" type="password" label="Новый пароль"  edit="true" ref="newPassword" validate=validate.password value=''}}}
                            {{{ ProfileItem name="repeatPassword" type="password" label="Повторите новый пароль"  edit="true" ref="repeatPassword" validate=validate.password value=''}}}
            
                        </ul>
                        <div class="profile__actions">
                            {{{ Button label="Сохранить" className="profile__btn" onClick=onSave}}}
                        </div>
                    </div>
                </div>
            </form>
        `);
    }
}