
function populateUFs () {
    const ufSelect = document.querySelector("[name=uf]")
    const urlUf = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

//  fetch api é um função de promessa que retorna um objeto promise;
//  .then é uma função tbm que vai receber o res do fetch;
//  quando retornamos os dados transformados em json gera outra promessa;
//  por isso temos que usar outra .then com uma function recebendo os dados;

    fetch(urlUf)
    .then( res => res.json() )
    .then( states => {
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.innerHTML = true

    fetch(urlCity)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta;
//pegar todos os li;
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target
    //adicionar ou remover uma classe com JavaScript; "toggle" adiciona ou remove uma classe;
    itemLi.classList.toggle("selected")
    //pegando somente o id de cada li;
    const itemId = itemLi.dataset.id
    //verificar se existem itens selecionados; se sim, pegar os items selecionados;
    //findIndex é um função que percorre todos os item e executa outra função;
    //neste caso iremos procurar no array os item returnando true or false se caso 
    //estiver ou não selecionado;
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    //se já estiver selecionado;
    if(alreadySelected >= 0) {
        //tirar da seleção;
        //filter é uma função que filtra o array deixando apenas os itens desejados(iguais ou diferentes);
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems=filteredItems
    } else {
    //se não tiver selecionado, adicionar na seleção;
        selectedItems.push(itemId)
    }
    //atualizar o campo escondido com items selecionados;
    collectedItems.value = selectedItems
}
