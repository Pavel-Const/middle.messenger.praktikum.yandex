import Block from "../../core/Block";
import { ProfileInput } from "../profileInput";

interface Props {
  label: string,
  edit: boolean,
  value: string,
  name: string,
  type: string,
  validate?: (value: string) => false | string
}
type Refs = {
  input: ProfileInput,
}

export class ProfileItem extends Block<Props, Refs> {
  constructor(props: Props) {
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
      this.refs.input.setProps({
        edit: true,
        name: "",
        onBlur(): void {
        },
        type: "",
        error,
        value
      });
      return false;
    }
    this.refs.input.setProps({
      edit: true,
      name: "",
      onBlur(): void {
      },
      type: "",
      error: "",
      value
    });
    return true;
  }

  protected render(): string {
    const {
      label
    } = this.props;
    return (`
           <li class="profileItem">
                <div class="profileName">${label}</div>
                {{{ProfileInput ref='input' value=value edit=edit name=name type=type onBlur=onBlur}}}
            </li>
        `);
  }
}
