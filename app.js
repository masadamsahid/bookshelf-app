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
    const selesaiDibacaRak = document.querySelectorAll('#selesai-dibaca>.rak-buku');
    const belumDibacaRak = document.querySelectorAll('#belum-dibaca>.rak-buku');

    //Get input Cari element
    const cariJudul = document.getElementById('cari');

    function tampilkanRak(){

        let daftarBukuSelesai = "";
        let daftarBukuBelum = "";

        dataBukuJSON.selesai.forEach(e => {

            let element =
                `<div class="item-buku">
                    <div class="part1">
                        <h3 class="judul">${e.judul}</h3>
                        <p>Penulis : <span class="penulis">${e.penulis}</span></p>
                        <p>Tahun : <span class="tahun">${e.tahun}</span></p>
                    </div>
                    <div class="part2">
                        <button class="btn is-selesai">
                            Selesai
                        </button>
                        <button class="btn hapus" onclick="hapusBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
                            Hapus
                        </button>
                    </div>
                </div>`;

            daftarBukuSelesai += element;

        });

        dataBukuJSON.belum.forEach(e => {

            let element =
                `<div class="item-buku">
                    <div class="part1">
                        <h3 class="judul">${e.judul}</h3>
                        <p>Penulis : <span class="penulis">${e.penulis}</span></p>
                        <p>Tahun : <span class="tahun">${e.tahun}</span></p>
                    </div>
                    <div class="part2">
                        <button class="btn is-selesai">
                            Belum Selesai
                        </button>
                        <button class="btn hapus" onclick="hapusBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
                            Hapus
                        </button>
                    </div>
                </div>`;

            daftarBukuBelum += element;

        });

        selesaiDibacaRak[0].innerHTML = daftarBukuSelesai;
        belumDibacaRak[0].innerHTML = daftarBukuBelum;

    }

    tampilkanRak();

    function hapusBuku(judul, penulis, tahun, isDibaca){

        let x = dataBukuJSON[isDibaca ? "selesai" : "belum"].filter(e => {

            let a = (e.judul === judul && e.penulis === penulis && e.tahun === tahun && e.isDibaca === isDibaca)

            return !a;
        });

        console.log('berhasil menghapus')

        dataBukuJSON[isDibaca ? "selesai" : "belum"] = x;

        localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
        tampilkanRak();

    }


    addBookBtn.addEventListener('click', ()=>{

        let objBuku = {
            "judul": tambahBuku.judul.value,
            "penulis": tambahBuku.penulis.value,
            "tahun": tambahBuku.tahun.value,
            "isDibaca": tambahBuku.isDibaca.checked
        };

        if(objBuku.isDibaca===true){
            dataBukuJSON.selesai.push(objBuku);
        }else {
            dataBukuJSON.belum.push(objBuku);
        }

        localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
        tampilkanRak();

    });

}else{
    alert("Browser tidak mendukung Storage")
}


