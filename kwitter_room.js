
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
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

    function addRoom() {
       room_name = document.getElementById("room_name").value;
       firebase.database().ref("/").child(room_name).update({
             purpose : "adding room name"
       });

       localStorage.setItem("room_name", room_name);
       window.location = "kwitter_page.html";

    }

    

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room Name" + Room_names)
      row = "<div class = 'room_name' id = "+ Room_names +" onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
