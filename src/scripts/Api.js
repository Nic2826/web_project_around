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

    getUserInfo(){
        return fetch(`${this.baseUrl}/users/me`, {
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

    updateUserInfo(data){
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
              name: data.name, 
              about: data.about})
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

    postCards(card){
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ 
              //hacer que esto cambie con el input del usuario-----------------------------------------
              name: card.name,
              link: card.link,
            })
          }).then(res => res.json())
    }
  
    // otros métodos para trabajar con la API
  }
  