export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // si el servidor devuelve un error, rechaza el promise
        return Promise.reject(`Error: ${res.status}`)
          .catch((err) => {
            console.log(err); // registra el error en la consola
          });
      })

  }

  async getUserInfo() {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
    return await res.json();
  }

  async updateUserInfo(data) {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        userId: data._id
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // si el servidor devuelve un error, rechaza el promise
        return Promise.reject(`Error: ${res.status}`)
          .catch((err) => {
            console.log(err); // registra el error en la consola
          });
      })
    // return await res.json();
  }

  async updateAvatar(data) {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // si el servidor devuelve un error, rechaza el promise
        return Promise.reject(`Error: ${res.status}`)
          .catch((err) => {
            console.log(err); // registra el error en la consola
          });
      })
    // return await res.json();
  }

  async postCards(card) {
    const res = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })

     return await res.json();
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`)
        .catch((err) => {
          console.log(err); // registra el error en la consola
        });
    })
    // return await res.json();
  }

   addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`)
        .catch((err) => {
          console.log(err); // registra el error en la consola
        });
    })
  }

   deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`)
        .catch((err) => {
          console.log(err); // registra el error en la consola
        });
    })
  }
}
