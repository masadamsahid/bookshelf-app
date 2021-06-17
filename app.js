
const bukuStorageKey = "DAFTAR_BUKU";

function hapusBuku(){}

if(typeof (Storage) !== undefined){

    if(localStorage.getItem(bukuStorageKey) === null){
        localStorage.setItem(bukuStorageKey, "[]")
    }

    //Get input tambah buku input elements
    const tambahBuku = {
        'judul': document.getElementById('judul'),
        'penulis': document.getElementById('penulis'),
        'tahun': document.getElementById('tahun'),
        'isDibaca': document.getElementById('is-dibaca')
    }

    const addBookBtn = document.getElementById('btn-tambah');

    //Bookshelf container
    const selesaiDibacaContainer = document.getElementById('selesai-dibaca');
    const belumDibacaContainer = document.getElementById('belum-dibaca');

    //Get input Cari element
    const cariJudul = document.getElementById('cari');

    addBookBtn.addEventListener('click', ()=>{})





}else{
    alert("Browser tidak mendukung Storage")
}


