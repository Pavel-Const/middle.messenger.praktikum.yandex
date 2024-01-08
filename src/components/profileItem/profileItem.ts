import Block from '../../core/Block';

interface IProps {
  label: string,
  edit: boolean,
  value: string,
  name: string,
  type: string,

}

export class ProfileItem extends Block {
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
      this.refs.input.setProps({ error, value });
      return false;
    }
    this.refs.input.setProps({ error: undefined, value });
    return true;
  }

  protected render(): string {
    const {
      label,
    } = this.props;
    return (`
            <li class="profileItem">
                <div class="profileName">${label}</div>
                {{{ProfileInput ref='input' value=value edit=edit name=name type=type onBlur=onBlur}}}
            </li>
        `);
  }
}
