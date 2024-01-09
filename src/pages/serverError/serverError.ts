import Block from '../../core/Block';

export class ServerErrorPage extends Block<{}> {
    constructor() {
        super({});
    }

    protected render(): string {
        return (`
                {{{ErrorBlock title="500" description="Мы уже фиксим"}}}          
        `);
    }
}
