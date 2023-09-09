if(!sessionStorage.getItem('token')) {
    window.location.href = './login.html';
}

if(sessionStorage.getItem('token')) {
    const elHeaderBtnWrapper = document.querySelector('.js-header-btn-wrapper');
    const elHeaderBtnTemp = document.querySelector('.js-header-btn-temp').content.cloneNode(true);
    elHeaderBtnWrapper.appendChild(elHeaderBtnTemp);

}

const elHeaderBtn = document.querySelector('.js-header-btn');
const elHeaderList = document.querySelector('.js-header-list');
const elLogoutBtn = document.querySelector('.js-logout-btn');
const elUserTemp = document.querySelector('.js-user-item-temp');
const elList = document.querySelector('.js-list');
const fragment = document.createDocumentFragment();

elHeaderBtn.addEventListener('click', (evt) => {
    elHeaderList.classList.toggle('appear');
});

elLogoutBtn.addEventListener('click', (evt) => {
    sessionStorage.removeItem('token');
    window.location.href = './login.html';
}); 




getUsers('https://reqres.in/api/users');



function renderUsers(data, list) {
    list.innerHTML = '';

    data.forEach(item => {
        let temp = elUserTemp.content.cloneNode(true);
        temp.querySelector('.users__img').src = item.avatar;
        temp.querySelector('.users__img').alt = item.first_name + " image";
        temp.querySelector('.user-name').textContent = item.first_name + ' ' + item.last_name;
        temp.querySelector('.user-email').textContent = item.email;
        temp.querySelector('.user-email').href = `mailto:${item.email}`;

        fragment.appendChild(temp);
        
    });

    list.appendChild(fragment);

    
    if(sessionStorage.getItem('email')) {
        let email = sessionStorage.getItem('email');
        let img = document.querySelector('.js-user-img');
        let foundUser = data.find(item => item.email === email);
        img.src = foundUser.avatar;
        img.alt = `${foundUser.first_name} ${foundUser.last_name}`;
        let span = document.createElement('span');
        span.textContent = `${foundUser.first_name} ${foundUser.last_name}`;
        elHeaderBtn.appendChild(span);
    }
        
}


async function getUsers(url) {
    try {
       let res = await fetch(url);
       let data = await res.json();
       renderUsers(data.data, elList);
    }catch(err) {
        console.log(err);
    }
}

