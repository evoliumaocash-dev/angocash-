function syncAppInterface() {
    // 1. Recupera os dados brutos
    const rawBalance = localStorage.getItem('user_balance') || "0.00";

    // 2. Formata o saldo para o padrão Kwanza (Kz)
    const formattedBalance = parseFloat(rawBalance).toLocaleString('pt-AO', {
        style: 'currency',
        currency: 'AOA',
        minimumFractionDigits: 2
    }).replace('AOA', '').trim() + " Kz";


    // 3. Imprime em todas as Classes (Para múltiplos elementos na mesma tela)
    document.querySelector('.user-balance').textContent = formattedBalance;

}

// Executa automaticamente ao carregar qualquer página
window.addEventListener('DOMContentLoaded', syncAppInterface);