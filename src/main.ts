import './styles/style.scss'
import './styles/_reset.scss'
import './styles/forms.scss'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <form class="formBlock">
    <div class="formBlock__head">
        <div class="formBlock__title">Вход</div>
        <div class="formBlock__box">
            <div class="formBlock__field">
                <input type="text" class="formBlock__fieldInput" placeholder="">
                <div class="formBlock__fieldTitle">Логин</div>
                <div class="formBlock__fieldError">Ошибка</div>
            </div>
            <div class="formBlock__field">
                <input type="password" class="formBlock__fieldInput" placeholder="">
                <div class="formBlock__fieldTitle">Пароль</div>
                <div class="formBlock__fieldError">Ошибка</div>
            </div>
        </div>
    </div>
    <div class="formBlock__actions">
        <div class="btnBlue formBlock__btn">Авторизоваться</div>
        <a href="#" class="formBlock__link">Нет аккаунта?</a>
    </div>
  </form>
`


