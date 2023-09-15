let access_token = "EAAJ3mxwna00BOzLH0JODMzybXxN7XBJT4SfJUjj1S9mIIhMUTw9MsWOCxOjxBJxxVwpakctSCLluAtmmX5uEhupbCazVWLU8nI7dIUKMFIt1cigB47jb3iEFzrS3t8IQzY3Dt7RpNSDjZCRAnRzk5bAv4qaxNFQL3XY3FzwVrQA2SmYFNM9CCBi2ZB0iqdSRKneFkfHhduafva5Of4hx5W6dUfXPZA1MPYZD";
let div_element = document.getElementById("main_div");
let new_element = document.createElement('div');
let serch_word = document.getElementById("serch").value;
let img = document.createElement('img');
let serch_id;


function Serch(){

    console.log(serch_word);

    $.ajax({
        type: 'GET',
        url: 'https://graph.facebook.com/v17.0/ig_hashtag_search?user_id=17841461997795323&q=' + serch_word + '&access_token=' + access_token,
        dataType: 'json',
        success: function(json) {
                console.log(json.data[0].id);
                serch_id = json.data[0].id;
                view();
            }
    });
}
function view(){
    $.ajax({
    type: 'GET',
    url: 'https://graph.facebook.com/'+ serch_id +'/top_media?user_id=17841461997795323&fields=caption,comments_count,id,like_count,media_type,media_url,permalink,timestamp,children{media_url}&access_token=' + access_token + '&limit=20',
    dataType: 'json',
    success: function(json) {
        console.log(json);
        for(let i = 0; i < json["data"].length; i++){
            if(json.data[i].media_type == "VIDEO" && json.data[i].media_url != null){
                let link = document.createElement('a');
                let img = document.createElement('video');

                console.log(json.data[i]);
                link.href = json.data[i].permalink;

                img.src = json.data[i].media_url;
                img.type="video/mp4";
                img.autoplay = true;
                img.loop = true;
                img.volume = 1;
                img.width = 300;
                img.height = 300;

                new_element.appendChild(link);
                link.appendChild(img);
                console.log(json.data[i].permalink);
            }
            else if(json.data[i].media_type == "CAROUSEL_ALBUM" ){
                for(let j = 0; j < json.data[i].children['data'].length; j++){
                    if(json.data[i].children.data[j].media_url.includes("mp4")){
                        const img = document.createElement("video");

                        img.src = json.data[i].children.data[j].media_url;
                        img.type="video/mp4";
                        img.autoplay = true;
                        img.loop = true;
                        img.volume = 1;
                        img.width = 300;
                        img.height = 300;

                        console.log(json.data[i].children.data[j].media_url);
                        new_element.appendChild(img);
                    }
                }
            }
        }
        div_element.appendChild(new_element);
    }
    });
}