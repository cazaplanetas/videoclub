let addOptions = function (elements, select) {
  let length = elements.children.length
  for (let i = 0; i <= length - 1; i++) {
    let option = document.createElement('option')
    option.value = elements.children[i].children[0].textContent
    option.textContent = elements.children[i].children[1].textContent
    select.add(option)
  }
}

let cargaProvicias = function () {
  let event = new Event('change')
  let provincias = xhr.responseXML.documentElement
  addOptions(provincias, select);
  select.dispatchEvent(event)
}

let cargaMunicipios = function () {
  let xhr = new XMLHttpRequest()
  xhr.open('get', '/cargaMunicipiosXML.php?provincia=' + this.value)
  xhr.send({})

  xhr.addEventListener('load', function () {
    let select: HTMLSelectElement = <HTMLSelectElement> document.getElementById('municipios')
    select.innerHTML = ''
    let municipios = this.responseXML.documentElement
    addOptions(municipios, select)
  }, false)
}

let xhr = new XMLHttpRequest()
let select: HTMLSelectElement = <HTMLSelectElement> document.getElementById('provincias')
xhr.open('get', '/cargaProvinciasXML.php')
xhr.send({})
xhr.addEventListener('load', cargaProvicias)
select.addEventListener('change', cargaMunicipios)