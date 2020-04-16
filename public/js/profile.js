$(document).ready( async() =>{
    var tags = await $.ajax({
        url: `${window.origin}/tags?id=${user_id}`,
        method: 'GET',
        success: (data) => {console.log(data)}
    });
    tags.forEach(tag => {
        $('#tableTags').append(`
        <tr>
            <td>${tag}</td>
            <td><a class="btn-floating btn-small waves-effect waves-light red" onclick="deleteTag($(this))"><i class="material-icons">delete</i></a></td>
        </tr>
        `);
    });

    $("#tags_form").submit((e) =>{
        e.preventDefault();
        addTag();
      });
});

function deleteTag(jElement){
    var table_row = $(jElement).closest('tr');
    var tag = table_row.find('td');
    tag = tag[0].innerHTML;

    $.ajax({
        url: `${window.origin}/tags?id=${user_id}&tag=${tag}`,
        method: 'DELETE',
        success: (data) => {
            M.toast({html: data.res});
            $(table_row).remove();
            preLoader(500);
            
        }
    })
}

function addTag(){
    var tag = $('#new_tag').val()
    $.ajax({
        url: `${window.origin}/tags`,
        headers:{
            "Content-Type": "application/json"
        },
        type: 'POST',
        data: JSON.stringify({
            id: user_id,
            tag: tag
        }),
        success: (data) => {
            if(data.status == 1){
                M.toast({html: data.res})
                $('#new_tag').val("");
                $('#new_tag').focus();
                return;
            }
            M.toast({html: data.res});
            $('#tableTags').append(`
            <tr>
                <td>${tag}</td>
                <td><a class="btn-floating btn-small waves-effect waves-light red" onclick="deleteTag($(this))"><i class="material-icons">delete</i></a></td>
            </tr>
            `)
            $('#new_tag').val("");
            $('#new_tag').focus();
            preLoader(500);
        }
    })
}