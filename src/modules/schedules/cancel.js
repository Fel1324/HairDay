import { schedulesDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";

const periods = document.querySelectorAll(".period");

// Gerar evento de click para cada lista (manhã, tarde e noite).
periods.forEach((period) => {
  // Capturar o evento de click na lista.
  period.addEventListener("click", async (event) => {
    if(event.target.classList.contains("cancel-icon")){
      // Obtém a li pai do elemento clicado.
      const item = event.target.closest("li");

      // Pega o id do agendamento para remover.
      const { id } = item.dataset;

      // Confirma se o id foi selecionado.
      if(id){
        // Confirma se o usuário quer cancelar.
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?");
        
        if(isConfirm){
          // Faz a requisição na API para cancelar.
          await scheduleCancel({ id });

          // Recarrega os agendamentos.
          schedulesDay();
        }
      }
    }
  });
});