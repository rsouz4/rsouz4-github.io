function enviaDado(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    axios.post('https://todolist-api.edsonmelo.com.br/api/user/login/', {
        password: password,
        username: username
    })
        .then(function (response) {
            if (response.data.message == 'Incorrect username and/or password' || response.data.message == "Invalid Arguments Number (Expected Two)") {
                alert('Usuário desconhecido');


            } else {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                sessionStorage.setItem('idUser', response.data.id);


                window.location.href = "to-do-list.html";

            };
            console.log(response.data);

        })
        .catch(function (error) {
            console.log(error);

        });



}
