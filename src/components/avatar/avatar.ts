import Block from "../../core/Block";

interface Props {
  onChange: () => void;
}

type Refs = {
  input: HTMLInputElement,
}

export class Avatar extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        change: props.onChange
      }
    });
  }

  protected render(): string {
    return (`
        <input accept="image/*" class="profile__avaInput hidden" id="fileElem" ref="fileInput"
                       type="file" />
    `);
  }
}
