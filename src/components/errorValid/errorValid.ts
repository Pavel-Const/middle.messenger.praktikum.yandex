import Block from '../../core/Block';

interface Props {
    error: string,
}

type Refs = {}

export class ErrorValid extends Block<Props, Refs> {
    protected render(): string {
        return (`
                <div class="fieldError">{{error}}</div>
        `);
    }
}
