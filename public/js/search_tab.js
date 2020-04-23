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
                        <div class="card horizontal hoverable pointer_user" onclick="userModal()">
                            <div class="card-image">
                                <a href="">
                                <img src="${user.avatar}" style="height: 80px; width: 80px;">
                                </a>
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <p><strong>${user.username}</strong></p>
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
    alert('Teste')
}