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
    const inputJudul = document.getElementById('cari');

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
                        <button class="btn is-selesai" onclick="switchStatus('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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
                        <button class="btn is-selesai" onclick="switchStatus('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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

    function switchStatus(judul, penulis, tahun, isDibaca){

        console.log(
            `judul: ${judul}\npenulis: ${penulis}\ntahun: ${tahun}\nis dibaca: ${isDibaca}\n`
        )

        let index = dataBukuJSON[isDibaca ? "selesai" : "belum"].findIndex(
            e => (e.judul === judul && e.penulis === penulis && e.tahun === tahun)
        )

        console.log(index)

        dataBukuJSON[isDibaca ? "selesai" : "belum"][index].isDibaca = !isDibaca;

        dataBukuJSON[!isDibaca ? "selesai" : "belum"].push(dataBukuJSON[isDibaca ? "selesai" : "belum"][index]);

        dataBukuJSON[isDibaca ? "selesai" : "belum"].splice(index,1);

        localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
        tampilkanRak();

    }

    function cariBuku(){

        let judul = document.getElementById('cari').value;

        const hasilCari = {
            selesai: [],
            belum: []
        }

        for (key in dataBukuJSON){
            dataBukuJSON[key]
                .filter(e => e.judul.includes(judul))
                .forEach(e => hasilCari[key].push(e));
        }

        let daftarBukuSelesai = "";
        let daftarBukuBelum = "";

        hasilCari.selesai.forEach(e => {

            let element =
                `<div class="item-buku">
                    <div class="part1">
                        <h3 class="judul">${e.judul}</h3>
                        <p>Penulis : <span class="penulis">${e.penulis}</span></p>
                        <p>Tahun : <span class="tahun">${e.tahun}</span></p>
                    </div>
                    <div class="part2">
                        <button class="btn is-selesai" onclick="switchStatus('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
                            Selesai
                        </button>
                        <button class="btn hapus" onclick="hapusBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
                            Hapus
                        </button>
                    </div>
                </div>`;

            daftarBukuSelesai += element;

        });

        hasilCari.belum.forEach(e => {

            let element =
                `<div class="item-buku">
                    <div class="part1">
                        <h3 class="judul">${e.judul}</h3>
                        <p>Penulis : <span class="penulis">${e.penulis}</span></p>
                        <p>Tahun : <span class="tahun">${e.tahun}</span></p>
                    </div>
                    <div class="part2">
                        <button class="btn is-selesai" onclick="switchStatus('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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

    addBookBtn.addEventListener('click', ()=>{

        let objBuku = {
            "judul": tambahBuku.judul.value,
            "penulis": tambahBuku.penulis.value,
            "tahun": tambahBuku.tahun.value,
            "isDibaca": tambahBuku.isDibaca.checked
        };

        if (objBuku.judul === ""){
            alert('Mohon isi kolom "Judul"')
        }else{
            if (objBuku.penulis === ""){
                alert('Mohon isi kolom "Penulis"')
            }else{
                if (objBuku.tahun === ""){
                    alert('Mohon isi kolom "Tahun"')
                }else{
                    if(objBuku.isDibaca===true){
                        dataBukuJSON.selesai.push(objBuku);
                    }else{
                        dataBukuJSON.belum.push(objBuku);
                    }
                    localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
                    tampilkanRak();
                }
            }
        }

    });

}else{
    alert("Browser tidak mendukung Storage")
}


