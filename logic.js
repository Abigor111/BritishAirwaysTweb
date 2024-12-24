// Rendering the arrow templates
document.addEventListener("DOMContentLoaded", () => {
    const iconTemplate = document.getElementById('link-arrow-icon-template');
    if (iconTemplate) {
        document.querySelectorAll('.topic-content-link').forEach(link => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            link.appendChild(iconInstance);
        });
    } else {
        console.error("Template with id 'link-arrow-icon' not found.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const iconTemplate = document.getElementById('arrow-icon-template');
    if (iconTemplate) {
        document.querySelectorAll('.header_nav_button').forEach(button => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            button.appendChild(iconInstance);
        });

    } else {
        console.error("Template with id 'arrow-icon' not found.");
    }
});
// Aparecer container dropdown
function appear_option_dropdown_container(event) {
    event.preventDefault();

    let optionDropdownContainer = event.target.closest('.option-container').querySelector('.option_dropdown_container');

    // Verifica se o dropdown está visível ou não
    if (optionDropdownContainer.style.display === 'block') {
        // Se já estiver visível, escondê-lo
        optionDropdownContainer.style.display = 'none';
        optionDropdownContainer.style.opacity = '0';
        optionDropdownContainer.style.filter = 'blur(0.1rem)';
    } else {
        // Se não estiver visível, mostrá-lo
        optionDropdownContainer.style.display = 'block';
        optionDropdownContainer.style.opacity = '1';
        optionDropdownContainer.style.filter = 'blur(0px)';
    }
}

// Fechar o dropdown container (só fechara se o utilizador clicar fora do container)
document.addEventListener('click', function(event) {
    let dropdownContainers = document.querySelectorAll('.option_dropdown_container');
    dropdownContainers.forEach(container => {
        if (!container.contains(event.target) && !event.target.closest('.option-container').contains(event.target)) {
            container.style.display = 'none';
            container.style.opacity = '0';
            container.style.filter = 'blur(0.1rem)';
        }
    });
});

// Dynamic Form
/*let scheduleInputFly = document.getElementById('schedule_input_fly');
let scheduleInputFlyHotel = document.getElementById('schedule_input_flyhotel');
let scheduleInputFlyVehicle = document.getElementById('schedule_input_flyvehicle');
let scheduleInputHotel = document.getElementById('schedule_input_hotel');
let scheduleInputVehicle = document.getElementById('schedule_input_vehicle');
let schedule_flight_hotel = document.getElementById("schedule-flight-hotel");
let schedule_flight_vehicle = document.getElementById("schedule-flight-vehicle");
let schedule_hotel = document.getElementById("schedule-hotel");
let schedule_vehicle = document.getElementById("schedule-vehicle");
let schedule_flight = document.getElementById("schedule-flight");

scheduleInputFly.addEventListener('click', function () {
    schedule_flight_hotel.style.visibility = 'hidden';
    schedule_flight_vehicle.style.visibility = 'hidden';
    schedule_hotel.style.visibility = 'hidden';
    schedule_vehicle.style.visibility = 'hidden';
    schedule_flight.style.visibility = 'visible';
});

scheduleInputFlyHotel.addEventListener('change', function () {
    console.log('test input fly hotel');
    schedule_flight.style.visibility = 'hidden';
    schedule_flight_vehicle.style.visibility = 'hidden';
    schedule_hotel.style.visibility = 'hidden';
    schedule_vehicle.style.visibility = 'hidden';
    schedule_flight_hotel.style.visibility = 'visible';
});

scheduleInputFlyVehicle.addEventListener('click', function () {
    schedule_flight.style.visibility = 'hidden';
    schedule_flight_hotel.style.visibility = 'hidden';
    schedule_hotel.style.visibility = 'hidden';
    schedule_vehicle.style.visibility = 'hidden';
    schedule_flight_vehicle.style.visibility = 'visible';
});

scheduleInputHotel.addEventListener('click', function () {
    schedule_flight.style.visibility = 'hidden';
    schedule_flight_hotel.style.visibility = 'hidden';
    schedule_flight_vehicle.style.visibility = 'hidden';
    schedule_vehicle.style.visibility = 'hidden';
    schedule_hotel.style.visibility = 'visible';
});

scheduleInputVehicle.addEventListener('change', function () {
    schedule_flight.style.visibility = 'hidden';
    schedule_flight_vehicle.style.visibility = 'hidden';
    schedule_hotel.style.visibility = 'hidden';
    schedule_flight_hotel.style.visibility = 'hidden';
    schedule_vehicle.style.visibility = 'visible';
});
*/
// Passageiros contador
function alterarValor(botao, incremento, event) {
    if (event) event.preventDefault();
    const input = botao.parentNode.querySelector('.contador');
    let valorAtual = parseInt(input.value, 10); // Converte a string para numero decimal logo estar la o 10
    const adulto = document.querySelector('.adulto');
    const adolescente = document.querySelector('.adolescente');
    const crianca = document.querySelector('.crianca');
    const bebe = document.querySelector('.bebe');
    let nadulto = parseInt(adulto.value, 10);
    let nadolescente = parseInt(adolescente.value, 10);
    let ncrianca = parseInt(crianca.value, 10);
    const totalpassageiros = nadulto + ncrianca + nadolescente + incremento;
    const warning1 = botao.parentNode.parentNode.querySelector('.warning-1');
    const warning2 = botao.parentNode.parentNode.querySelector('.warning-2') || botao.parentNode.parentNode.querySelector('.warning-3'); //Handler para caso warning 2 seja null
    const warning3 = botao.parentNode.parentNode.querySelector('.warning-3');
    if (!input.classList.contains('bebe') && totalpassageiros > 9) { // "!" nega a expressão
        warning1.style.display = 'block';
        warning3.style.display = 'none';
        return;
    }
    const novoValor = valorAtual + incremento;
    if (input.classList.contains('adulto') && novoValor == 0 && nadulto == 1) {
        input.value = 1;
        warning3.style.display = 'block';
    } else if (input.classList.contains('bebe') && novoValor > nadulto){
        warning2.style.display = 'block';
        warning3.style.display = 'none';

    } else if(novoValor < 0){
        warning3.style.display = 'block';

    }else {
        input.value = novoValor;
        let span_fill = botao.closest('.option-container').querySelector('.option-span-fill');
        warning1.style.display = 'none';
        warning2.style.display = 'none';
        warning3.style.display = 'none';
        let nadulto = parseInt(adulto.value, 10);
        if (nadulto == 1){
            span_fill.textContent = '1 Adulto'
        }
        else {
            span_fill.textContent = nadulto + ' Adultos'
        }
        let nadolescente = parseInt(adolescente.value, 10);
        if (nadolescente == 0){
            span_fill.textContent += ''
        }
        else if (nadolescente == 1){
            span_fill.textContent += ', 1 Jovem adulto'
        } else {
            span_fill.textContent += ', ' + nadolescente + ' Jovens adultos'
        }
        let ncrianca = parseInt(crianca.value, 10);
        if (ncrianca == 0){
            span_fill.textContent += ''
        }
        else if (ncrianca == 1){
            span_fill.textContent += ', 1 Criança'
        } else {
            span_fill.textContent += ', ' + ncrianca + ' Crianças'
        }
        let nbebe = parseInt(bebe.value, 10);
        if (nbebe == 0){
            span_fill.textContent += ''
        }
        else if (nbebe == 1){
            span_fill.textContent += ', 1 Bebé'
        } else {
            span_fill.textContent += ', ' + nbebe + ' Bebés'
        }
    }
}
// Tarifa Ida e Volta
const tariff = document.getElementById('option-tariff');
tariff.addEventListener('change', function () {
    if (tariff.value == 'oneway') {
        document.querySelector('.return').style.display = 'none';
    }
    else {
        document.querySelector('.return').style.display = 'block';
    }
});
// Alterar o value do option-span-fill da cabine
function atualizarCabine() {
    const radios = document.querySelectorAll('input[name="cabin-type"]');
    const span = document.querySelector('.option-span-fill');
    const flexible_ticket = document.querySelector('.flexible_ticket');
    radios.forEach((radio) => {
        if (radio.checked) {
            let textoCabine = radio.nextElementSibling.textContent;

            if (flexible_ticket.checked) {
                textoCabine += ', Flexible (change ticket with no fee)';
            }

            span.textContent = textoCabine;
        }
    });
}
document.querySelectorAll('input[name="cabin-type"]').forEach((radio) => {
    radio.addEventListener('change', atualizarCabine);
});
document.querySelector('.flexible_ticket').addEventListener('change', atualizarCabine);

// TODO: Para cada numero de quartos escolhido pelo utilizador, adicionar um novo quarto ao formulário