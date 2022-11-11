const button = document.getElementsByClassName("button")
const textBox1 = document.getElementById("box1")

function sendToBackEnd(evt){
    evt.preventDefault()
    console.log(textBox1.value)

}

let sarahObj = 
{
userName:textBox1.value,
partnerNAme:textBox2.value

}
button.addEventListener("click", sendToBackEnd)