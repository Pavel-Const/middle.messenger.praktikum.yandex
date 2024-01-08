import Block from '../../core/Block';
import * as validators from '../../utils/validators';

export class ProfileEditPage extends Block {
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
                      {{{ ProfileItem name="email" type="text" label="Почта" value="pochta@yandex.ru" edit="true" ref="email" validate=validate.email}}}
                      {{{ ProfileItem name="login" type="text" label="Логин" value="ivanivanov" edit="true" ref="login" validate=validate.login}}}
                      {{{ ProfileItem name="first_name" type="text" label="Имя" value="Иван" edit="true" ref="first_name" validate=validate.names}}}
                      {{{ ProfileItem name="second_name" type="text" label="Фамилия" value="Иванов" edit="true" ref="second_name" validate=validate.names}}}
                      {{{ ProfileItem name="display_name" type="text" label="Имя в чате" value="Иван" edit="true" ref="display_name" validate=validate.names}}}
                      {{{ ProfileItem name="phone" type="number" label="Телефон" value="56454644564456" edit="true" ref="phone" validate=validate.phone}}}
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
