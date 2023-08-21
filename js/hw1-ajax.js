const apiURL = "https://jsonplaceholder.typicode.com";
const usersListEl = document.querySelector(".users-list");
const userInfoEl = document.querySelector(".user-info");


// 1. реализовать запрос получения пользователей
// 2. реализовать обработчик ответа от сервера
// 3. рендер списка пользователей
// 4. повесить событие клик на список
// 5. получаем id пользователя
// 6. делаем запрос на сервер получая инфу об выбраном пользователе
// 7. обработчик на ответ от сервера
// 8. рендерим инфу об пользователе

usersListEl.addEventListener("click", onUserClickHandler);

function onUserClickHandler(e) {
    e.preventDefault();
    if (e.target.dataset.userId) {
    //   console.log(e.target.dataset.userId);
      getUserInfoHTTP(e.target.dataset.userId, onGetUserInfoCallback);
    }
}

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

function getUserInfoHTTP(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiURL}/users/${id}`);

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

function onGetUserInfoCallback(user) {
    console.log(user);
    if (!user.id) {
        console.log('User not found');
        return
    }
    renderUserInfo(user);
}

function onGetUsersCallback(users) {
    if (!users.length) {
        return;
    }
renderUsersList(users);
}

function renderUsersList(users) {
    const fragment = users.reduce((acc, user) => acc +     userListItemTemplate(user), "");

    usersListEl.insertAdjacentHTML("afterbegin", fragment);
}

function renderUserInfo(user) {
    userInfoEl.innerHTML = "";

    const template = userInfoTemplate(user); 

    userInfoEl.insertAdjacentHTML('afterbegin', template);
}

function userListItemTemplate(user) {
    return `
        <button type="button" class="list-group-item list-group-item-action" data-user-id = "${user.id}">
        ${user.name}
        </button>
    `;
}

function userInfoTemplate(user) {
    return `
    <div class="card border-dark mb-3" >
  <div class="card-header">${user.name}</div>
  <div class="card-body text-dark">
    <h5 class="card-title">${user.email} </h5>
    <ul class = "list-group list-group-flush">
    <li class = "list-group-item"><b>Nickname:<b> ${user.username}</li>
<li class = "list-group-item"><b>Website:<b> ${user.website}</li>
<li class = "list-group-item"><b>Company:<b> ${user.company.name}</li>
<li class = "list-group-item"><b>City:<b> ${user.address.city}</li>
    </ul>
  </div>
  <div class = "card-footer dg-transparent border-dark">Phone: ${user.phone}</div>

</div>
    `;
}

getUsers(onGetUsersCallback);
