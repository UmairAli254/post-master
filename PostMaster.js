console.log("Hello, I am your post master :)");

//Show Time is Nav
function time() {

    let showTime = document.getElementById("showTime");
    setInterval(() => {
        showTime.innerText = new Date().toLocaleTimeString();
    }, 1000);

}

//Hide custom fields initial (Container)
const cFC = document.getElementById("customFieldsCol");
cFC.style.display = "none";
//Additonal Custom fields
const additionalCFC = document.getElementById("additionalCustomFieldsCol");

// IDs of GET & POST Radio
const get = document.getElementById("GET");
const post = document.getElementById("POST");
// IDs of JSON & Cstom Fields Radio
const json = document.getElementById("JSON");
const customFields = document.getElementById("customFields");


// Event Listiners on JSON & Custom Fields (Hide & Show Accordingly)
//{
const jC = document.getElementById("JSONcontainer");
json.addEventListener("click", () => {

    jC.style.display = "block";
    cFC.style.display = "none";
    // additionalCFC.display = "none !important";

});

customFields.addEventListener("click", () => {

    cFC.style.display = "block";
    jC.style.display = "none";

});
// } - End of (Hide & Show Accordingly)

// Hide and Show Post/customs Fields and Box accordingly
const hSPostRadios = document.getElementById("getPostRadios");
const hSjsonBox = document.getElementById("JSONcontainer");
const hSCustomFields = document.getElementById("customFieldsCol");


if(get.checked === true){
    hSPostRadios.classList.add("d-none");
    hSjsonBox.classList.add("d-none");
    hSCustomFields.classList.add("d-none");

}
get.addEventListener("click", ()=>{
    hSPostRadios.classList.add("d-none"); 
    hSjsonBox.classList.add("d-none");
    hSCustomFields.classList.add("d-none");
})
post.addEventListener("click", ()=>{
    hSPostRadios.classList.remove("d-none");
    hSjsonBox.classList.remove("d-none");
    hSCustomFields.classList.remove("d-none");
})

// End of Hide and Show Post Fields and Box accordingly



//Add additional Custom Field when clicked on + button
const aMBtn = document.getElementById("addMore");
let i = 2;
// let Umair = "";
// const Additional = document.getElementById("Additional");
aMBtn.addEventListener("click", () => {
    const Additional = document.getElementById("Additional");
    let string = `
<div class="row my-2 addC" id="rm${i}">
    <div class="col-5">
        <input type="text" class="form-control bg-light border-light" id="Property${i}" placeholder="Key" aria-label="Property">
    </div>
    <div class="col-5">
        <input type="text" class="form-control bg-light border-light" id="Value${i}" placeholder="Value" aria-label="Value">
    </div>
    <div class="col-2"><button class="btn bg-dark text-light removing" id="addMore${i}" onclick="removing(${i})">-</button></div>
</div>`;
    i++;
    let nE = document.createElement("div");
    nE.innerHTML = string;
    Additional.appendChild(nE);
    // Additional.innerHTML = Umair;
});

//Remove extra Custom Fields When clicked on the subtract (-) button
function removing(ID) {

    ID = document.getElementById("rm" + ID);
    ID.remove();

}

//After clicked on the submit button, 1.(get field's data), 2.(send request accordingly), & 3.(show the output)
const opColor = document.getElementById("opColor"); //For changing "Output" color
const output = document.getElementById("prismOUTPUT"); //Output box's id
const submit = document.getElementById("submit");
const JSONbox = document.getElementById("JSONbox");

//Eventlistener on submit button
submit.addEventListener("click", () => {

    //send GET or POST request after getting the content of all fields except custom fields
    output.innerText = "Please wait... Fetching response...";
    let url = document.getElementById("URL");

    // if(contentType == "")
    //get data of custom fields
    let Obj = {};
    if (post.checked === true && customFields.checked === true) {
        //Default Property and value IDs
        let dP = document.getElementById("Property1");
        let dV = document.getElementById("Value1");
        // console.log(dP.value, dV.value);
        Obj[dP.value] = dV.value;
        // console.log(Obj);

        //get data of additoinal custom fields
        for (let index = 2; index < i; index++) {

            if (document.getElementById("Property" + index) != undefined) {
                let key = document.getElementById("Property" + index).value;
                let val = document.getElementById("Value" + index).value;
                Obj[key] = val;
                // Obj = JSON.stringify(Obj);
                // console.log(key, val);
            }
        }
        // console.log(Obj);
    }
    
    
            // ******************* Request ****************************

    // By fetch API
    if (get.checked === true) {
        // GET request
        fetch(url.value).then(response => {
            if (response.ok === true) {
                opColor.style.color = "green";
                showTime.style.color = "green";
                document.getElementsByClassName("fa-lightbulb")[0].style.color = "green";

            }
            else if (response.ok !== true) {
                opColor.style.color = "red";
                showTime.style.color = "red";
            }
            else {
                opColor.style.color = "black";
                showTime.style.color = "gray";

            }

            return response.text();
        }).then(data => {
            output.innerHTML = data;
            Prism.highlightAll();
        }).catch((error) => {
            output.innerText = error;
            opColor.style.color = "red";
            showTime.style.color = "red";
            document.getElementsByClassName("fa-lightbulb")[0].style.color = "red";
        });
    }
    else {
        //POST Request
        let contentType = json.checked === true ? JSONbox.value : JSON.stringify(Obj);
        UmairPOST = {
            method: "POST",
            headers: {
                // "Content-type": "document"
                "Content-Type": "application/json"
            },
            body: contentType
        };
        fetch(url.value, UmairPOST).then(response => {

            if (response.ok === true) {
                opColor.style.color = "green";
                showTime.style.color = "green";
                document.getElementsByClassName("fa-lightbulb")[0].style.color = "green";
            }
            return response.json();
        }).then(data => {
            output.innerHTML = JSON.stringify(data);
            Prism.highlightAll();
        }).catch((error) => {
            output.innerText = error;
            opColor.style.color = "red";
            showTime.style.color = "red";
            document.getElementsByClassName("fa-lightbulb")[0].style.color = "red";
        });
    }



});//End of Submit Button' Event Listener;


//Night Mode
let nM = 0;
let night = document.getElementById("night");
let body = document.getElementsByTagName("body")[0];
function nightMode() {

    if (nM === 0) {
        body.style.backgroundColor = "black";
        body.style.color = "white"

        document.getElementById("URL").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("JSONbox").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("Property1").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("Value1").classList.add("bg-dark", "text-light", "border-dark");
        
        // document.getElementById("prismPre").classList.remove("bg-light");
        // document.getElementById("prismOUTPUT").classList.remove("text-dark");
        
        // document.getElementById("prismOUTPUT").classList.add("bg-dark");
        // document.getElementById("prismPre").classList.add("text-light");
        
        document.getElementById("navBar").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("contactUs").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("about").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("contactModal").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("contactModalA").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutModal").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutBackdropLabel").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutBackdropLabel").classList.remove("text-dark");
        document.getElementById("aboutModalB").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutModalB2").classList.add("bg-dark", "text-light", "border-dark");
        document.getElementById("GET").classList.add("bg-dark", "border-light", "border-2");
        document.getElementById("POST").classList.add("bg-dark", "border-light", "border-2");
        document.getElementById("JSON").classList.add("bg-dark", "border-light", "border-2");
        document.getElementById("customFields").classList.add("bg-dark", "border-light", "border-2");
        document.getElementById("night").style.borderColor = "#f9b514";


        night.innerHTML = `<i class="fas fa-lightbulb fa-rotate-270"></i>`;
        document.getElementsByClassName("fa-lightbulb")[0].style.color = "white";
        nM++;
    }
    else {
        body.style.backgroundColor = "white";
        body.style.color = "black";

        document.getElementById("URL").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("JSONbox").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("Property1").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("Value1").classList.remove("bg-dark", "text-light", "border-dark");
        
        // document.getElementById("prismPre").classList.add("bg-light");
        // document.getElementById("prismOUTPUT").classList.add("text-dark");
        
        // document.getElementById("prismOUTPUT").classList.remove("bg-dark");
        // document.getElementById("prismPre").classList.remove("text-light");
        
        document.getElementById("navBar").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("contactUs").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("about").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("contactModal").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("contactModalA").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutModal").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutBackdropLabel").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutBackdropLabel").classList.add("text-dark");
        document.getElementById("aboutModalB").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("aboutModalB2").classList.remove("bg-dark", "text-light", "border-dark");
        document.getElementById("GET").classList.remove("bg-dark", "border-light", "border-2");
        document.getElementById("POST").classList.remove("bg-dark", "border-light", "border-2");
        document.getElementById("JSON").classList.remove("bg-dark", "border-light", "border-2");
        document.getElementById("customFields").classList.remove("bg-dark", "border-light", "border-2");
        document.getElementById("night").style.borderColor = "rgb(101 148 170)";



        night.innerHTML = `<i class="fas fa-lightbulb fa-rotate-270"></i>`;
        document.getElementsByClassName("fa-lightbulb")[0].style.color = "black";
        nM--;
    }
}

// Night Mode For additional custom fields
setInterval(() => {
    if (nM === 1) {
        for (let index = 1; index < i; index++) {
            if (document.getElementById("Property" + index) != undefined) {
                document.getElementById("Property" + index).classList.add("bg-dark", "text-light", "border-dark");
                document.getElementById("Value" + index).classList.add("bg-dark", "text-light", "border-dark");
            }
        }
    } else {
        for (let index = 1; index < i; index++) {
            if (document.getElementById("Property" + index) != undefined) {

                document.getElementById("Property" + index).classList.remove("bg-dark", "text-light", "border-dark");
                document.getElementById("Value" + index).classList.remove("bg-dark", "text-light", "border-dark");
            }
        }
    }
}, 1);