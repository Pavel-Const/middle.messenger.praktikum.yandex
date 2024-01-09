import Block from '../../core/Block';

interface Props {
    onBlur: () => void;
    type: string,
    name: string,
    label: string
}
type Refs = {
    input: HTMLInputElement,
}
export class Input extends Block<Props, Refs> {
    constructor(props: Props) {
        super({
            ...props,
            events: {
                blur: props.onBlur
            }
        });
    }



    protected render(): string {
        const {
            type,
            name,
        } = this.props;
        return (`
            <input type="${type}" name="${name}" class="fieldInput" placeholder="" ref="input">
        `);
    }
}
