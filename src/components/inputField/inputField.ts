import Block from "../../core/Block";
import { ErrorValid } from "../errorValid";
import { Input } from "../input";

interface Props {
  onBlur: () => void;
  type: string,
  name: string,
  label: string,
  validate?: (value: string) => false | string
}

type Refs = {
  input: Input,
  error: ErrorValid,
}

export class InputField extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      onBlur: () => this.validate()
    });
  }

  value() {
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
    this.refs.error.setProps({ error: "" });
    return true;
  }

  protected render(): string {
    const {
      label
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
