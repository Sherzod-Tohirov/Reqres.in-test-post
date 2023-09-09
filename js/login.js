const elLoginForm = document.querySelector('.js-login-form');
const elEmailInp = document.querySelector('.js-login-email');
const elPasswordInp = document.querySelector('.js-login-password');
const elErrorEmail = document.querySelector('.js-error-email');
const elErrorPassword = document.querySelector('.js-error-password');





elLoginForm.addEventListener('submit', (evt) => {

  
  evt.preventDefault();

  let email = elEmailInp.value.trim();
  let pass  = elPasswordInp.value.trim();

  if(email.length == 0) {
    elEmailInp.classList.add('is-invalid');
    elErrorEmail.textContent = "Please enter your email !";
    return;
  }else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
    elEmailInp.classList.add('is-invalid');
    elErrorEmail.textContent = "Email must be valid !";
    return;
  }else {
    elEmailInp.classList.remove('is-invalid');
    elErrorEmail.textContent = '';
  }

  if(pass.length == 0) {
    elPasswordInp.classList.add('is-invalid');
    elErrorPassword.textContent = "Please enter your password !";
    return;
  }else {
    elPasswordInp.classList.remove('is-invalid');
    elErrorPassword.textContent = '';
  }

  postUserData('https://reqres.in/api/login', email, pass);




});






async function postUserData(url, email, password) {
   try {
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });

    if(res.status >= 400) {
      elErrorPassword.textContent = 'Email or Password is incorrect !';
      elErrorPassword.classList.add('text-center', 'd-block');
    }else {
      elErrorPassword.textContent = '';
      elErrorPassword.classList.remove('text-center', 'd-block');
    }

    let data = await res.json();
    
    if(data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('email', email);
        window.location.href = './index.html';
    }
   }catch(err) {
    console.log(err);
   }
} 