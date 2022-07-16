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
            label: 'Número de Datagramas IP Enviados',
            data: dataIPInY,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2
        },{
            label: 'Número de Datagramas IP Recebidos',
            data: dataIPInY2,
            backgroundColor: [
                'rgba(69, 51, 255, 0.2)',
            ],
            borderColor: [
                'rgba(69, 51, 255, 1)',
            ],
            borderWidth: 2
        }]
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
    setInterval(snmpGet2, 8000);
    timer = setInterval(snmpGet,8000);
});

document.getElementById("btnParar").addEventListener('click',function (){
    console.log("Parando o monitoramento!!");
    clearInterval(timer);
});

//Requisição SNMP
function snmpGet(){
    $.ajax({
        url: "php/snmpIP.php",
        method: "POST",
        data: "",
        success: function (response){
            
            if(vezes < 2){
                dataIPInY.push(0);
                valor = response;
            }
            else{
                total = response - valor;
                valor = response;
                var dateTime = new Date();
                labelIPInX.push(dateTime.toLocaleTimeString());
                dataIPInY.push(parseInt(total));
                console.log("O número total de pacotes é: ", response);
                console.log(total);
                myChart.update();
            }
            vezes++;
        } 
    
    })
}

function snmpGet2(){
    $.ajax({
        url: "php/snmpIP2.php",
        method: "POST",
        data: "",
        success: function (response){
            
            if(vezes < 2){
                dataIPInY2.push(0);
                valor2 = response;
            }
            else{
                total2 = response - valor2;
                valor2 = response;
                var dateTime = new Date();
                labelIPInX2.push(dateTime.toLocaleTimeString());
                dataIPInY2.push(parseInt(total2));
                console.log("O número total de pacotes é: ", response);
                console.log(total2);
                myChart.update();
            }
            vezes++;
        } 
    
    })
}
