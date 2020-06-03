
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
    const stateInput = document.querySelector("[name=stateHidden]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(urlCity)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

