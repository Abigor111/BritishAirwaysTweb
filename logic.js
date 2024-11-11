document.addEventListener("DOMContentLoaded", () => {
    const iconTemplate = document.getElementById('link-arrow-icon-template');
    if (iconTemplate) {
        document.querySelectorAll('.topic-content-link').forEach(link => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            link.appendChild(iconInstance);
        });
    } else {
        console.error("Template with id 'link-arrow-icon-template' not found.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const iconTemplate = document.getElementById('arrow-icon-template');
    if (iconTemplate) {
        document.querySelectorAll('.banner_header_nav_button').forEach(link => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            link.appendChild(iconInstance);
        });
        document.querySelectorAll('.option-label-top').forEach(link => {
            const iconInstance = document.importNode(iconTemplate.content, true);
            link.appendChild(iconInstance);
        });
    } else {
        console.error("Template with id 'arrow-icon-template' not found.");
    }
});
const scheduleInputFly = document.getElementById('schedule_input_fly');
const scheduleInputFlyHotel = document.getElementById('schedule_input_flyhotel');
const scheduleInputFlyVehicle = document.getElementById('schedule_input_flyvehicle');
const scheduleInputHotel = document.getElementById('schedule_input_hotel');
const scheduleInputVehicle = document.getElementById('schedule_input_vehicle');
function checkFormChange() {
    const schedule_flight_hotel = document.getElementById("schedule-flight-hotel");
    const scheduleflight_vehicle = document.getElementById("schedule-flight-vehicle");
    const schedule_hotel = document.getElementById("schedule-hotel");
    const schedule_vehicle = document.getElementById("schedule-vehicle");
    const schedule_flight = document.getElementById("schedule-flight");
    if (scheduleInputFly.checked) {
        schedule_flight_hotel.style.display = 'none';        
        scheduleflight_vehicle.style.display = 'none';        
        schedule_hotel.style.display = 'none';
        schedule_vehicle.style.display = 'none';

        schedule_flight.style.display = 'block';
    }
    else if (scheduleInputFlyHotel.checked) {
        schedule_flight.style.display = 'none';
        scheduleflight_vehicle.style.display = 'none';        
        schedule_hotel.style.display = 'none';
        schedule_vehicle.style.display = 'none';
 
        schedule_flight_hotel.style.display = 'block';        
    }
    else if (scheduleInputFlyVehicle.checked) {
        schedule_flight.style.display = 'none';
        schedule_flight_hotel.style.display = 'none';        
        schedule_hotel.style.display = 'none';
        schedule_vehicle.style.display = 'none';

        scheduleflight_vehicle.style.display = 'block';        
    }
    else if (scheduleInputHotel.checked) {
        schedule_flight.style.display = 'none';
        schedule_flight_hotel.style.display = 'none';        
        scheduleflight_vehicle.style.display = 'none';        
        schedule_vehicle.style.display = 'none';

        schedule_hotel.style.display = 'block';
    }
    else if (scheduleInputVehicle.checked) {
        schedule_flight.style.display = 'none';
        schedule_flight_hotel.style.display = 'none';        
        scheduleflight_vehicle.style.display = 'none';        
        schedule_hotel.style.display = 'none';

        schedule_vehicle.style.display = 'block';
    }
};
scheduleInputFly.addEventListener('change', checkFormChange);
scheduleInputFlyHotel.addEventListener('change', checkFormChange);
scheduleInputFlyVehicle.addEventListener('change', checkFormChange);
scheduleInputHotel.addEventListener('change', checkFormChange);
scheduleInputVehicle.addEventListener('change', checkFormChange);