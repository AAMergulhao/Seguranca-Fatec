$(document).ready( async() =>{
    var tags = await $.ajax({
        url: `${window.origin}/tags`,
        type: 'GET',
        data:{
            id: user_id
        },
        success: (data) => {console.log(data)}
    });
    tags.forEach(tag => {
        $('#tableTags').append(`
        <tr>
            <td>${tag}</td>
            <td><a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a></td>
        </tr>
        `);
    });
    

})