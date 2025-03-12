import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.querySelector("#client");
const selectedDate = document.querySelector("#date");

// Data atual para formatar o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e define a data mínima como sendo a data atual mesmo.
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
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

    // Insere a hora na data.
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // Gera um ID.
    const id = new Date().getTime();

    // Faz o agendamento.
    await scheduleNew({
      id,
      name,
      when,
    });

    // Recarrega os agendamentos.
    await schedulesDay();

    // Limpa o inputd de nome do cliente.
    clientName.value = "";

  } catch (error) {
    alert("Não foi possível realizar o agendamento!");
    console.log(error);
  }
}