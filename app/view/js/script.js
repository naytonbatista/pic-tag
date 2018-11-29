


const $ = document.querySelector.bind(document);

const previewImg = $('.preview-img');
const arquivo = $('.arquivo');
const clickArea = $('.click-area');
const btnSave = $('#save');
const texto = $('.texto');

clickArea.onclick = (e) => {
    arquivo.click();
}

arquivo.onchange = (e) => {

    if (e.target.files.length <= 0) {
        texto.style.display = 'block';
        previewImg.src = 'icons/image_default.png';
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

        if (httpRequest.status == 200) {
            alert('salvou!');
        }
    }

    httpRequest.open('POST', 'http://localhost:3000/file/upload', true);
   

    httpRequest.send(formData);

}