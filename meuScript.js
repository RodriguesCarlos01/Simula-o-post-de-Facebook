// Classe PacoteBuscador para fazer requisições HTTP

class PacoteBuscador {
	constructor(baseURL) {
			this.baseURL = baseURL;
	}

		// Método para fazer uma requisição GET
	get(endpoint) {
			return fetch(this.baseURL + endpoint)
					.then(response => response.json());
	}

		// Método para fazer uma requisição PUT
	put(endpoint, body) {
			return this._send("put", endpoint, body);
	}

	    // Método para fazer uma requisição POST
	post(endpoint, body) {
			return this._send("post", endpoint, body);
	}

		// Método para fazer uma requisição DELETE
	delete(endpoint, body) {
			return this._send("delete", endpoint, body);
	}

		// Método privado para enviar a requisição
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

// Selecionando elementos do DOM
let formulario = document.querySelector("#formulario")
let titulo = document.querySelector("#titulo-post")
let conteudo = document.querySelector("#paragrafo-post")
let botao = document.querySelector(".botao")
let postagem = document.querySelector(".postagem")

// Event listener para o formulário
formulario.addEventListener("submit", event => {
	event.preventDefault()

		// Criando uma instância da classe PacoteBuscador
	const API = new PacoteBuscador(`https://jsonplaceholder.typicode.com`)

	// Limpando o conteúdo da postagem
	postagem.textContent=""

		// Enviando uma requisição POST para criar um novo post
	API.post("/posts", data = {
		title:titulo.value,
		body:conteudo.value, 
		userId:1
	}).then(data => {
			console.log(data)
	})
	// Inserindo o novo post na página
	postagem.insertAdjacentHTML(
		"afterbegin", `
		<h2>${data.title}</h2>    
		<p>${data.body}</p>
		`                        
	);
	// Limpando os campos do formulário
	titulo.value=""             
	conteudo.value=""
	
	// Fazendo uma requisição GET para obter os posts do usuário 1
		API.get("/posts?userId=1").then(data => {
			console.log(data)
		})

})




