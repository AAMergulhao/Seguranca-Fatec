$(document).ready(() =>{
    $("#search_input").keypress((key) => {
        if (key.keyCode === 10 || key.keyCode === 13) {
            searchUsers()
         }
      });
    $('#user_modal').modal();
})

async function searchUsers(){
    let tag = $('#search_input').val();
    
    await $.ajax({
        url: `${window.origin}/searchTags?tag=${tag}`,
        method: 'GET',
        success: (data) => {
            if(data.res){
                M.toast({html: data.res});
                return;
            }
            preLoader(500);
            document.getElementById('users_div').innerHTML = "";

            data.users.forEach(user => {
                $('#users_div').append(`
                    <div id="${user._id}" class="col s12 l5 hoverable pointer_user" onclick="userModal(this.id)">
                        <div class="card teal lighten-2 horizontal " >
                            <div class="card-image">
                                <img src="${user.avatar}" style="height: 80px; width: 80px;">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content white-text">
                                    <p>${user.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            });
            
        }
    });
};

async function userModal(user_id){
    await $.ajax({
        url: `${window.origin}/user?id=${user_id}`,
        method: 'GET',
        success: (data) =>{

            if(data.status == 1){
                M.toast({html: data.res});
                return;
            }

            $('#modal_avatar').empty();
            $('#modal_repo').empty();
            $('#modal_bio').empty();
            $('#modal_location').empty();
            $('#modal_tags').empty();

            let tags = '';
            data.tags.forEach((tag) =>{
                tags += `<li class="collection-item">${tag}</li>`
            });
            console.log(tags)
            $('#modal_avatar').append(`
                <a href="https://github.com/${data.username}" target="_blank">
                    <img src="${data.avatar}" class="tooltipped" data-position="right" data-tooltip="Ir para o Github">
                </a>
                <span class="card-title">${data.username}</span>
            `)

            $('#modal_repo').append(`Repostitórios Públicos: ${data.repositories}`);
            $('#modal_bio').append(`<strong style="font-weight: bolder !important; font-size: 1.2em">Biografia:</strong>
                ${data.bio || "Biografia não encontrada"}`);
            $('#modal_location').append(`<strong style="font-weight: bolder !important; font-size: 1.2em">Location:</strong>
                ${data.location || "Localização do usuario não encontrada"}`);
            $('#modal_tags').append(tags);
            $('#user_modal').modal('open'); 
        }
    })

    
}