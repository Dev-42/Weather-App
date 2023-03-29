let wrapper = document.querySelector(".wrapper")
let inputPart = document.querySelector(".input-part")
let infoTxt = inputPart.querySelector(".info-txt")
let inputField = inputPart.querySelector("input")
// Working on the location button now to ask from the user to take the location of the user
let locationbtn = inputPart.querySelector("button")

let wIcon = document.querySelector(".weather-part img")
// Functioning of backarrow
let arrowBack = wrapper.querySelector("header i")

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationbtn.addEventListener("click",() =>{
    //geolocation api returns the geographical position of the user
    if(navigator.geolocation){
        //if browser window supports geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("Your browser doesn't support geolocation api")
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${'1f63a7eb8b1e3ea2424c5d9f306082a7'}`;
    // fetchData();
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function onError(error){
    // console.log(error)
    infoTxt.innerText = "Location Access is Required";
    infoTxt.classList.add("error");
}

// console.log("Hello")
// let apiKey = "1f63a7eb8b1e3ea2424c5d9f306082a7"
function requestApi(city){
    // console.log(city)
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'1f63a7eb8b1e3ea2424c5d9f306082a7'}`;
    // fetchData();
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

// function fetchData(){
//     infoTxt.innerText = "Getting weather details...";
//     infoTxt.classList.add("pending");

//     fetch(api).then(response => response.json()).then(result => weatherDetails(result))
// }

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }
    else{
        //let's get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;

        // Changing the weather image according to the image

        if(id == 800){
            wIcon.src = "Icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "Icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "Icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "Icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "Icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "Icons/rain.svg";
        }

        //let's pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location span").innerText = `${city},${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`

        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active")
        console.log(info)
    }
}

//Functioning of arrowback

arrowBack.addEventListener("click", () =>{
    wrapper.classList.remove("active")
});