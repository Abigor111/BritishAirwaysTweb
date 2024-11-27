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
        document.querySelectorAll('.option-label-top').forEach(option => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            option.appendChild(iconInstance);
        });
    } else {
        console.error("Template with id 'arrow-icon' not found.");
    }
});
// Dynamic Form
let scheduleInputFly = document.getElementById('schedule_input_fly');
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

// London Calling Buttons
let searchflightslondonbutton = document.getElementById("london-flight-search");
searchflightslondonbutton.addEventListener('click', function () {
    window.location.href = "https://www.britishairways.com/content/pt/pt/flights/england/london?dt=british%20airways%20|%20reserve%20voos,%20f%c3%a9rias,%20escapadinhas%20urbanas%20e%20fa%c3%a7a%20o%20check-in%20online&audience=travel&ban=e1a2221fc9e425ad237e44fa7933a6c5||her|1|cta1|1||||home||||l4||||anonymous-inspiration|||&source=her-pos-1-cta1&kmtag=c&kmver=1.0&clickpage=homepage";
});
// TODO: Para cada numero de quartos escolhido pelo utilizador, adicionar um novo quarto ao formulário
// TODO: Limitar a quantidade de pessoas que podem ser adicionadas
// TODO: Mudar o valor do input readonly consoante o tipo de pessoas nesse determinado input, por exemplo x adultos, y crianças etc.
// Limites conhecidos: máx de 9 pessoas, não pode haver mais bebes do que adultos
// TODO: Se a tarifa for de apenas ida tirar a data de volta