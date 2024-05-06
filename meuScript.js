class PacoteBuscador {
	constructor(baseURL) {
			this.baseURL = baseURL;
	}

	get(endpoint) {
			return fetch(this.baseURL + endpoint)
					.then(response => response.json());
	}

	put(endpoint, body) {
			return this._send("put", endpoint, body);
	}

	post(endpoint, body) {
			return this._send("post", endpoint, body);
	}

	delete(endpoint, body) {
			return this._send("delete", endpoint, body);
	}

	_send(method, endpoint, body) {
			return fetch(this.baseURL + endpoint, {
					method,
					headers: {
							"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
			}).then(response => response.json());
	}
}

let formulario = document.querySelector("#formulario")
let titulo = document.querySelector("#titulo-post")
let conteudo = document.querySelector("#paragrafo-post")
let botao = document.querySelector(".botao")
let postagem = document.querySelector(".postagem")

formulario.addEventListener("submit", event => {
	event.preventDefault()

	const API = new PacoteBuscador(`https://jsonplaceholder.typicode.com`)

	API.post("/posts", data = {
		title:titulo.value,
		body:conteudo.value, 
		userId:1
	}).then(data => {
			console.log(data)
	})
	postagem.insertAdjacentHTML(
		"afterbegin", `
		<h2>${data.title}</h2> 
		<p>${data.body}</p>
		`);


		API.get("/posts").then(data => {
			console.log(data)
		})

})




