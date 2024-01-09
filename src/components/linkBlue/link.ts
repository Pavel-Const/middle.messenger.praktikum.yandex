import Block from "../../core/Block";

interface IProps {
    className?: string,
    label: string,
    page: string,
}

export class Link extends Block<IProps> {
    constructor(props: IProps) {
        super(props);
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
