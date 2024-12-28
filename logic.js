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
                    <input type="text" value="1" class="contador adulto_room">
                    <button class="button-icon minus-image" onclick="alterarValorQuartos(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValorQuartos(this, 1, event)"></button>
                </div>
                <p class="warning-1_room" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-2_room" hidden>Não podem haver mais bebes do que adultos.</p>
                <p class="warning-3_room" hidden>Para fazer a sua reserva online, deve existir pelo menos um adulto a viajar. Para fazer uma reserva para jovens adultos que viajem sozinhos, contacte-nos.</p>

            </div>
            <div class="div_crianca">
                <label>Crianças</label>
                <p>2-17 anos</p>
                <div class="option-counter">
                    <div class="option-attention-symbol"></div>
                    <input type="text" value="0" class="contador crianca_room">
                    <button class="button-icon minus-image" onclick="alterarValorQuartos(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValorQuartos(this, 1, event)"></button>
                </div>
                <p class="warning-1_room" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-3_room" hidden>0 é o número minimo.</p>
                <div class="div_criancaidade erro">
                </div>

            </div>
            <div class="div_bebe">
                <label>Bebés</label>
                <p>Menos de 2 anos</p>
                <div class="option-counter">
                    <div class="option-attention-symbol"></div>
                    <input type="text" value="0" class="contador bebe_room">
                    <button class="button-icon minus-image" onclick="alterarValorQuartos(this, -1, event)"></button>
                    <button class="button-icon plus-image" onclick="alterarValorQuartos(this, 1, event)"></button>
                </div>
                <p class="warning-1_room" hidden>Podem viajar até 9 clientes numa reserva. Não estão incluídos bebés. Obtenha mais informações sobre reservas de viagens de grupo.</p>
                <p class="warning-2_room" hidden>Não podem haver mais bebes do que adultos.</p>
                <p class="warning-3_room" hidden>0 é o número minimo.</p>

            </div>
        </div>
    </div>
    `;
    return quarto;
}
// Idade da Criança Input
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
function criarIdadeCrianca(numero, contexto) {
    const container = contexto.parentNode.querySelector('.div_criancaidade');
    container.innerHTML = '';  // Limpa os selects criados anteriormente
    let htmlContent = '';
    for (let i = 1; i <= numero; i++) {
        htmlContent += `
            <label class="option-label-top">Criança ${i} idade</label>
            <select class="select_idadecrianca" name="select_idadecrianca${i}" id="select_idadecrianca${i}">
                <option value="" selected disabled>Seleccionar</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
            </select>
            <p>Selecione a idade da Criança ${i}</p>
        `;
    }
    container.innerHTML = htmlContent;
}




function alterarValorQuartos(botao, incremento, event) {
    if (event) event.preventDefault();
    const input = botao.parentNode.querySelector('.contador');
    let valorAtual = parseInt(input.value, 10); // Converte a string para número
    const room = botao.closest('.rooms');
    const adulto = room.querySelector('.adulto_room');
    const crianca = room.querySelector('.crianca_room');
    const bebe = room.querySelector('.bebe_room');
    let nadulto = parseInt(adulto.value, 10); // Número de adultos
    let nbebe = parseInt(bebe.value, 10); // Número de bebês
    const warning1 = room.querySelector('.warning-1_room');
    const warning2 = room.querySelector('.warning-2_room') || room.querySelector('.warning-3');
    const warning3 = room.querySelector('.warning-3_room');

    // Cálculo do total de pessoas em todos os quartos
    let totalPessoasEmTodosOsQuartos = 0;
    const quartos = document.querySelectorAll('.rooms');
    quartos.forEach(q => {
        const adultoTotal = parseInt(q.querySelector('.adulto_room').value, 10) || 0;
        const criancaTotal = parseInt(q.querySelector('.crianca_room').value, 10) || 0;
        const bebeTotal = parseInt(q.querySelector('.bebe_room').value, 10) || 0;
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
    } else {
        // Se o valor de adultos, crianças ou bebês mudar, vamos atualizar apenas o contador correspondente
        if (input.classList.contains('adulto_room') && novoValor == 0 && nadulto == 1) {
            input.value = 1;
            warning3.style.display = 'block';
        } else if (input.classList.contains('bebe_room') && novoValor > nadulto) {
            warning2.style.display = 'block';
            warning3.style.display = 'none';
        } else if (input.classList.contains('adulto_room') && novoValor < nbebe) {
            warning2.style.display = 'block';
            warning3.style.display = 'none';
        } else {
            input.value = novoValor;
            warning1.style.display = 'none';
            warning2.style.display = 'none';
            warning3.style.display = 'none';

            let span_fill = room.querySelector('.option-span-fill');
            let texto = '';

            // Atualiza somente o valor do contador alterado
            if (input.classList.contains('adulto_room')) {
                nadulto = novoValor;
                texto = nadulto == 1 ? '1 Adulto' : nadulto + ' Adultos';
            } else if (input.classList.contains('crianca_room')) {
                ncrianca = novoValor;
                texto = ncrianca == 0 ? '' : (ncrianca == 1 ? ', 1 Criança' : ', ' + ncrianca + ' Crianças');
                criarIdadeCrianca(ncrianca, botao.closest('.div_crianca'));
            } else if (input.classList.contains('bebe_room')) {
                nbebe = novoValor;
                texto = nbebe == 0 ? '' : (nbebe == 1 ? ', 1 Bebé' : ', ' + nbebe + ' Bebés');
            }

            // Atualiza o texto do span_fill
            span_fill.textContent = texto;

            // Atualiza o texto completo com os valores de adultos, crianças e bebês
            if (ncrianca || nbebe) {
                let fullText = texto;
                if (ncrianca > 0) {
                    fullText += ', ' + ncrianca + ' Crianças';
                    criarIdadeCrianca(ncrianca, room);
                }
                if (nbebe > 0) {
                    fullText += ', ' + nbebe + ' Bebés';
                }
                span_fill.textContent = fullText;
            }
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
        document.querySelectorAll('.nav_button').forEach(button => {
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
        // Verifica se `event.target.closest` não retorna null
        const optionContainer = event.target.closest('.option-container');
        if (!container.contains(event.target) && (!optionContainer || !optionContainer.contains(event.target))) {
            container.style.display = 'none';
            container.style.opacity = '0';
            container.style.filter = 'blur(0.1rem)';
        }
    });
});
const optionToInput = document.querySelectorAll('input[name="option-to"]');
const optionFromInput = document.querySelectorAll('input[name="option-from"]');
function updateLabel(input) {
    const label = input.closest('.option-container').querySelector('label');
    if (document.activeElement === input || input.value.trim() !== '') {
        label.classList.add('move-label-up');
    } else {
        label.classList.remove('move-label-up');
    }
}
optionToInput.forEach((input) => {
    input.addEventListener('focus', () => updateLabel(input));  // Quando o input for focado
    input.addEventListener('blur', () => updateLabel(input));   // Quando o input perder o foco
    input.addEventListener('input', () => updateLabel(input));  // Quando o conteúdo do input mudar
    updateLabel(input);
});
optionFromInput.forEach((input) => {
    input.addEventListener('focus', () => updateLabel(input));  // Quando o input for focado
    input.addEventListener('blur', () => updateLabel(input));   // Quando o input perder o foco
    input.addEventListener('input', () => updateLabel(input));  // Quando o conteúdo do input mudar
    updateLabel(input);
});

// Dynamic Form
// Radio Buttons
let inputFly = document.getElementById('schedule_fly');
let inputFlyHotel = document.getElementById('schedule_flyhotel');
let inputFlyVehicle = document.getElementById('schedule_flyvehicle');
let inputHotel = document.getElementById('schedule_hotel');
let inputVehicle = document.getElementById('schedule_vehicle');
let flightStatus = document.getElementById('flight_status');
// Rows
let return_vehicleRow = document.getElementById('return_vehicle_row');
let firstRow = document.getElementById('first_row');
let secondRow = document.getElementById('second_row');
let thirdRow1 = document.getElementById('third_row_1');
let thirdRow2 = document.getElementById('third_row_2');
let fourthRow1 = document.getElementById('fourth_row_1');
let fourthRow2 = document.getElementById('fourth_row_2');
let fourthRow3 = document.getElementById('fourth_row_3');
// Form Inputs
let tariff_div = document.getElementById('tariff');
let optionReturn = document.getElementById('option_return');
let optionOneway = document.getElementById('option_oneway');
let To = document.getElementById('to');
let fromTo = document.getElementById('from-to');
let destiny = document.getElementById('destiny');
let carRetrieval = document.getElementById('car-retrieval');
let return_div = document.querySelector('.return');
let goLabel = document.getElementById('go_label');
let returnLabel = document.getElementById('return_label');
let cabin_div = document.getElementById('cabin');
let passengers_div = document.getElementById('passengers');
let rooms_div = document.getElementById('rooms');
let buttonHotel = document.getElementById('button-hotel');
let buttonVehicle = document.getElementById('button-vehicle');
let buttonFlight = document.getElementById('button-flight');
inputFly.addEventListener('change', function () {
    if (inputFly.checked) {
        // Inputs
        tariff_div.style.display = 'block';
        passengers_div.style.display = 'block';
        cabin_div.style.display = 'block';
        rooms_div.style.display = 'none';
        return_div.style.display = 'block';
        fromTo.style.display = 'grid';
        destiny.style.display = 'none';
        carRetrieval.style.display = 'none';
        To.style.display = 'grid';
        fromTo.className = 'grid-cols-2 col-span-5 schedule-grid';
        goLabel.textContent = 'Partida';
        returnLabel.textContent = 'Regresso';
        buttonFlight.textContent = 'Procurar Voos';
        optionReturn.textContent = 'Regresso';
        optionOneway.textContent = 'Só Ida';
        // Rows
        return_vehicleRow.style.display = 'none';
        firstRow.className = 'grid-cols-6 schedule-grid';
        secondRow.className = 'grid-cols-4 schedule-grid';
        thirdRow1.style.display = 'none';
        thirdRow2.style.display = 'none';
        fourthRow1.style.display = 'grid';
        fourthRow2.style.display = 'none';
        fourthRow3.style.display = 'none';
    }
});

inputFlyHotel.addEventListener('change', function () {
    if (inputFlyHotel.checked) {
        // Inputs
        tariff_div.style.display = 'none';
        passengers_div.style.display = 'none';
        rooms_div.style.display = 'block';
        cabin_div.style.display = 'block';
        return_div.style.display = 'block';
        fromTo.style.display = 'grid';
        destiny.style.display = 'none';
        carRetrieval.style.display = 'none';
        To.style.display = 'grid';
        fromTo.className = 'grid-cols-2 col-span-5 schedule-grid';
        goLabel.textContent = 'Partida';
        returnLabel.textContent = 'Regresso';
        optionReturn.textContent = 'Regresso';
        optionOneway.textContent = 'Só Ida';
        // Rows
        return_vehicleRow.style.display = 'none';
        firstRow.className = 'grid-cols-2 schedule-grid';
        secondRow.className = 'grid-cols-4 schedule-grid';
        thirdRow1.style.display = 'grid';
        thirdRow2.style.display = 'none';
        fourthRow1.style.display = 'none';
        fourthRow2.style.display = 'grid';
        fourthRow3.style.display = 'none';
        buttonHotel.textContent = 'Procurar voo + hotel';
    }
});

inputFlyVehicle.addEventListener('change', function () {
    if (inputFlyVehicle.checked) {
        // Inputs
        tariff_div.style.display = 'none';
        passengers_div.style.display = 'block';
        rooms_div.style.display = 'none';
        cabin_div.style.display = 'block';
        return_div.style.display = 'block';
        fromTo.style.display = 'grid';
        destiny.style.display = 'none';
        To.style.display = 'grid';
        fromTo.className = 'grid-cols-2 col-span-5 schedule-grid';
        carRetrieval.style.display = 'none';
        goLabel.textContent = 'Partida';
        returnLabel.textContent = 'Regresso';
        optionReturn.textContent = 'Regresso';
        optionOneway.textContent = 'Só Ida';
        // Rows
        return_vehicleRow.style.display = 'none';
        firstRow.className = 'grid-cols-2 schedule-grid';
        secondRow.className = 'grid-cols-4 schedule-grid';
        thirdRow1.style.display = 'none';
        thirdRow2.style.display = 'grid';
        fourthRow1.style.display = 'none';
        fourthRow2.style.display = 'none';
        fourthRow3.style.display = 'grid';
        buttonVehicle.textContent = 'Procurar voo + carro';
    }
});

inputHotel.addEventListener('change', function () {
    if (inputHotel.checked) {
        // Inputs
        tariff_div.style.display = 'none';
        passengers_div.style.display = 'none';
        rooms_div.style.display = 'block';
        cabin_div.style.display = 'none';
        return_div.style.display = 'block';
        fromTo.style.display = 'none';
        destiny.style.display = 'grid';
        carRetrieval.style.display = 'none';
        goLabel.textContent = 'Check-in';
        returnLabel.textContent = 'Check-out';
        optionReturn.textContent = 'Regresso';
        optionOneway.textContent = 'Só Ida';
        // Rows
        return_vehicleRow.style.display = 'none';
        firstRow.className = 'grid-cols-2 schedule-grid';
        secondRow.className = 'grid-cols-3 schedule-grid';
        thirdRow1.style.display = 'grid';
        thirdRow2.style.display = 'none';
        fourthRow1.style.display = 'none';
        fourthRow2.style.display = 'grid';
        fourthRow3.style.display = 'none';
        buttonHotel.textContent = 'Procurar hotéis';
    }
});

inputVehicle.addEventListener('change', function () {
    if (inputVehicle.checked) {
        // Inputs
        tariff_div.style.display = 'none';
        passengers_div.style.display = 'none';
        rooms_div.style.display = 'none';
        cabin_div.style.display = 'none';
        return_div.style.display = 'block';
        fromTo.style.display = 'none';
        destiny.style.display = 'none';
        carRetrieval.style.display = 'grid';
        goLabel.textContent = 'Data de Recolha';
        returnLabel.textContent = 'Data de Entrega';
        optionReturn.textContent = 'Regresso';
        optionOneway.textContent = 'Só Ida';
        // Rows
        return_vehicleRow.style.display = 'grid';
        firstRow.className = 'grid-cols-2 schedule-grid';
        secondRow.className = 'grid-cols-4 schedule-grid';
        thirdRow1.style.display = 'none';
        thirdRow2.style.display = 'grid';
        fourthRow1.style.display = 'none';
        fourthRow2.style.display = 'none';
        fourthRow3.style.display = 'grid';
        buttonVehicle.textContent = 'Procurar automóveis';
    }
});

flightStatus.addEventListener('change', function () {
    if (flightStatus.checked) {
        // Inputs
        tariff_div.style.display = 'block';
        passengers_div.style.display = 'none';
        cabin_div.style.display = 'none';
        rooms_div.style.display = 'none';
        return_div.style.display = 'none';
        fromTo.style.display = 'grid';
        destiny.style.display = 'none';
        carRetrieval.style.display = 'none';
        To.style.display = 'none';
        fromTo.className = 'grid-cols-1 col-span-5 schedule-grid';
        goLabel.textContent = 'Data do Voo';
        buttonFlight.textContent = 'Prosseguir';
        optionReturn.textContent = 'Voo de Regresso';
        optionOneway.textContent = 'Voo de Ida';
        // Rows
        return_vehicleRow.style.display = 'none';
        firstRow.className = 'grid-cols-6 schedule-grid';
        secondRow.className = 'grid-cols-1 schedule-grid';
        thirdRow1.style.display = 'none';
        thirdRow2.style.display = 'none';
        fourthRow1.style.display = 'grid';
        fourthRow2.style.display = 'none';
        fourthRow3.style.display = 'none';
    }
});
function flightStatusDiv(flightNumber, day, hour, type, airport, date, status) {
    const divFligtStatus = document.createElement('div');
    divFligtStatus.classList.add('flight-status');
    divFligtStatus.innerHTML = `
    <p>Número do Voo: <span>TP${flightNumber}</span></p>
    <p>Dia do Voo: <span>${day}</span></p>
    <p>Hora do Voo: <span>${hour}</span></p>
    <div class="status">
    <p>Tipo de Voo: <span>${type}</span></p>
    <p>Aeroporto: <span>${airport}</span></p>
    <p>Data: <span>${date}</span></p>
    <p>Estado: <span class="span_status">${status}</span></p>
    </div>
    `;
    return divFligtStatus;
    }
    // Estado do Voo
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting
    const flightType = document.getElementById('option-tariff').value;
    const city = document.getElementById('option-from').value;
    const departure_date = document.getElementById('departure-date').value;
    const full_date = new Date(departure_date); // Convert to a Date object
    const day = full_date.getDate();
    const month = full_date.getMonth() + 1;
    const year = full_date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const day_of_week = full_date.getDay();
    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const container = document.querySelector('.flight-status-container');
    container.innerHTML = '';
    let horas;
    let status;
    if (city == 'Lisboa'){
        horas = ['10:05', '18:05']
    }
    else {
        horas = ['12:10', '20:10']
    }
    if (flightType == 'return'){
        if (day % 2 == 0){
            status = 'No Horário';
        }
        else if (day % 2 == 1){
            status = 'Atrasado';

        }
    }
    else if (flightType == 'oneway'){
        if (month % 2 == 0){
            status = 'No Horário';
        }
        else if (month % 2 == 1){
            status = 'Atrasado';
        }
    }
    let type;
    if (flightType == 'return'){
        type = 'Chegada';
    }
    else if (flightType == 'oneway'){
        type = 'Partida';

    }
    for (let y = 0; y <= 1; y++) {
        document.getElementById('fligt-status-section').style.display = 'block';
        container.style.padding  = '64px 0px';
        container.appendChild(flightStatusDiv(y+1, days[day_of_week],  horas[y], type, city, formattedDate, status));
    }
    const flight_status_spans = document.querySelectorAll('.span_status');
    if (status == 'Atrasado'){
        flight_status_spans.forEach((span) => {
            span.style.color = 'red';

        });
    } else {
        console.log("Coming Back to Life é a melhor música dos Pink Floyd")
    }
});


// Passageiros contador
function alterarValor(botao, incremento, event) {
    if (event) event.preventDefault();
    const input = botao.parentNode.querySelector('.contador');
    // Converte a string para numero decimal, logo estar la o 10
    let valorAtual = parseInt(input.value, 10);
    const adulto = document.querySelector('.adulto');
    const adolescente = document.querySelector('.adolescente');
    const crianca = document.querySelector('.crianca');
    const bebe = document.querySelector('.bebe');
    let nadulto = parseInt(adulto.value, 10);
    let nadolescente = parseInt(adolescente.value, 10);
    let ncrianca = parseInt(crianca.value, 10);
    let nbebe = parseInt(bebe.value, 10);
    const totalpassageiros = nadulto + ncrianca + nadolescente + incremento;
    const warning1 = botao.parentNode.parentNode.querySelector('.warning-1');
    //Handler para caso warning 2 seja null
    const warning2 = botao.parentNode.parentNode.querySelector('.warning-2') || botao.parentNode.parentNode.querySelector('.warning-3');
    const warning3 = botao.parentNode.parentNode.querySelector('.warning-3');
    // "!" nega a expressão (inverso)
    if (!input.classList.contains('bebe') && totalpassageiros > 9) {
        warning1.style.display = 'block';
        warning3.style.display = 'none';
        return;
    }
    const novoValor = valorAtual + incremento;
    if (input.classList.contains('adulto') && novoValor == 0 && nadulto == 1) {
        input.value = 1;
        warning3.style.display = 'block';
    } else if (input.classList.contains('bebe') && novoValor > nadulto) { 
        warning2.style.display = 'block';
        warning3.style.display = 'none';
    } else if(input.classList.contains('adulto') && novoValor < nbebe){
        warning2.style.display = 'block';
        warning3.style.display = 'none';
    }else if (novoValor < 0) {
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
let tariff = document.getElementById('option-tariff');
tariff.addEventListener('change', function () {
    if (inputFly.checked){
        if (tariff.value == 'oneway') {
            return_div.style.display = 'none';
        }
        else {
            return_div.style.display = 'block';
    }}
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

// Colocar data default dos datepickers
const departure_date_input = document.getElementById('departure-date');
const return_date_input = document.getElementById('return-date');
const today = new Date();
const three_days_ahead = new Date(); // Create a new Date object
three_days_ahead.setDate(today.getDate() + 3); // Add 3 days to this new Date object

departure_date_input.valueAsDate = today;
return_date_input.valueAsDate = three_days_ahead


// Desativar o botão, criar css para botão desativado.