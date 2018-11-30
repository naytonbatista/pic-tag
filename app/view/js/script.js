const $ = document.querySelector.bind(document);

const previewImg = $('.preview-img');
const arquivo = $('.arquivo');
const clickArea = $('.click-area');
const btnSave = $('#save');
const texto = $('.texto');
const inputTag = $('#input-tag');


clickArea.onclick = (e) => {
    arquivo.click();
}

arquivo.onchange = (e) => {

    if (e.target.files.length <= 0) {
        _reset();
        return;
    }

    texto.style.display = 'none';

    const arquivoUpload = e.target.files.item(0);

    const reader = new FileReader();

    reader.onload = o => previewImg.src = o.target.result;

    reader.readAsDataURL(arquivoUpload);
}

btnSave.onclick = (e) => {

    const formData = new FormData();
    formData.append('file', arquivo.files.item(0));
    
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {

        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
            alert('salvou!');
            _reset();
        }
    }

    httpRequest.open('POST', 'http://localhost:3000/file/upload', true);
   

    httpRequest.send(formData);

}

function _reset(){
    
    texto.style.display = 'block';
    previewImg.src = 'icons/image_default.png';
    inputTag.value = "";

}