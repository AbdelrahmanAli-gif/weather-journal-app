/* Global Variables */

const API='http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey= '&appid=9b9e9732a6dcf38a3dbdf911df0d278e&units=metric';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = (date.getMonth() + 1) + '/'+ date.getDate()+'/'+ date.getFullYear();

//event listner to call the addData fuction to update existing element
document.getElementById('generate').addEventListener('click',generateButton);

//generateButton function called by event listner
function generateButton(event){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(API, APIKey, zip)
        .then(function(data){
            console.log(data); 
            postData('/addData',{date:newDate, tempreature:data.main.temp ,feelings})
        })
        .then(function(){
            updateUI();
    })
};

 //weather is used in the above function to return the tempreature
const getWeather = async(API, APIKey, zip) => {
    const result = await fetch(API + zip + APIKey);
    try{
        const data = result.json();
        return data;
    } catch(error){
        console.log("error " + error );
    }
};

//post function to return JSON data type
const postData = async(url = "" , data={})=>{
    console.log(data);
    const response = await fetch (url , {
        method:"POST",
        credentials: "same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data),})
    try{
        const postedData = await response.json();
        return postedData;
    }
    catch(error){
        console.log('error '+ error);
    }
};

//function used to update the UI of our webpage
const updateUI = async () => {
    const request = await fetch('/all');
    console.log(request);
    try {
      const Data = await request.json()
      console.log(Data);
      document.getElementById('date').innerHTML ="Date: " + Data.date;
      document.getElementById('temp').innerHTML = "Tempreature: " + Data.temp;
      document.getElementById('content').innerHTML ="Feeling:  "+ Data.feelings;
    }
    catch (error) {
      console.log("error " + error);
    }
  };