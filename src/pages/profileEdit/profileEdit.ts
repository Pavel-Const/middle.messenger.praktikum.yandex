import Block from "../../core/Block";
import * as validators from "../../utils/validators";
import { ProfileItem } from "../../components";
import { connect } from "../../utils/connect";

interface Props {
  validate: {
    login: (value: string) => boolean | string
  },
  onReg: (e: Event) => void,
}

type Refs = {
  login: ProfileItem,
  password: ProfileItem,
  email: ProfileItem,
  first_name: ProfileItem,
  second_name: ProfileItem,
  phone: ProfileItem,
  repeatPassword: ProfileItem,
  display_name: ProfileItem,
}

export class ProfileEditPage extends Block<Props, Refs> {
  constructor() {
    super({
      validate: {
        login: validators.login,
        email: validators.email,
        names: validators.names,
        password: validators.password,
        phone: validators.phone
      },
      onSave: (event: Event) => {
        event.preventDefault();
        const login = this.refs.login.value();
        const email = this.refs.email.value();
        const first_name = this.refs.first_name.value();
        const second_name = this.refs.second_name.value();
        const phone = this.refs.phone.value();
        const display_name = this.refs.display_name.value();
        console.log({
          login,
          email,
          first_name,
          second_name,
          phone,
          display_name
        });
      }
    });
    
  }

/*  componentDidMount() {
    initApp();
  }*/

  protected render(): string {
    return (`
      <form class="profile">
        <div class="profile__back">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" page="/settings">
            <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3" page="/settings"/>
            <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white" page="/settings"/>
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
              {{{ ProfileItem name="email" type="text" label="Почта" value=user.email  edit="true" ref="email" validate=validate.email}}}
              {{{ ProfileItem name="login" type="text" label="Логин" value=user.login edit="true" ref="login" validate=validate.login}}}
              {{{ ProfileItem name="first_name" type="text" label="Имя" value=user.firstName edit="true" ref="first_name" validate=validate.names}}}
              {{{ ProfileItem name="second_name" type="text" label="Фамилия" value=user.secondName edit="true" ref="second_name" validate=validate.names}}}
              {{{ ProfileItem name="display_name" type="text" label="Имя в чате" value=user.displayName edit="true" ref="display_name" validate=validate.names}}}
              {{{ ProfileItem name="phone" type="number" label="Телефон" value=user.phone edit="true" ref="phone" validate=validate.phone}}}
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
// @ts-ignore
export default connect(({ user }) => ({ user }))(ProfileEditPage);
