import Block from '../../core/Block';

interface IProps {
  onBlur: () => void;
  type: string,
  name: string,
  label: string
}

export class InputField extends Block {

  constructor(props: IProps) {
    super({
      ...props,
      onBlur: () => this.validate()
    });
  }

  public value() {
    if (!this.validate()) {
      return null;
    }
    return (this.refs.input.element as HTMLInputElement)?.value;
  }

  private validate() {
    const value = (this.refs.input.element as HTMLInputElement)?.value;
    const error = this.props.validate?.(value);

    if (error) {
      this.refs.error.setProps({ error });
      return false;
    }
    this.refs.error.setProps({ error: undefined });
    return true;
  }

  protected render(): string {
    const {
      label,
    } = this.props;
    return (`
      <label class="field">
        {{{ Input
                type=type
                ref="input"
                onBlur=onBlur
                name=name
        }}}
        <div class="fieldTitle">${label}</div>
        {{{ErrorValid error=error ref="error"}}}
      </label>
        `);
  }
}
