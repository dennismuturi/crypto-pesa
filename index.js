//Crypto currency Price Tracker App
const div =document.querySelector("div");
let ul = document.getElementById("coin-list");

ul.style.borderRightStyle="solid"
ul.style.borderRightColor="black"

let modal = document.getElementById("myModal");
const closeButton =document.getElementById("closeButton");
closeButton.style.fontSize="10px";

        

function addCoins(coins)
{ 
   let i =0;
   
   for (const coin of coins){ 
   if(coin)
      {
         i++;
      
         let li = document.createElement("li");
        
         li.style.listStyle="none";
         li.style.float ="left";
         li.style.padding="5px";
         li.style.paddingLeft="4px"
       
         let coinName = document.createElement("h1");
         let coinSymbol = document.createElement("h3")
         let imageUrl =document.createElement("img");
         let price = document.createElement("p");
         let button = document.createElement("Button");
         button.innerText="BUY";
         button.style.backgroundColor="red";
         button.style.textAlign="center";
         const marketCap = document.createElement("li");
         marketCap.innerText = `Market Cap: ${coin.market_cap}`;
         marketCap.style.float="right";
         
         
         button.addEventListener("click",(e) =>{
            const checkout =document.getElementById("checkout");
            const checkoutList= document.createElement("ul");
            const baseList =document.createElement("li");
            const dollarSign =document.createElement("span");
           

            dollarSign.textContent=` $ `;
            dollarSign.style.fontSize="50px";
            
            const baseCoin = document.createElement("p");
            baseCoin.style.fontSize="50px";
            baseList.style.listStyle="none";
            baseList.style.paddingBottom="10px";
           
            const basePrice= document.createElement("span");
            basePrice.style.fontSize="50px";
            const addedCoin= coin.name;
            const addedCoinPrice= coin.current_price;
         
            console.log(baseList)
             
            baseCoin.innerText=addedCoin;
            basePrice.innerText=addedCoinPrice;
            basePrice.style.color ="red";
            
            baseList.appendChild(baseCoin);
            baseList.appendChild(dollarSign)
            baseList.appendChild(basePrice);

           
           
            checkoutList.appendChild(baseList);
            checkout.appendChild(checkoutList);
            checkout.style.visibility="visible";
            button.disabled=true;

            closeButton.addEventListener("click",() =>{
               baseCoin.remove();
               basePrice.remove();
               baseList.remove();
               button.disabled=false;
               checkout.style.visibility="hidden";
            });
            
            
         });
   

       imageUrl.style="width:50px";
       // coinName.innerText = `${i}. ${coin.name}`;
       coinName.innerText = `${coin.name}`;
      
       coinSymbol.innerText = coin.symbol;
       imageUrl.src = coin.image;
       price.innerText = `$ ${coin.current_price}`;
       price.style.color="red";
       price.style.fontWeight="100";
       price.style.fontSize="500";
        
          
          li.appendChild(imageUrl);
          li.appendChild(coinName);
         
          li.appendChild(coinSymbol);
          li.appendChild(price);
          li.appendChild(button);
          

          ul.appendChild(li);
         
      }
   }
   
}
document.addEventListener("DOMContentLoaded",(e) =>{

     fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cbusd%2Cethereum%2Cokb%2Cnear%2Clink%2Cavax&order=market_cap_desc&per_page=100&page=1&sparkline=false")
     .then(response => response.json())
     .then(coins => {
      
      addCoins(coins);
   })
     .catch(error =>{
        alert("error")
     })
   

     fetch("https://api.coincap.io/v2/assets")
     .then(response => response.json())
     .then(items => {
      const list= document.getElementById("rightSidebar");
      
      let i;
      
         for (i = 0; i < (items.data.length/10); i++){
            const alist = document.createElement("li");
            alist.style.listStyle='none';
            alist.innerText=`${items.data[i].rank}. ${items.data[i].name}`;
            list.appendChild(alist)
         }
         
        
         
      })
     .catch(error =>{
        alert("error")
     })
     
     const header=document.getElementById("header");
     const form =document.createElement("form");
     const input =document.createElement("input");
     const walletHead=document.createElement("p");
     const displayAmount=document.createElement("h3");
     const add=document.createElement("button");

     displayAmount.style.color="red"
     add.style.backgroundColor="red";
     add.style.textAlign="center";
     
     walletHead.innerText='My Wallet(KES):'
     
     
     add.setAttribute("type","button");
     displayAmount.innerText="0";
     add.innerText="Add";

     form.style.visibility="hidden";

     add.addEventListener("click",(e) =>{
      form.style.visibility="visible";
     })

     input.setAttribute("type","number");
     const addToWallet =document.createElement("button");
     addToWallet.style.backgroundColor="red";
     addToWallet.style.textAlign="center";
    
     addToWallet.innerText="Load Wallet";
     input.setAttribute("placeholder","Enter amount");
     add.setAttribute("type", "submit");
  
     header.appendChild(walletHead)
     header.appendChild(displayAmount) 
     header.appendChild(add);


     form.appendChild(input);
     form.appendChild(addToWallet)
     header.appendChild(form)

     addToWallet.addEventListener("click",(e) => {
        e.preventDefault();
        let amount =parseInt(e.target.parentNode.children[0].value);
        let display=parseInt(displayAmount.textContent);
        amount= amount + display;
        displayAmount.innerText=amount;
        form.style.visibility="hidden";

       
     })

})