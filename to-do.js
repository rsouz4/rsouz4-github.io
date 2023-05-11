
function enviaDadoToDo(event) {
    event.preventDefault();

    const name = document.getElementById("newTaskName").value;
    const description = document.getElementById("newTaskDescription").value;

    axios.post('https://todolist-api.edsonmelo.com.br/api/task/new/', {
        name: name,
    }, {
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',

        }
    })
        .then(function (response) {
            console.log(response.data);
            //const novaTarefa = response.data;
            const tableBody = document.getElementById('tableBody');
            const novaLinha = `
                <tr>
                    <th scope="row">${getRandomId()}</th>
                    <td>${name}</td>
                    <td>${description}</td>
                    <td>0</td>
                    <td>${gerarData()}</td>

                    <td>
                        <button class="btn btn-sm btn-warning"">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="excluiTarefa(${response.data.id})">Excluir</button>
                        </td>
                </tr>
            `;
            tableBody.innerHTML += novaLinha;

        })
        .catch(function (error) {
            console.log(error);
        });




}
function gerarData() {
    let data = new Date();
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();
    return ano + '-' + mes + '-' + dia;
}

function getRandomId() {
    const randomNum = Math.floor(Math.random() * 100);
    return randomNum;
}

function searchDado() {
    //event.preventDefault();

    const name = document.getElementById("newTaskName").value;
    const description = document.getElementById("newTaskDescription").value;
    const searchTask = document.getElementById("searchTask").value;

    axios.post('https://todolist-api.edsonmelo.com.br/api/task/search/', {
        name: name,
    }, {
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'Content-Type': 'application/json',

        }
    })
        .then(function (response) {


            console.log(response.data);
            let idTask = response.data[0].id;
            let nameTask = response.data[0].name;
            let data = response.data[0].date;
            let realized = response.data[0].realized;

            if (searchTask !== '') {
                adicionaTarefaNaTabela(idTask, nameTask, data, realized);

            } else {
                alert('Digite uma tarefa.')
            }

        })
        .catch(function (error) {
            console.log(error);
        });




}

function adicionaTarefaNaTabela(id, name, date, realizada) {
    let tableBody = document.getElementById('tableBody');

    let novaLinha = `
        <tr>
            <th scope="row">${id}</th>
            <td>${name}</td>
            <td>Teste Descrição</td>
            <td>${realizada}</td>
            <td>${date}</td>

            <td>
                <button id="btnEdit" class="btn btn-sm btn-warning" onclick="">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="excluiTarefa(${id})">Excluir</button>
            </td>
        </tr>
    `;
    tableBody.innerHTML += novaLinha;



}
function excluiTarefa(idTask) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        axios.delete(`https://todolist-api.edsonmelo.com.br/api/task/delete/`,
            {
                id: idTask,
            }, {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                alert("Tarefa excluída com sucesso.");
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
                alert("Erro ao excluir tarefa.");
            });
    }
}

function excluirUsuario() {
    if (confirm("Tem certeza que deseja excluir este usuário? Você será desconectado.")) {
        const config = {
            headers: {
                'Authorization': sessionStorage.getItem('token'),
                'content-type': "application/json",
            },
            data: {
                username: sessionStorage.getItem('username'),
                password: sessionStorage.getItem('password'),
            }
        };
        axios.delete('https://todolist-api.edsonmelo.com.br/api/user/delete/', config)
            .then(function (response) {
                console.log(response.data);
                window.location.href = "index.html";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

