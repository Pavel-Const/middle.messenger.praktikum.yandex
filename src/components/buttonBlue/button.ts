import Block from '../../core/Block';

/*
import button from "./button.hbs?raw";
*/

interface Props {
  className?: string,
  label: string,
  type: string,
  page?: string,
  onClick: () => void,
  events: { click: (e: Event) => void },
}


export class Button extends Block<Props> {
  constructor(props: Props) {
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
