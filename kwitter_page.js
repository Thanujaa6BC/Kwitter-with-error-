var firebaseConfig = {
      apiKey: "AIzaSyA8LswR7kHUtJwPpRpRW32VhysuTdGlhDU",
      authDomain: "thanujaa-s-kwitter-app.firebaseapp.com",
      databaseURL: "https://thanujaa-s-kwitter-app-default-rtdb.firebaseio.com",
      projectId: "thanujaa-s-kwitter-app",
      storageBucket: "thanujaa-s-kwitter-app.appspot.com",
      messagingSenderId: "51708904965",
      appId: "1:51708904965:web:e92c777a9506885690fe6c",
      measurementId: "G-Y0B74MFY1S"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
}


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];

                        name_with_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'> </h4>";
                        message_with_tag = "<h4 class ='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-success' id =" + firebase_message_id + "value =" + like + " onclick = 'updateLike(this.id)'>";
                        span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> LIKE : " + like + "</span> </button> <hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        console.log(name_with_tag);
                        console.log(message_with_tag);
                        console.log(like_button);
                        console.log(span_with_tag);
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      console.log("clicked on LIKE button-" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

