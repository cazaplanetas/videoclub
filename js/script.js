var addOptions = function (elements, select) {
    var length = elements.children.length;
    for (var i = 0; i <= length - 1; i++) {
        var option = document.createElement('option');
        option.value = elements.children[i].children[0].textContent;
        option.textContent = elements.children[i].children[1].textContent;
        select.add(option);
    }
};
var cargaProvicias = function () {
    var event = new Event('change');
    var provincias = xhr.responseXML.documentElement;
    addOptions(provincias, select);
    select.dispatchEvent(event);
};
var cargaMunicipios = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/cargaMunicipiosXML.php?provincia=' + this.value);
    xhr.send({});
    xhr.addEventListener('load', function () {
        var select = document.getElementById('municipios');
        select.innerHTML = '';
        var municipios = this.responseXML.documentElement;
        addOptions(municipios, select);
    }, false);
};
var xhr = new XMLHttpRequest();
var select = document.getElementById('provincias');
xhr.open('get', '/cargaProvinciasXML.php');
xhr.send({});
xhr.addEventListener('load', cargaProvicias);
select.addEventListener('change', cargaMunicipios);
