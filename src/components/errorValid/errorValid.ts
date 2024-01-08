import Block from '../../core/Block';

export class ErrorValid extends Block {
    protected render(): string {
        return (`
                <div class="fieldError">{{error}}</div>
        `);
    }
}
