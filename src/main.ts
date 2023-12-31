import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


const pages = {
    'login': [Pages.LoginPage, {test: '123'}],
    'registration': [Pages.RegistrationPage, {test: '123'}],
    '404': [Pages.NotFoundPage, {test: '123'}],
    '500': [Pages.ServerErrorPage, {test: '123'}],
    'profile': [Pages.ProfilePage, {test: '123'}],
    'edit-profile': [Pages.ProfileEditPage, {test: '123'}],
    'change-password': [Pages.PasswordEditPage, {test: '123'}],
    'chats': [Pages.ChatsPage, {test: '123'}],
};

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
    //@ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
