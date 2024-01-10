import Block from "../../core/Block";

interface IProps {
    title: string,
    description: string,
}

export class ErrorBlock extends Block<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    protected render(): string {
        const { title, description } = this.props;
        return (`
            <div class="errorBlock">
                <h1 class="errorBlock__title">${title}</h1>
                <div class="errorBlock__message">${description}</div>
                {{{ Link label="Назад к чатам" className="errorBlock__link" page="chats"}}}
            </div>
        `)
    }
}
