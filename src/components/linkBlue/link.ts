import Block from "../../core/Block";

interface IProps {
    className?: string,
    label: string,
    page: string,
    events: {
      click: (e: Event) => void
    }
  onClick: () => void,
}

export class Link extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick
    };
  }

  protected render(): string {
    const { className, label, page } = this.props;
    return (`
            <button type="button" class="linkBlue ${className || ""}" ${page ? `page="${page}"` : ""}>
                ${label}
            </button>
        `);
  }
}
