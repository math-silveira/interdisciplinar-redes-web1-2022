const labelIPInX = [];
const dataIPInY = [];
const labelIPInX2 = [];
const dataIPInY2 = [];
var timer;
var valor = 0;
var total = 0;
var vezes = 0;



const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelIPInX,
        datasets: [{
            label: 'Processos',
            data: dataIPInY,
            backgroundColor: [
                'rgba(10, 180, 180, 0.2)',
            ],
            borderColor: [
                'rgba(10, 180, 180, 1)',
            ],
            borderWidth: 2
        },]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                  display: true,
                  text: 'Data/Hora'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Qtde de Datagramas'
                },
                //beginAtZero: true,
                // type: 'logarithmic',
                // min: 100000,
                // max: 300000,
            }
        }
    }
});


//Adicionando eventos nos botões
document.getElementById("btnIniciar").addEventListener('click', function (){
    console.log("Iniciando o monitoramento!!");
    timer = setInterval(snmpGet,8000);
});

document.getElementById("btnParar").addEventListener('click',function (){
    console.log("Parando o monitoramento!!");
    clearInterval(timer);
});

//Requisição SNMP
function snmpGet(){
    $.ajax({
        url: "php/snmpProcessos.php",
        method: "POST",
        data: "",
        success: function (response){
            
            var dateTime = new Date();
            labelIPInX.push(dateTime.toLocaleTimeString());
            dataIPInY.push(parseInt(response));
            console.log("O número total UDPIn é: ", response);
            myChart.update();
            
        } 
    
    })
}


