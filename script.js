let myLead = []
let inputEl= document.getElementById("input-el")
let saveBtn = document.getElementById("save-btn")
let tabBtn = document.getElementById("tab-btn")
let delBtn = document.getElementById("del-btn")
let ulEl = document.getElementById("ul-el")
let logsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(logsFromLocalStorage){
    myLead= logsFromLocalStorage
    render(myLead)
}

function render(leads){
    let list = ""
    for(let i=0; i<leads.length; i++){
        list += `<li><a target = '_blank' href = '${leads[i]}'> ${leads[i]}</a></li>`
    }
    
    ulEl.innerHTML = list
    
}
saveBtn.addEventListener("click", ()=>{
        myLead.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLead))
        render(myLead)
    
})

delBtn.addEventListener("dblclick", () =>{
    localStorage.clear()
    myLead = []
    render(myLead)
})

tabBtn.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        myLead.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLead) )
        render(myLead)
    })
})