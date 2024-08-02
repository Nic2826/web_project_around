export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getInitialCards() {
    return await fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });

  }

  async getUserInfo() {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

  async updateUserInfo(data) {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

   async updateAvatar(data) {
    return await fetch(`${this.baseUrl}/users/me/avatar`, {
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
          
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

   postCards(card) {
    return  fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

   async deleteCard(cardId) {
    return await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      console.log("api",result);
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

   async addLike(cardId) {
    return await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
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
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }
}
