import Block from '../../core/Block';
import * as validators from '../../utils/validators';
import { InputField } from '../../components';

interface Props {
    validate: {
        login: (value: string) => boolean | string
    },
    onReg: (e: Event) => void,
}

type Refs = {
    message: InputField,
}
export class ChatsPage extends Block<Props, Refs> {
    constructor() {
        super({
            validate: {
                message: validators.message
            },
            onSend: (event: any) => {
                event.preventDefault();
                const message = this.refs.message.value();
                console.log({
                    message
                });
            }
        });
    }

    protected render(): string {
        return (`
            <div class="chat">
                <div class="chat__aside">
                    <div class="chat__asideHead">
                        <div class="chat__asideLink">Профиль
                            <img src="/img/svg/arrow-right.svg" alt="arrow">
                        </div>
                        <div class="chat__asideSearch">
                            <input type="text" class="chat__asideSearchInput" placeholder="Поиск">
                            <img src="/img/svg/search-icon.svg" alt="arrow">
                        </div>
                    </div>
                    <div class="chat__asideList">
                        {{{ ChatItem ava="" name="Андрей" last="Изображение" my="true" time="10:49" count="2"}}}
                        {{{ ChatItem ava="" name="Павел" last="Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!"  time="10:49" count="4"}}}
                        {{{ ChatItem ava="" name="Павел" last="Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!"  time="10:49" count="4"}}}
                        {{{ ChatItem ava="" name="Павел" last="Друзья, у меня для вас особенный выпуск новостей!Друзья, у меня для вас особенный выпуск новостей!"  time="10:49" count="4"}}}          
                    </div>
                </div>
                <div class="chat__content">
                    <div class="chat__contentHead">
                        <div class="chat__box">
                            <div class="chat__contentAva"></div>
                            <div class="chat__contentName">Имя</div>
                        </div>
                        <div class="chat__contentOptions">
                            <img src="/img/svg/options-icon.svg" alt="options">
                        </div>
                    </div>
                    <div class="chat__contentBody">
                        <div class="chat__contentDate">19 июня</div>
                        {{{ MessageItem text="Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро." time="11:56"}}}
                        {{{ MessageItem text="Круто!" my="true" time="11:56"}}}
                        {{{ MessageItem text="Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро." time="11:56"}}}
                        {{{ MessageItem text="Круто!" my="true" time="11:56"}}}
                        {{{ MessageItem text="Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро." time="11:56"}}}
                        {{{ MessageItem text="Круто!" my="true" time="11:56"}}}
                        {{{ MessageItem text="Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро." time="11:56"}}}
                        {{{ MessageItem text="Круто!" my="true" time="11:56"}}}
                    </div>
                    <div class="chat__contentBottom">
                        <img src="/img/svg/message-options-icon.svg" alt="options">
                        {{{InputField type="text" label="" name="message" ref="message" validate=validate.message}}}
                        {{{ Button label="" onClick=onSend type='send' className='chat__contentSend'}}}
                    </div>
                </div>
            </div>
        `);
    }
}