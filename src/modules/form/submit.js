import dayjs from "dayjs";

const form = document.querySelector("form");
const clientName = document.querySelector("#client");
const selectedDate = document.querySelector("#date");

// Data atual para formatar o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e define a data mínima como sendo a data atual mesmo.
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault();

  try {
    // Recuperando nome do cliente
    const name = clientName.value.trim(); // remove espaços desnecessários.
    if(!name) return alert("Informe o nome do cliente!");

    // Recupera o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected");
    if(!hourSelected) return alert("Selecione a hora!");

    // Recuperar somente a hora.
    const [hour] = hourSelected.innerText.split(":");
    console.log(hour)

    // Insere a hora na data.
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // Gera um ID.
    const id = new Date().getTime();

  } catch (error) {
    alert("Não foi possível realizar o agendamento!");
    console.log(error);
  }
}