import Block from '../../core/Block';

interface IProps {
    onBlur: () => void;
    type: string,
    name: string,
    label: string
}

export class Input extends Block {
    constructor(props: IProps) {
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
