import Block from '../../core/Block';

interface IProps {
  label: string,
  edit: boolean,
  value: string,
  name: string,
  type: string,
  onBlur: () => void;
}

export class ProfileInput extends Block {

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
      edit,
      name,
      type,
      value,
      error
    } = this.props;
    return (`
      <input class="profileValue ${edit ? 'profileValue_edit' : ''} ${!!error ? 'profileValue_error' : ''}"  name="${name}" type="${type}" ref="input" value="${value}"/>
        `);
  }
}
