const bukuStorageKey = "DAFTAR_BUKU";



if(typeof (Storage) !== undefined){

    if(localStorage.getItem(bukuStorageKey) === null){

        localStorage.setItem(bukuStorageKey,JSON.stringify({
            selesai: [],
            belum: []
        }));

    }

    function getStorageItemByKey (key){
        return localStorage.getItem(key);
    }

    var dataBukuJSON = JSON.parse(getStorageItemByKey(bukuStorageKey));

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

    addBookBtn.addEventListener('click', ()=>{

        let objBuku = {
            "judul": tambahBuku.judul.value,
            "penulis": tambahBuku.penulis.value,
            "tahun": tambahBuku.tahun.value,
            "isDibaca": tambahBuku.isDibaca.checked
        }

        console.log(objBuku)

    });





}else{
    alert("Browser tidak mendukung Storage")
}


