const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left") 

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    items[currentItem].classList.add("current-item");
  });
});

const ul = document.getElementById("lista-projetos")
function getApiGitHub() {
  fetch('https://api.github.com/users/qwer-julia/repos')
    .then(async res => {

      if(!res.ok) {
        throw new Error(res.status)
      }

      var data = await res.json()

      data.map(item => {
        let li = document.createElement('li')

        li.innerHTML = `
        <strong class="titulo-projeto">${item.name.toUpperCase()}</strong>
        <p>Data Criação: 
        ${Intl.DateTimeFormat('pt-BR')
        .format(new Date(item.created_at))}
        </p>
        <h3> ${item.description || "Sem descrição no momento"} </h3>
        <a target="_blank" href=" ${item.html_url}">Clique aqui para acessar</a>
      `
      ul.appendChild(li)

      })

    }).catch(e => console.log(e))
}

getApiGitHub()