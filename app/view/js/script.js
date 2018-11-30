let tags = [];

const $ = document.querySelector.bind(document);

const previewImg = $('.preview-img');
const arquivo = $('.arquivo');
const clickArea = $('.click-area');
const btnSave = $('#save');
const btnAddTag = $('#add-tag');
const texto = $('.texto');
const inputTag = $('#input-tag');

clickArea.onclick = (e) => {
    arquivo.click();
}

btnAddTag.onclick = (e) => {
    addTag();
}

inputTag.onkeyup = (e) => {

    if (e.target.value.length > 0) {
        btnSave.style.display = 'none';
        btnAddTag.style.display = 'block';
    } else {
        btnSave.style.display = 'block';
        btnAddTag.style.display = 'none';
    }
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

function _reset() {

    texto.style.display = 'block';
    previewImg.src = 'icons/image_default.png';
    inputTag.value = "";

}

function addTag() {

    if (inputTag.value.length <= 0) {
        return;
    }

    tags.push(inputTag.value);
    inputTag.value = '';
    desenhaTags();
}

function deleteTag(e) {

    var value = e.target.parentElement.getElementsByTagName('label')[0].innerText;
    var index = tags.indexOf(value);

    delete tags[index];
    tags = tags.filter(item => item);
    desenhaTags();
}

function desenhaTags() {

    const tagContainer = $('.tags-container');

    tagContainer.innerHTML = `<label>Tags:</label>`;

    if (tags.length <= 0) return;

    tags.forEach(item => {
        tagContainer.innerHTML +=`<span class="tag"><label>${item}</label><a onclick="deleteTag(event)" href="#" class="close">x</a></span>`;
    });

}