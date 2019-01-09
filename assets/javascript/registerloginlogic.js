function register() {
    var email = $("#registerEmail").val().trim();
    var password = $("#registerPassword").val().trim();
    var username = $("#registerUsername").val().trim();
    var signUpDate = moment().format("MMMM Do YYYY");
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          alert("Email already in use");
        }
        if (errorCode == "auth/invalid-email") {
          alert("This does not appear to be a valid email address");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }).then(function () {
        user = firebase.auth().currentUser;
        uid = user.uid;
        user.updateProfile({
            displayName: username
        });
        database.ref("users/" + uid + "/citiesVisited").set({
            Philadelphia: "no",
            'New-York': "no",
            'Los-Angeles': "no",
            Chicago: "no",
            Phoenix: "no",
            Houston: "no",
            'San-Francisco': "no",
            'Washington-DC': "no",
            Denver: "no",
            Miami: "no",
            Seattle: "no",
            Boston: "no",
            'New-Orleans': "no",
            Memphis: "no",
            Dallas: "no",
            Charlotte: "no",
            Detroit: "no",
            Baltimore: "no",
            'Kansas-City': "no",
            Atlanta: "no"
        })
        database.ref("users/" + uid).update({
            dateJoined: signUpDate
      })
      })
}

function signIn() {
    email = $("#signInEmail").val().trim();
    password = $("#signInPassword").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert("Invalid Email");
      }
      if (errorCode == "auth/user-not-found") {
        alert("Username Not Found");
      }
      if (errorCode == "auth/wrong-password") {
        alert("Incorrect Password");
      } else {
        alert(errorMessage);
      }
    }).then(function () {
      user = firebase.auth().currentUser;
      uid = user.uid;
    })
  }

  function logout() {
    firebase.auth().signOut()
  }

function navbarUpdate() {
    user = firebase.auth().currentUser;
    console.log(user);
    $(".signIn").addClass("d-none");
    $(".signIn").removeClass("d-inline");
    $("#profileLink").removeClass("d-none");
    $("#wishListContainer").removeClass("d-none")
    setTimeout(function(){
        console.log(user.displayName);
        $("#profileUserName").text(user.displayName)
        $("#profileLink").text(user.displayName);
    },1000)
}