import Block from '../../core/Block';

/*
import button from "./button.hbs?raw";
*/

interface IProps {
  className?: string,
  label: string,
  page?: string,
  onClick?: () => void
}

export class Button extends Block {
  constructor(props: IProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick
    };
  }

  protected render(): string {
    const {
      className,
      label,
      page,
      type
    } = this.props;
    return (`
            <button type="button" class="buttonBlue ${className ? className : ''}" ${page ? `page="${page}"` : ''}>
                ${label}
                ${type ? '<img src="/img/svg/send-message-icon.svg" alt="options">' : ''}
            </button>
        `);
  }
}
