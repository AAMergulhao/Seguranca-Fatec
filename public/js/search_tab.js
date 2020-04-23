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
                    <div class="col s12 l5">
                        <div class="card teal lighten-2 horizontal hoverable pointer_user" onclick="userModal()">
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

function userModal(){
    $('#user_modal').modal('open'); 
}