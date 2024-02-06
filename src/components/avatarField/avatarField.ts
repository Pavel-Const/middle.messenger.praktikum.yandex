import Block from "../../core/Block";
import { editAvatar } from "../../services/user.ts";

interface Props {
  edit: boolean,
  src: string,
}

type Refs = {
  input: HTMLInputElement,
}

export class AvatarField extends Block<Props, Refs> {
  constructor(props: Props) {
    super({
      ...props,
      onChange: (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
          return;
        }
        const file = input.files[0];
        this.previewAvatar(file);
        this.uploadAvatar(file);
      }
    });
  }

  previewAvatar(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.querySelector(".profile__ava img") as HTMLImageElement;
      if (img && e.target) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  uploadAvatar(file: File): void {
    const formData = new FormData();
    formData.append("avatar", file);
    editAvatar(formData).catch(error => console.log(error) /* this.refs.errorLine.setProps({error}) */);
  }

  protected render(): string {
    const avatarSrc = `https://ya-praktikum.tech/api/v2/resources/${this.props.src}` || "/img/ava-default.png";
    return (`
      <label class="profile__ava {{#if edit}}profile__ava_edit{{/if}}" >
        <img src="${avatarSrc}" alt="avatarImage">
        {{#if edit}}{{{ Avatar onChange=onChange }}}{{/if}}
        <div class="profile__avaHov">Поменять аватар</div>
      </label>
    `);
  }
}
