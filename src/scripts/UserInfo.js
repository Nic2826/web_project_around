export default class UserInfo {
    constructor({ name, about, avatar, id }) {
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
      this._id = id;
      this.avatar = document.querySelector(avatar);
    }
    getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this.avatar.src,
        id: this._userId.textContent
      };
    }
    setUserInfo(name, about, avatar, id) {
      this._name.textContent = name;
      this._about.textContent = about;
      this.avatar.src = avatar;
      this._id = id;
    }
  }