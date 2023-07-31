let userlog = JSON.parse(localStorage.getItem('usuarioLogado'))

document.getElementById('user').innerHTML = `Olá, ${userlog.username}`

function Logout(){
    localStorage.setItem('usuarioLogado', JSON.stringify({ username: ''}))
    window.location.href = 'index.html'
}




if (userlog == '') {
  
    
   
} 





if (userlog.username!== '') {
    
    console.log("Usuário logado:" + userlog.username)
    
} else {
    // O usuário não está logado, talvez exiba uma mensagem convidando-o a fazer login
    window.location.href = 'Index.html'
    // Outras ações quando nenhum usuário está logado...
}
