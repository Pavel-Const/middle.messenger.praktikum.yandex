import Block from "../../core/Block";

interface IProps {
    className?: string,
    label: string,
    page: string,
    onClick?: () => void
}

export class Link extends Block {
    constructor(props: IProps) {
        super(props);
    }

    protected init(): void {
        this.props.events = {
            click: this.props.onClick
        }
    }

    protected render(): string {
        const { className, label, page } = this.props;
        return (`
            <button type="button" class="linkBlue ${className? className : ''}" ${page ? `page="${page}"` : ''}>
                ${label}
            </button>
        `)
    }
}