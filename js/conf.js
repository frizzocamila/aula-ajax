var carregando = $('#info');
var erro = $('#error');
const url = 'https://api.github.com/users/';

carregando.hide();
erro.hide();

$('#btnSearch').click(function(){
  carregando.show();
  erro.hide();
  $('#profile-info').empty();
  var user = $('#search').val();

  if(user != '') {
    $.ajax({
      url: url+user,
      type: "GET",
      dataType: "json",
      success: function (data) {
        let dateCreated = new Date(data.created_at);
        let dateUpdated = new Date(data.updated_at);
        let dateCreatedFormat = dateCreated.getDay() + "/" + dateCreated.getMonth() + "/" + dateCreated.getFullYear();
        let dateUpdatedFormat = dateUpdated.getDay() + "/" + dateUpdated.getMonth() + "/" + dateUpdated.getFullYear();

        $(`
        <div class="col-md-3">
        <img
          src= ${data.avatar_url}
          alt="GitHub Avatar"
          class="img-fluid img-thumbnail"
        />
      </div>
      <div class="col-md-9">
        <div>
          <label for="name"><b>Nome: </b></label><span id="name"> ${data.name}</span>
        </div>
        <div>
          <label for="login"><b>Login: </b></label
          ><span id="login"> ${data.login}</span>
        </div>
        <div>
          <label for="url"><b>Url do perfil: </b></label
          ><a id="url" href=${data.html_url} target="_blank"> ${data.html_url}</a>
        </div>
        <div>
          <label for="location"><b>Localização: </b></label
          ><span id="location"> ${data.location}</span>
        </div>
        <div>
          <label for="public-repos"><b>Repositórios públicos: </b></label
          ><span id="public-repos"> ${data.public_repos}</span>
        </div>
        <div>
          <label for="created-at"><b>Criado em: </b></label
          ><span id="created-at"> ${dateCreatedFormat}</span>
        </div>
        <div>
          <label for="updated-at"><b>Atualizado em: </b></label
          ><span id="updated-at"> ${dateUpdatedFormat}</span>
        </div>
      </div>
        `).appendTo('#profile-info');
      },
      error: function(data){
        $('#error #appendRemove').remove();
        $('#error').append(`<span id="appendRemove">${data.status}</span>`);
        erro.show();
      },
      complete: function(){
          carregando.hide();
      }
  });
  } else {
    alert("Por favor digite um nome de usuário no campo!");
  }
});
