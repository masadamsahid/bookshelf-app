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

    // var dataBukuJSON = JSON.parse(getStorageItemByKey(bukuStorageKey));

    var dataBukuJSON = {"selesai":[{"judul": "judul 1","penulis": "penulis 1","tahun": "1000","isDibaca": true}, {"judul": "judul 2","penulis": "penulis 2","tahun": "2000","isDibaca": true}, {"judul": "judul 3","penulis": "penulis 3","tahun": "3000","isDibaca": true}, {"judul": "judul 4","penulis": "penulis 4","tahun": "4000","isDibaca": true}, {"judul": "judul 5","penulis": "penulis 5","tahun": "5000","isDibaca": true}], "belum": [{"judul": "judul 6","penulis": "penulis 6","tahun": "6000","isDibaca": false}, {"judul": "judul 7","penulis": "penulis 7","tahun": "7000","isDibaca": false}, {"judul": "judul 8","penulis": "penulis 8","tahun": "8000","isDibaca": false}, {"judul": "judul 9","penulis": "penulis 9","tahun": "9000","isDibaca": false}, {"judul": "judul 10","penulis": "penulis 10","tahun": "0000","isDibaca": false},]}

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
                    <div class="part1" ondblclick="editBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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
                    <div class="part1" ondblclick="editBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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

            let a = (e.judul === judul && e.penulis === penulis && e.tahun === tahun)

            return !a;
        });

        console.log('berhasil menghapus')

        dataBukuJSON[isDibaca ? "selesai" : "belum"] = x;

        localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
        tampilkanRak();

    }

    function editBuku(judul, penulis, tahun, isDibaca){

        let x = dataBukuJSON[isDibaca ? "selesai" : "belum"].findIndex(e => {

            let a = (e.judul === judul && e.penulis === penulis && e.tahun === tahun)

            return a;
        });

        if(x >= 0){
            console.log(x)
            const element = dataBukuJSON[isDibaca ? "selesai" : "belum"][x];

            let isDataRight = true;

            do{
                element.judul = prompt("Masukkan Judul",`${element.judul}`)
                element.penulis = prompt("Masukkan Penulis", `${element.penulis}`)

                do{
                    alert("Mohon isikan angka")
                    element.tahun = prompt("Masukkan Tahun",`${element.tahun}`)
                }while (Number.isNaN(parseInt(element.tahun)))

                element.isDibaca = confirm('Buku sudah selesai dibaca?')

                isDataRight = confirm(`
                Apakah data berikut sudah benar?\n\n
                Judul: ${element.judul}\n
                Penulis: ${element.penulis}\n
                Tahun: ${element.tahun}\n
                Status Baca: ${element.isDibaca ? 'Selesai' : 'Belum Selesai'}
                `)

                if (isDataRight){
                    break;
                }

            }while (true)

            if (element.isDibaca===isDibaca){
                dataBukuJSON[element.isDibaca ? "selesai" : "belum"][x] = element;
            }else {
                dataBukuJSON[element.isDibaca ? 'selesai' : 'belum'].push(element);
                hapusBuku(element.judul, element.penulis, element.tahun, isDibaca)
            }

            console.log(element)

            localStorage.setItem(bukuStorageKey, JSON.stringify(dataBukuJSON));
            tampilkanRak();

            if (element.isDibaca===isDibaca){
                alert("BUKU BERHASIL DISUNTING")
            }else {
                alert(`BUKU BERHASIL DISUNTING DAN DIPINDAHKAN PADA RAK ${element.isDibaca?'SELESAI':'BELUM'} DIBACA`)
            }

        }else {
            alert('buku tidak ditemukan')
        }

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
                    <div class="part1" ondblclick="editBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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
                    <div class="part1" ondblclick="editBuku('${e.judul}', '${e.penulis}', '${e.tahun}', ${e.isDibaca})">
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
