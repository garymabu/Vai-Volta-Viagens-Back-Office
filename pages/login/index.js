const homeDomain = 'http://localhost:8080';

async function FetchLoginAndRedirect(loginForm) {
  const result = await fetch(`${homeDomain}/v1/auth/employee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(loginForm),
  })
  if(result.status === 200)
  {
    const token = (await result.json()).token;
    sessionStorage.setItem('token', token);
    RedirectToUserHome()
  }
  else
    alert('Erro ao logar! Por favor verifique seus dados e tente novamente.')
}

async function FetchLoginAndPostLoginData() {
  const login = document.querySelector('#Username').value;
  const password = document.querySelector('#SenhaLogin').value;

  const loginForm = {
    login,
    password,
  };

  FetchLoginAndRedirect(loginForm);
}

function RedirectToUserHome() {
  setTimeout(() => {
    window.location.href = `../employee/index.html`;
  })
}
