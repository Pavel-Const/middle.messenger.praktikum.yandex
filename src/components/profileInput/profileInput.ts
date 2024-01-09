import Block from '../../core/Block';

interface Props {
  edit: boolean,
  value: string,
  name: string,
  type: string,
  error: string,
  onBlur: () => void;
}

type Refs = {
  input: HTMLInputElement,
}
export class ProfileInput extends Block<Props, Refs> {

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
