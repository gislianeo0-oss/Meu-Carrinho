const corpoTabela = document.getElementById('corpoTabela');
const totalCompra = document.getElementById('totalCompra');
 
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
 
function atualizarTotal() {
    let soma = 0;
    const linhas = corpoTabela.querySelectorAll('tr');
 
    linhas.forEach(function (linha) {
        soma += Number(linha.dataset.total);
    });
 
    totalCompra.textContent = formatarMoeda(soma);
}
 
function renumerarItens() {
    const linhas = corpoTabela.querySelectorAll('tr');
 
    linhas.forEach(function (linha, indice) {
        linha.children[0].textContent = indice + 1;
    });
}
 
document.getElementById('btnInserir').addEventListener('click', function () {
    const produto = document.getElementById('produto').value;
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value;
 
    if (produto === '' || preco === '' || quantidade === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
 
    const total = Number(preco) * Number(quantidade);
 
    const novaLinha = document.createElement('tr');
    novaLinha.dataset.total = total;
 
    novaLinha.innerHTML = `
        <td>${corpoTabela.children.length + 1}</td>
        <td>${produto}</td>
        <td>${formatarMoeda(Number(preco))}</td>
        <td>${quantidade}</td>
        <td>${formatarMoeda(total)}</td>
        <td><button type="button" class="btn-excluir">Excluir</button></td>
    `;
 
    corpoTabela.appendChild(novaLinha);
    atualizarTotal();
 
    document.getElementById('produto').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('quantidade').value = '';
});
 
corpoTabela.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('btn-excluir')) {
        evento.target.closest('tr').remove();
        renumerarItens();
        atualizarTotal();
    }
});