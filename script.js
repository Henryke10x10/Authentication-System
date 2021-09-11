let btnEye = document.querySelector('.fa-eye')
let btnEye2 = document.querySelector('.fa-eye2')

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let valideUsuario = false

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let valideNome = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let valideSenha = false

let confirmaSenha = document.querySelector('#confirmaSenha')
let labelConfirmaSenha = document.querySelector('#labelConfirmaSenha')
let valideConfirmaSenha = false

let textoErro = document.querySelector('#erro')
let textoSucesso = document.querySelector('#sucesso')


//Botão para ver senha
btnEye.addEventListener('click', ()=> {
    let inputSenha = document.querySelector('#senha')
    
    if(inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text')
    } else {
        inputSenha.setAttribute('type', 'password')
    }
})


//Botão para ver senha 2
btnEye2.addEventListener('click', ()=> {
    let confirmaSenha = document.querySelector('#confirmaSenha')
    
    if(confirmaSenha.getAttribute('type') == 'password') {
        confirmaSenha.setAttribute('type', 'text')
    } else {
        confirmaSenha.setAttribute('type', 'password')
    }
})


//Verificação d caracteres
usuario.addEventListener('keyup', ()=> {
    if(usuario.value.length < 5) {
        labelUsuario.setAttribute('style', 'color: red')
        labelUsuario.innerHTML = `
            <p> Insira no minimo 5 caracteres </p>
        `
        usuario.setAttribute('style', 'border-bottom: 2px solid red')
        valideUsuario = false
    } else {
        labelUsuario.setAttribute('style', 'color: #4038a0')
        labelUsuario.innerHTML = `
            <p>Usuario</p>
        `
        usuario.setAttribute('style', 'border-bottom: 2px solid #4038a0')
        valideUsuario = true
    }
})

//Verificação d caracteres
nome.addEventListener('keyup', ()=> {
    if(nome.value.length < 3) {
        labelNome.setAttribute('style', 'color: red')
        labelNome.innerHTML = `
            <p> Insira no minimo 3 caracteres </p>
        `
        nome.setAttribute('style', 'border-bottom: 2px solid red')
        valideNome = false
    } else {
        labelNome.setAttribute('style', 'color: #4038a0')
        labelNome.innerHTML = `
            <p>Nome</p>
        `
        nome.setAttribute('style', 'border-bottom: 2px solid #4038a0')
        valideNome = true
    }
})

//Verificação d caracteres
senha.addEventListener('keyup', ()=> {
    if(senha.value.length < 6) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = `
            <p> Insira no minimo 6 caracteres </p>
        `
        senha.setAttribute('style', 'border-bottom: 2px solid red')
        valideSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: #4038a0')
        labelSenha.innerHTML = `
            <p>Senha</p>
        `
        senha.setAttribute('style', 'border-bottom: 2px solid #4038a0')
        valideSenha = true
    }
})

//Verificação d caracteres
confirmaSenha.addEventListener('keyup', ()=> {
    if(confirmaSenha.value != senha.value) {

        labelConfirmaSenha.setAttribute('style', 'color: red')
        labelConfirmaSenha.innerHTML = `
            <p> As senhas não conferem </p>
        `
        senha.setAttribute('style', 'border-bottom: 2px solid red')
        valideConfirmaSenha = false
    } else {
        labelConfirmaSenha.setAttribute('style', 'color: #4038a0')
        labelConfirmaSenha.innerHTML = `
            <p>Confirmar senha</p>
        `
        senha.setAttribute('style', 'border-bottom: 2px solid #4038a0')
        valideConfirmaSenha = true
    }
})



function cadastrar() {
    if(valideNome && valideSenha && valideUsuario && valideConfirmaSenha) {
        
        //Cadastro no localStorage
        let listaUsuario = JSON.parse(localStorage.getItem('listaUsuario') || '[]')

        listaUsuario.push(
            {
                nome: nome.value,
                usuario: usuario.value,
                senha: senha.value
            }
        )

        localStorage.setItem('listaUsuario', JSON.stringify(listaUsuario))

        textoSucesso.setAttribute('style', 'display: block')
        textoErro.setAttribute('style', 'display: none')

        setTimeout(()=> {
            window.location.href = 'index.html'
        }, 2500)

    } else {
        textoErro.setAttribute('style', 'display: block')
        textoSucesso.setAttribute('style', 'display: none')
    }
}



function entrar() {
    let usuario = document.querySelector('#usuario')
    let usuarioLabel = document.querySelector('#usuarioLabel')

    let senha = document.querySelector('#senha')
    let senhaLabel = document.querySelector('#senhaLabel')

    let msgErro = document.querySelector('#msgErro')
    let listaUsuario = []

    //Ciando lista
    let userValide = {
        nome: '',
        usuario: '',
        senha: ''
    }

    listaUsuario = JSON.parse(localStorage.getItem('listaUsuario'))

    //Preenchendo lista
    listaUsuario.forEach((item) => {
        if(usuario.value == item.usuario && senha.value == item.senha) {
            userValide = {
                nome: item.nome,
                usuario: item.usuario,
                senha: item.senha
            }
        }
    })


    //Verificação de usuário cadastrado no localStorage
    if(usuario.value == userValide.usuario && senha.value == userValide.senha && usuario.value != '' && senha.value != '') {
        usuarioLabel.setAttribute('style', 'color: #272262')
        usuario.setAttribute('style', 'border-color: #4038a0')

        senhaLabel.setAttribute('style', 'color: #272262')
        senha.setAttribute('style', 'border-color: #4038a0')

        msgErro.setAttribute('style', 'display: none')

        console.log(userValide)
        window.location.href = 'home.html'

        let token = Math.random().toString(16).substr(2)
        localStorage.setItem('token', token)
        
        localStorage.setItem('userLogado', JSON.stringify(userValide))
    }  else {
        usuarioLabel.setAttribute('style', 'color: red')
        usuario.setAttribute('style', 'border-color: red')

        senhaLabel.setAttribute('style', 'color: red')
        senha.setAttribute('style', 'border-color: red')

        msgErro.setAttribute('style', 'display: block')
        msgErro.innerHTML = 'Usuario ou senha incorretos'
        usuario.focus()
        
    }

}

//Botão sair
function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('userLogado')
    window.location.href = 'index.html'
}

