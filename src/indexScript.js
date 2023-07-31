function abrirCadastro() {
    fadeOut('meioLogin', function () {
        document.getElementById('meioLogin').style.display = 'none'
        document.getElementById('meioCadastro').style.display = 'flex'
        fadeIn('meioCadastro')
    })
    limparCampos()
}

function abrirLogin() {
    fadeOut('meioCadastro', function () {
        document.getElementById('meioCadastro').style.display = 'none'
        document.getElementById('meioLogin').style.display = 'flex'
        fadeIn('meioLogin')
    })

    limparCampos()
}

function fadeIn(elementId) {
    var element = document.getElementById(elementId)
    element.style.opacity = 0

    var tick = function () {
        element.style.opacity = +element.style.opacity + 0.04

        if (+element.style.opacity < 1) {
            setTimeout(tick, 7) 
        }
    }

    tick()
}

function fadeOut(elementId, callback) {
    var element = document.getElementById(elementId)
    element.style.opacity = 1

    var tick = function () {
        element.style.opacity = +element.style.opacity - 0.04

        if (+element.style.opacity > 0) {
            setTimeout(tick, 7) 
        } else {
            callback()
        }
    }

    tick()
}

// Função para limpar os campos de input
function limparCampos() {
    document.getElementById('inptUser').value = ''
    document.getElementById('inptPass').value = ''
    document.getElementById('inptUserCad').value = ''
    document.getElementById('inptPassCad').value = ''
    document.getElementById('inptConfirmPass').value = ''
}

/////////////////////////////

let userCad = document.getElementById('inptUserCad')
let passCad = document.getElementById('inptPassCad')
let ConfirmPass = document.getElementById('inptConfirmPass')



function Cadastrar() {
    let username = userCad.value
    let password = passCad.value
    let confirmPassword = ConfirmPass.value

    let cadastroData = {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }

    if (localStorage.getItem('cadastro')) {
        let existingData = JSON.parse(localStorage.getItem('cadastro'))
        Object.assign(existingData, cadastroData)
        localStorage.setItem('cadastro', JSON.stringify(existingData))
    } else {
        localStorage.setItem('cadastro', JSON.stringify(cadastroData))
    }

    console.log(cadastroData.username)
    console.log(cadastroData.password)
    console.log(cadastroData.confirmPassword)

    salvarCadastro()
}

function salvarCadastro() {
    let username = userCad.value.trim()
    let password = passCad.value.trim()
    let confirmPassword = ConfirmPass.value.trim()

    if (!username) {
        document.getElementById('erroCadastro').innerHTML = "Preencha o campo de nome de usuário!"
        return
    }

    if (!password) {
        document.getElementById('erroCadastro').innerHTML = "Preencha o campo de senha!"
        return
    }

    if (!confirmPassword) {
        document.getElementById('erroCadastro').innerHTML = "Preencha o campo de confirmação de senha!"
        return
    }

    if (localStorage.getItem('cadastro')) {
        let cadastroData = JSON.parse(localStorage.getItem('cadastro'))
        if (cadastroData.hasOwnProperty(username)) {
            document.getElementById('erroCadastro').innerHTML = "Usuário já existe! Escolha outro nome de usuário!"
            return
        }
    } else {
        localStorage.setItem('cadastro', JSON.stringify({}))
    }

    if (password !== confirmPassword) {
        document.getElementById('erroCadastro').innerHTML = "A senha e a confirmação de senha não correspondem!"
        return
    }

    let cadastroData = JSON.parse(localStorage.getItem('cadastro'))
    cadastroData[username] = {
        password: password
    }

    localStorage.setItem('cadastro', JSON.stringify(cadastroData))

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cadastro realizado',
        showConfirmButton: false,
        timer: 1500,
        iconColor: '#72a5ab',
        didClose: () => {
            preencheDivLogin()
        }
    })
}



function Entrar() {
    let username = document.getElementById('inptUser').value.trim()
    let password = document.getElementById('inptPass').value.trim()

    // Verifica se os campos de nome de usuário e senha estão preenchidos
    if (!username || !password) {
        document.getElementById('erroLogin').innerHTML = "Preencha todos os campos!"
        return
    }

    // Obtém os dados de cadastro do localStorage
    if (localStorage.getItem('cadastro')) {
        let cadastroData = JSON.parse(localStorage.getItem('cadastro'))
        if (cadastroData && cadastroData.hasOwnProperty(username)) {

            // Verifica se a senha informada corresponde à senha cadastrada
            if (cadastroData[username].password === password) {

                // Define o usuário logado no localStorage
                localStorage.setItem('usuarioLogado', JSON.stringify({ username: username }))

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login bem-sucedido!',
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: '#72a5ab',
                    didClose: () => {
                        redirecionar()
                    }
                })
                return
            }
        }
    }

    // Caso os dados de login estejam incorretos
    document.getElementById('erroLogin').innerHTML = "Nome de usuário ou senha incorretos"
}




function preencheDivLogin() {
    fadeOut('meioCadastro', function () {
        document.getElementById('meioCadastro').style.display = 'none'
        document.getElementById('meioLogin').style.display = 'flex'
        fadeIn('meioLogin')

        // Obter os dados de cadastro do localStorage
        if (localStorage.getItem('cadastro')) {
            let cadastroData = JSON.parse(localStorage.getItem('cadastro'))
            if (cadastroData) {
                let username = cadastroData.username
                let password = cadastroData.password

                // Preencher os campos de login com os dados do cadastro
                document.getElementById('inptUser').value = username
                document.getElementById('inptPass').value = password
            }
        }
    })
    
}


function redirecionar() {
    window.location.href = 'home.html'
}

        
function obterUsuarioLogado() {
    if (localStorage.getItem('usuarioLogado')) {
        return JSON.parse(localStorage.getItem('usuarioLogado'))
    }
}








