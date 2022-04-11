var data = []  

var dates = []
var rates = []
var title = ""

const file = document.getElementById('fileInput')

file.addEventListener('change', handleFileSelect, false);
  
function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event) {
    data = []
    dates = []
    rates = []
    title = ""
    title = event.target.result.split('\n').splice(0,1).join().slice(0,-1).slice(1)
    data.push(event.target.result.split('\n').slice(3, -1))
    getDatesRates()
}

function getDatesRates(){
    data[0].forEach((element) => {
        var split = element.split(',')
        dates.push(split[0])
        rates.push(split[1])
    })
    localStorage.setItem("dates", JSON.stringify(dates))
    localStorage.setItem("rates", JSON.stringify(rates))
    localStorage.setItem("title", JSON.stringify(title))
}

file.onchange = function(e) {
    var ext = this.value.match(/\.([^\.]+)$/);
    switch (ext[1]) {
        case 'csv':
            break;
        default:
            alert('Not allowed');
            this.value = '';
    }
}
