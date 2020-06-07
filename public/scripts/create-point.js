function populateUFs() {
    const  ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")/*Foi no site do IBGE e buscou os Estados*/
    .then( res => res.json() ) /*aqui os dados foi transformados em json*/
    .then( states => {

        for( const state of states) { /*estrutura de repetição que mostra os Estados*/
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

         
    } )
}   

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true
    
    fetch(url)/*Foi no site do IBGE e buscou os Estados*/
    .then( res => res.json() ) /*aqui os dados foi transformados em json*/
    .then( cities => {

        for( const city of cities) { /*estrutura de repetição que mostra os Estados*/
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false   
    } )

}

document
   .querySelector("select[name=uf]")
   .addEventListener("change", getCities)
   
 //itens de coleta
 //Pegar todos os li´s
 
 const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (const item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
//adicionar ou remover uma classe com Javascript 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.target.dataset.id
 
//Verificar se existem items selecionados, se sim
// pegar os items selecionados

const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId //isso será true ou false
    return itemFound
})

//se já estiver selecionados, tirar da seleção
if(alreadySelected >= 0 ) {
    const filteredItems = selectedItems.filter(item =>{
        const itemIsDifferent = item != itemId //false
        return itemIsDifferent
    })

    selectedItems = filteredItems
} else {    
//se não estiver selecionado, 
//adicionar a seleção
    selectedItems.push(itemId)
}

//atualizar o campo escondido com os items selecionados
collectedItems.value = selectedItems

 }



