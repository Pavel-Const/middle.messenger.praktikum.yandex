import Block from '../../core/Block';


export class NotFoundPage extends Block<{}> {
    constructor() {
        super({});
    }

    protected render(): string {
        return (`
                {{{ErrorBlock title="404" description="Не туда попали"}}}          
        `);
    }
}
