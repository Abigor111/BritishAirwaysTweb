// Evitar o código de criação de novo quartos
function criarQuarto(numero) {
    const quarto = document.createElement('div');
    quarto.classList.add('option-container', 'room' + numero, 'rooms');

    quarto.innerHTML = `
    <label for="flighthotel-option-roomoccupants- ${numero}" class="option-label-top">Quarto ${numero}</label>
    <button id="flighthotel-roomoccupants-button- ${numero}" name="flighthotel-option-roomoccupants- ${numero}" onclick="appear_option_dropdown_container(event)"><span class="option-span-fill">1 Adulto</span></button>
    <div class="option_dropdown_container">
        <div class="option-dropdown-grid">
            <div class="div_adulto">
                <label>Adultos</label>
                <p>18 anos ou mais</p>
                <div class="option-counter">
                    <div class="option-attention-symbol"></div>
                    <input type="text" value="1" class="contador adulto">
                    <button class="button-icon minus-image" onclick="alterarValor(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValor(this, 1, event)"></button>
                </div>
                <p class="warning-1" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-3" hidden>Para fazer a sua reserva online, deve existir pelo menos um adulto a viajar. Para fazer uma reserva para jovens adultos que viajem sozinhos, contacte-nos.</p>

            </div>
            <div class="div_crianca">
                <label>Crianças</label>
                <p>2-17 anos</p>
                <div class="option-counter">
                    <div class="option-attention-symbol"></div>
                    <input type="text" value="0" class="contador crianca">
                    <button class="button-icon minus-image" onclick="alterarValor(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValor(this, 1, event)"></button>
                </div>
                <p class="warning-1" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-3" hidden>0 é o número minimo.</p>

            </div>
            <div class="div_bebe">
                <label>Bebés</label>
                <p>Menos de 2 anos</p>
                <div class="option-counter">
                    <div class="option-attention-symbol"></div>
                    <input type="text" value="0" class="contador bebe">
                    <button class="button-icon minus-image" onclick="alterarValor(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValor(this, 1, event)"></button>
                </div>
                <p class="warning-1" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-2" hidden>Não podem haver mais bebes do que adultos.</p>
                <p class="warning-3" hidden>0 é o número minimo.</p>
                <div class="container-crianca">
                </div>
            </div>
        </div>
    </div>
    `;
    return quarto;
}
// Idade da Criança Input
function criarIdadeCrianca(numero, contexto) {
    const container = contexto.parentNode.querySelector('.container-crianca');

    // Limpa os selects criados anteriormente
    container.innerHTML = '';

    // Loop para criar 'numero' de selects (um para cada criança)
    for (let i = 1; i <= numero; i++) {
        const select = document.createElement('select');
        select.name = 'idadeCrianca' + i;
        select.id = 'idadeCrianca' + i;

        const optionDefault = document.createElement('option');
        optionDefault.value = "";
        optionDefault.textContent = "Selecionar";
        select.appendChild(optionDefault);
        // Loop para inserir todas as possiveis idades da criança
        for (let j = 2; j <= 17; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = j;
            select.appendChild(option);
        }

        container.appendChild(select);
    }
}
// Adicionar um quarto consoante o numero de quartos
let roomSelector = document.querySelector('.nrooms-select');
roomSelector.addEventListener('change', function () {
    const container = document.querySelector('.room-container');
    // Limpar o conteúdo existente
    container.innerHTML = '';
    if (roomSelector.value == 'oneroom') {
        container.appendChild(criarQuarto(1));
    } else if (roomSelector.value == 'tworoom') {
        container.appendChild(criarQuarto(1));
        container.appendChild(criarQuarto(2));
    } else if (roomSelector.value == 'threeroom') {
        container.appendChild(criarQuarto(1));
        container.appendChild(criarQuarto(2));
        container.appendChild(criarQuarto(3));
    } else if (roomSelector.value == 'fourroom') {
        container.appendChild(criarQuarto(1));
        container.appendChild(criarQuarto(2));
        container.appendChild(criarQuarto(3));
        container.appendChild(criarQuarto(4));
    }
});




function alterarValorQuartos(botao, incremento, event) {
    if (event) event.preventDefault();
    const input = botao.parentNode.querySelector('.contador');
    let valorAtual = parseInt(input.value, 10); // Converte a string para número
    const adulto = botao.parentNode.parentNode.querySelector('.adulto');
    const crianca = botao.parentNode.parentNode.querySelector('.crianca');
    const bebe = botao.parentNode.parentNode.querySelector('.bebe');
    let nadulto = parseInt(adulto.value, 10); // Número de adultos
    const warning1 = botao.parentNode.parentNode.querySelector('.warning-1');
    const warning2 = botao.parentNode.parentNode.querySelector('.warning-2') || botao.parentNode.parentNode.querySelector('.warning-3');
    const warning3 = botao.parentNode.parentNode.querySelector('.warning-3');
    // Cálculo do total de pessoas em todos os quartos
    let totalPessoasEmTodosOsQuartos = 0;
    const quartos = document.querySelectorAll('.rooms');
    quartos.forEach(q => {
        const adultoTotal = parseInt(q.querySelector('.adulto').value, 10) || 0;
        const criancaTotal = parseInt(q.querySelector('.crianca').value, 10) || 0;
        const bebeTotal = parseInt(q.querySelector('.bebe').value, 10) || 0;
        totalPessoasEmTodosOsQuartos += adultoTotal + criancaTotal + bebeTotal;
    });
    if (totalPessoasEmTodosOsQuartos + incremento > 9) {
        warning1.style.display = 'block';
        warning3.style.display = 'none';
        return;
    }

    const novoValor = valorAtual + incremento;

    if (novoValor < 0) {
        warning3.style.display = 'block';
    } else if (input.classList.contains('adulto') && novoValor == 0 && nadulto == 1) {
        input.value = 1;
        warning3.style.display = 'block';
    } else if (input.classList.contains('bebe') && novoValor > nadulto) {
        warning2.style.display = 'block';
        warning3.style.display = 'none';
    } else {
        input.value = novoValor;
        // Atualiza o texto de resumo
        let span_fill = botao.closest('.option-container').querySelector('.option-span-fill');
        warning1.style.display = 'none';
        warning2.style.display = 'none';
        warning3.style.display = 'none';

        // Atualiza os textos de acordo com o número de adultos, crianças e bebês
        let nadulto = parseInt(adulto.value, 10);
        if (nadulto == 1) {
            span_fill.textContent = '1 Adulto';
        } else {
            span_fill.textContent = nadulto + ' Adultos';
        }

        let ncrianca = parseInt(crianca.value, 10);
        if (ncrianca == 0) {
            span_fill.textContent += '';
            criarIdadeCrianca(0, input);

        } else if (ncrianca == 1) {
            span_fill.textContent += ', 1 Criança';
            criarIdadeCrianca(1, input);
        } else {
            span_fill.textContent += ', ' + ncrianca + ' Crianças';
            for (let i = 1; i <= ncrianca; i++) {
                criarIdadeCrianca(i, input);
            }
        }

        let nbebe = parseInt(bebe.value, 10);
        if (nbebe == 0) {
            span_fill.textContent += '';
        } else if (nbebe == 1) {
            span_fill.textContent += ', 1 Bebé';
        } else {
            span_fill.textContent += ', ' + nbebe + ' Bebés';
        }
    }
}

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
document.addEventListener('click', function (event) {
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
let inputFly = document.getElementById('schedule_fly');
let inputFlyHotel = document.getElementById('schedule_flyhotel');
let inputFlyVehicle = document.getElementById('schedule_flyvehicle');
let inputHotel = document.getElementById('schedule_hotel');
let inputVehicle = document.getElementById('schedule_vehicle');
let firstRow = document.getElementById('first_row');
let secondRow = document.getElementById('second_row');
let thirdRow1 = document.getElementById('third_row_1');
let thirdRow2 = document.getElementById('third_row_2');
let fourthRow1 = document.getElementById('fourth_row_1');
let fourthRow2 = document.getElementById('fourth_row_2');
let fourthRow3 = document.getElementById('fourth_row_3');
let tariff_div = document.getElementById('tariff');
let passengers_div = document.getElementById('passengers');
let rooms_div = document.getElementById('rooms');
inputFly.addEventListener('click', function () {
    tariff_div.style.display = 'block';
    firstRow.className = 'grid-cols-6 schedule-grid';
    passengers_div.style.display = 'block';
    rooms_div.style.display = 'none';
    thirdRow1.style.display = 'none';
    thirdRow2.style.display = 'none';
    fourthRow1.style.display = 'grid';
    fourthRow2.style.display = 'none';
    fourthRow3.style.display = 'none';

});
inputFlyHotel.addEventListener('click', function () {
    tariff_div.style.display = 'none';
    firstRow.className = 'grid-cols-2 schedule-grid';
    passengers_div.style.display = 'none';
    rooms_div.style.display = 'block';
    thirdRow1.style.display = 'grid';
    thirdRow2.style.display = 'none';
    fourthRow1.style.display = 'none';
    fourthRow2.style.display = 'grid';
    fourthRow3.style.display = 'none';
});
inputFlyVehicle.addEventListener('click', function () {
    tariff_div.style.display = 'none';
    firstRow.className = 'grid-cols-2 schedule-grid';
    passengers_div.style.display = 'block';
    rooms_div.style.display = 'none';
    thirdRow1.style.display = 'none';
    thirdRow2.style.display = 'grid';
    fourthRow1.style.display = 'none';
    fourthRow2.style.display = 'none';
    fourthRow3.style.display = 'grid';

});
/*
let schedule_flight_hotel = document.getElementById("schedule-flight-hotel");
let schedule_flight_vehicle = document.getElementById("schedule-flight-vehicle");
let schedule_hotel = document.getElementById("schedule-hotel");
let schedule_vehicle = document.getElementById("schedule-vehicle");
let schedule_flight = document.getElementById("schedule-flight");



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
    } else if (input.classList.contains('bebe') && novoValor > nadulto) { // || input.classList.contains('adulto')
        warning2.style.display = 'block';
        warning3.style.display = 'none';

    } else if (novoValor < 0) {
        warning3.style.display = 'block';

    } else {
        input.value = novoValor;
        let span_fill = botao.closest('.option-container').querySelector('.option-span-fill');
        warning1.style.display = 'none';
        warning2.style.display = 'none';
        warning3.style.display = 'none';
        let nadulto = parseInt(adulto.value, 10);
        if (nadulto == 1) {
            span_fill.textContent = '1 Adulto'
        }
        else {
            span_fill.textContent = nadulto + ' Adultos'
        }
        let nadolescente = parseInt(adolescente.value, 10);
        if (nadolescente == 0) {
            span_fill.textContent += ''
        }
        else if (nadolescente == 1) {
            span_fill.textContent += ', 1 Jovem adulto'
        } else {
            span_fill.textContent += ', ' + nadolescente + ' Jovens adultos'
        }
        let ncrianca = parseInt(crianca.value, 10);
        if (ncrianca == 0) {
            span_fill.textContent += ''
        }
        else if (ncrianca == 1) {
            span_fill.textContent += ', 1 Criança'
        } else {
            span_fill.textContent += ', ' + ncrianca + ' Crianças'
        }
        let nbebe = parseInt(bebe.value, 10);
        if (nbebe == 0) {
            span_fill.textContent += ''
        }
        else if (nbebe == 1) {
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


// Desativar o botão, criar css para botão desativado.