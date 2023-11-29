// istenen işilem 1 için çözüm aşamaları
// tıklanınlan koltuğa ulaşmak için container divini çek
// * container bir olay dinleyicisi ekle

//! htmlden Çağırdıklarımız
// bütün koltuk alanı
const container = document.querySelector('.container');
// console.log(container)
// alt kısım fiyat adet açıklama kısmı
const infoText = document.querySelector('.info-text');
// console.log(infoText)

// alt kısım koltuk adet kısmı
const totalSeatCount = document.getElementById('count');
// console.log(totalSeatCount)

// toplam fiyat kısmı
const totalPrice = document.getElementById('amount');
// console.log(totalPrice)

// film seçme sekmesi
const movieSelect = document.getElementById('movie');
const allSeats = document.querySelectorAll('.seat:not(.reserve)')
// console.log(allSeats)

const saveToDatabase = (willSaveIndex) =>{

   const jsonIndex = JSON.stringify(willSaveIndex);
   localStorage.setItem('seatIndex', jsonIndex);
   localStorage.setItem("movieIndex", JSON.stringify(movieSelect.selectedIndex));

};
const getFromDataBase = () =>{
    const dbSelectedIndex = JSON.parse(localStorage.getItem('seatIndex'));
    if(dbSelectedIndex !== null){
        allSeats.forEach((seat,index) =>{

            if(dbSelectedIndex.includes(index)){
                seat.classList.add('selected')
            }
        });
    }
    const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
    // console.log(dbSelectedMovie);
     movieSelect.selectedIndex = dbSelectedMovie;
    
};
getFromDataBase();
 
const createIndex=() =>{

    const allSeatsArray =[]

    allSeats.forEach((seat) =>{
        allSeatsArray.push(seat)
    })
    const allSelectedSeatsArray =[]

    const selectedSeats = container.querySelectorAll('.seat.selected')

    // console.log(selectedSeats)
    selectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    })
    const selecteIndex = allSelectedSeatsArray.map((selectedSeat)=>{
       return allSeatsArray.indexOf(selectedSeat)
    })
    // console.log(selecteIndex)
    saveToDatabase(selecteIndex)
}


//!fonksiyonlar

//! Toplam fiyat hesaplama fonksiyonu
function calculateTotal(){
    createIndex()
    const selectedSeatCounts = 
    container.querySelectorAll('.seat.selected').length;
    totalSeatCount.innerText=selectedSeatCounts;

    let seletedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value


    totalPrice.innerText= selectedSeatCounts * seletedMoviePrice;
    if(selectedSeatCounts > 0){
        infoText.classList.add('open')

    }else{
        infoText.classList.remove('open')
    }

}
calculateTotal()

//! koltuk seçme fonksiyon işlemler
container.addEventListener('click', (e) => {
    // console.log('tıklandı')
    const clickedSeat = e.target.offsetParent;
    // console.log(e.target.offsetParent);
    if(
        clickedSeat.classList.contains('seat') && 
        !clickedSeat.classList.contains('reserve'))
        {
            clickedSeat.classList.toggle('selected')

        }
        calculateTotal()
});
movieSelect.addEventListener('change', () =>{
    calculateTotal()
})