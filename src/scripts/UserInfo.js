export default class UserInfo {
    constructor({ name, about, avatar, userId }) {
      this._name = document.querySelector(name);
      this._about = document.querySelector(about);
      this.avatar = document.querySelector(avatar);
      this._userId = userId;
    }
    getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this.avatar.src,
        userId: this._userId
      };
    }
    setUserInfo(name, about, avatar, userId) {
      this._name.textContent = name;
      this._about.textContent = about;
      this.avatar.src = avatar;
      this.userId = userId;
    }
  }