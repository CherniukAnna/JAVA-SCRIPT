const apiURL = "https://jsonplaceholder.typicode.com";

function getUsers(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiURL}/users`);
  
  xhr.addEventListener("load", () => {
    // console.log(xhr.responseText);
    if (xhr.status !== 200) {
      console.log("Error", xhr.status);
      return;
    }

      const reply = JSON.parse(xhr.responseText);
      callback(reply);
  });

  xhr.send();
}

function onGetUsersCallback(users) {
    if (!users.length) {
        return;
    }
renderUsersList(users);
}

function renderUsersList(users) {
    
}

getUsers(onGetUsersCallback);
