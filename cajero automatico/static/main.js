/*botones*/
let login = document.querySelector("#login");
let addButon = document.querySelector("#add-button")
let substractButon = document.querySelector("#substract-button")
let logoutButton = document.querySelector("#logout-button")
let depositButton = document.querySelector("#depositButton")
let withdrawsButton = document.querySelector("#withdrawButton")
let returnDeposit = document.querySelector("#return-deposit")
let returnWithdraw = document.querySelector("#return-withdraw")




/* variables del usuario globales para poder modifirarlos */
let globalUserName = "";
let globalUserBalance = 0;

let usersData = [
    {user:"GERARDO",
    balance: 200,
    nip: 1234,
    },
    {user:"ISABEL",
    balance: 350,
    nip: 1122,
    },
    {user:"ISABEL",
    balance: 400,
    nip: 3344,
    },
    {user:"ISABEL",
    balance: 700,
    nip: 5566,
    }
]

//para verificar el inicio de sesion
const verifyLogin = (user, nip) => {
    for(let i = 0; i < usersData.length; i++){
        if(user === usersData[i].user && nip === usersData[i].nip){
            globalUserName = usersData[i].user;
            globalUserBalance = usersData[i].balance;

            return true
        }
    }
    return false
}

//para wue no se vuelva a cargar la pagina en el form
const formHandler = (event) => {
    event.preventDefault();
    console.log(event.target)
    let user = document.querySelector("#user").value.toUpperCase();
    let nip = parseInt(document.querySelector("#nip").value, 10);
    let loginMessage = document.querySelector("#login-message");

    if (verifyLogin(user, nip)) {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#main-page").style.display = "block";
        console.log(globalUserName)
        console.log(globalUserBalance)
        document.querySelector("#displayUsername").textContent = globalUserName;
        document.querySelector("#display-balance").textContent = globalUserBalance.toFixed(2);
    } else {
        loginMessage.innerHTML = "<p>El usuario o el nip son incorrectos. <p>"
    }
}

//codigo para depositar dinero
const add = (amount) => {
    if (!isNaN(amount)) { 
        globalUserBalance += amount
        console.log(globalUserBalance)
    }
    document.querySelector("#display-balance").textContent = globalUserBalance.toFixed(2);
    document.querySelector("#add-amount").value = ""; 
    document.querySelector("#deposit-page").style.display = "none";
    document.querySelector("#main-page").style.display = "block"
}

const formAdd = (event) => {
    event.preventDefault();
    let amount = parseFloat(document.querySelector("#add-amount").value)
    add(amount)     
}

//codigo para retirar dinero
const substract = (amount) => {
    if (!isNaN(amount)) { 
        globalUserBalance -= amount
        console.log(globalUserBalance)
    }
    document.querySelector("#display-balance").textContent = globalUserBalance.toFixed(2);
    document.querySelector("#substract-amount").value = ""; 
    document.querySelector("#withdraw-page").style.display = "none";
    document.querySelector("#main-page").style.display = "block"
}

const formWithdraw = (event) => {
    event.preventDefault();
    let amount = parseFloat(document.querySelector("#substract-amount").value)
    substract(amount)     
}

/*boton para regresar de pagina */
const DepositFormReturn = () => {
    document.querySelector("#deposit-page").style.display = "none"
    document.querySelector("#main-page").style.display = "block"
}

const WithdrawFormReturn = () => {
    document.querySelector("#withdraw-page").style.display = "none"
    document.querySelector("#main-page").style.display = "block"
}

//funcion de boton para irse a la pgina de depositos
const deposit = () => {
    document.querySelector("#main-page").style.display = "none"
    document.querySelector("#deposit-page").style.display = "block"
}

//funcion de boton paa irse a la pagina de retiros
const withdraw = () => {
    document.querySelector("#main-page").style.display = "none"
    document.querySelector("#withdraw-page").style.display = "block"
}

/*boton para cerrar sesioin yq ue se guarde la info en la base de datos*/
const logOut = () => {
    let userUpdate = usersData.find(user => user.user === globalUserName)
    if (userUpdate) {
    globalUserBalance = 0
    globalUserName = ""
    }
    document.querySelector("#main-page").style.display = "none"
    document.querySelector("#login").style.display = "block"
    document.querySelector("#user").value = ""; 
    document.querySelector("#nip").value = ""; 
}
//para ingresar
login.addEventListener("submit", (event) => formHandler(event))

//para que te lleve de la pagina principal a depositar o retirrar
depositButton.addEventListener("click", () => deposit())
withdrawsButton.addEventListener("click", () => withdraw())

//para regresar a la pagina principal
returnDeposit.addEventListener("click", () => DepositFormReturn ())
returnWithdraw.addEventListener("click", () => WithdrawFormReturn ())

//para hacer la funcion de restar o sumar al balance
document.querySelector("#deposit-form").addEventListener("submit", formAdd);
document.querySelector("#withdraw-form").addEventListener("submit", formWithdraw);

//para salir de la pagina
logoutButton.addEventListener("click", () => logOut())


