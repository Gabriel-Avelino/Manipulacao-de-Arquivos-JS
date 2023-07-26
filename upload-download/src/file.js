const input = document.querySelector('#arquivo')
const preview = document.querySelector('#preview')
const btnDownload = document.querySelector('#download')

input.addEventListener('change', (event)=>{
    const arquivo = event.target.files[0];
    const leitor = new FileReader();

    leitor.addEventListener('load', ()=>{
        preview.value = leitor.result;
    });

    if(arquivo){
        leitor.readAsText(arquivo);
    };
})

const download = () => {
    const a =  document.createElement('a')
    a.style = 'display: none'
    document.body.appendChild(a);
    return function(conteudo, nomeArquivo){
        const blob = new Blob([conteudo], {  type:'octet/stream '})
        const url = window.URL.createObjectURL(blob)
        a.href = url;
        a.download = nomeArquivo;
        a.click();
        window.URL.revokeObjectURL(url)
    }
}

btnDownload.addEventListener('click', ()=>{
    download()(preview.value, 'db.json')
})