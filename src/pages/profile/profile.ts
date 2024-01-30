import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import { logout } from "../../services/auth";
import { UserDTO } from "../../api/type.ts";
class ProfilePage extends Block<{}> {
  constructor(props: UserDTO) {
    super({
      ...props,
      logout: logout
    });
  }

  protected render(): string {
    return (`
            <div class="profile">
                <div class="profile__back">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" page="/">
                        <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3" page="/"/>
                        <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white" page="/"/>
                        <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6" page="/"/>
                    </svg>
                </div>
                <div class="profile__wrapper">
                    <div class="profile__content">
                        <div class="profile__ava" >
                            <img src="/img/ava-default.png" alt="avatarImage">
                            <div class="profile__avaHov">Поменять аватар</div>
                        </div>
                        <div class="profile__name">Иван</div>
                        <ul class="profile__infoList">
                            {{{ ProfileItem name="email" label="Почта" value=user.email}}}
                            {{{ ProfileItem name="login" label="Логин" value=user.login}}}
                            {{{ ProfileItem name="first_name" label="Имя" value=user.firstName}}}
                            {{{ ProfileItem name="second_name" label="Фамилия" value=user.secondName}}}
                            {{{ ProfileItem name="display_name" label="Имя в чате" value=user.displayName}}}
                            {{{ ProfileItem name="phone" label="Телефон" value=user.phone}}}
                        </ul>
                        <nav class="profile__actions">
                            {{{ Link label="Изменить данные" className="profile__link" page="/settings-edit"}}}
                            {{{ Link label="Изменить пароль" className="profile__link" page="/settings-password"}}}
                            {{{ Link label="Выйти" className="profile__link profile__link_red" onClick=logout}}}
                        </nav>
                    </div>
                </div>
            </div>
        `);
  }
}
export default connect(({ user }) => ({ user }))(ProfilePage);
