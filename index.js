const cels =document.getElementsByTagName('td')
const reset =document.getElementsByTagName('button')[0]
const table=document.getElementById('mesa')

let XTime =true 
let XPlayer=[]
let OPlayer=[]

const player1Score=document.getElementsByClassName('player1__score')[0]
const player2Score=document.getElementsByClassName('player2__score')[0]
let player1ScoreNum=0
let player2ScoreNum=0

const turn = document.getElementById('turn')

let draws=0
let drawsCounting=document.getElementById('draw')

turn.addEventListener('onload',changeOfturn(XTime))

function changeOfturn(XTime){
    if(XTime){
        turn.innerText='X'
        turn.style.color='red'
        return
    }else{
        turn.innerText='O'
        turn.style.color='blue'
        return
    }  
    
}

const winArr=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

for(let i=0; i<cels.length;i++){
        cels[i].addEventListener('click',(e)=>{
            if(XTime){
                if(e.target.innerText==''){
                    cels[i].innerText='x'
                    cels[i].style.color='red'
                    XPlayer.push(Number(e.target.id) ) //array do x
                    XTime=false 
                    changeOfturn(XTime)
                    
                    if( playerWin(XPlayer) ) {

                        setTimeout(() => {
                            window.alert( 'x Ganhou!!' )
                            resetar()
                            player2ScoreNum++
                            player2Score.innerText=player2ScoreNum                     
                            changeOfturn(XTime)
                        }, 100);

                    }else{
                        empate(XPlayer, OPlayer)
                        XTime=true
                    }
                }
            }
            setTimeout(() => {
                
                let escolhaComputador= escolhaComp(XPlayer,OPlayer)
                OPlayer.push(escolhaComputador)
                
                cels[escolhaComputador-1].innerText='o'
                cels[escolhaComputador-1].style.color='blue'
                
                XTime=true 
                changeOfturn(XTime) 
            
                if( playerWin(OPlayer) ) {
                    setTimeout(() => {
                        window.alert( 'o Ganhou!!' )
                        resetar()
                        player1ScoreNum++
                        player1Score.innerText=player1ScoreNum  
                    }, 100);
                }else{
                    empate(XPlayer, OPlayer)
                    XTime=true 
                }

            }, 200);

            

           /* parte do código para jogar com adversário manual 
           else{
                if(e.target.innerText==''){
                    cels[i].innerText='o'
                    cels[i].style.color='blue'
                    OPlayer.push(Number(e.target.id) )
                    XTime=true 
                    changeOfturn(XTime)
                    if( playerWin(OPlayer) ) {
                        setTimeout(()=>{
                            window.alert( 'o Ganhou!!' )
                            resetar()
                        }, 200);                        
                        player1Score.innerText+='I'
                        changeOfturn(XTime)
                        return 
                    }
                }
            } */  
        } )
    
}
reset.addEventListener('click',resetar )

function empate(XPlayer,OPlayer){
    if( (XPlayer.reduce( (elem,soma)=>elem+soma,0 )+ OPlayer.reduce( (elem,soma)=>elem+soma,0 )) == 45 ){
        setTimeout(()=>{
            window.alert( 'Empate, reiniciando a partida!' )
            resetar()
        }, 200);
        draws++
        drawsCounting.innerText=`${draws}`
    }
}

function resetar(){
    for(let i=0; i<cels.length;i++){
        cels[i].innerText=''
    }
    XPlayer=[]
    OPlayer=[]
    return
}


/* Verificando se houve vitória, retorna true ou false */
function playerWin(arr){
    let soma=0
    for(let i=0;i<winArr.length;i++){
        for(let j=0; j<3;j++){
            if(arr.includes( winArr[i][j] ) ) soma++
        }
        if(soma==3) return true
        soma=0
    }
   return false
}

/**IA Escolhe qual celula preencher */
function escolhaComp(XPlayer,OPlayer){
    let verificarEmpate=  XPlayer.reduce( (elem,soma)=>elem+soma,0 )+ OPlayer.reduce( (elem,soma)=>elem+soma,0 )== 45 
    if(verificarEmpate==false){
        if(compVerifyOWin(XPlayer,OPlayer)!=false ){
            console.log('1° if')
            
            return compVerifyOWin(XPlayer,OPlayer)
        }else if(compVerifyXWin(XPlayer,OPlayer)!=false ){
            console.log('2° if')
            return compVerifyXWin(XPlayer,OPlayer)
        }else if(XPlayer.length==1 && XPlayer[0]==5){
            console.log('3° if')
            const pontas=[1,3,7,9]
            return pontas[ Math.floor( Math.random()*4 ) ]
        }else{
            console.log('4° if')
            return computadorRandom(XPlayer)
        }
    }
}


function compVerifyXWin(XPlayer,OPlayer){
    let soma=0
    for(let i=0;i<winArr.length;i++){
        for(let j=0; j<3;j++){
            if(XPlayer.includes( winArr[i][j] ) ) soma++
        }
        if(soma==2){
            for(let k=0; k<3 ;k++){
                if( !OPlayer.includes(winArr[i][k]) && !XPlayer.includes(winArr[i][k]) ){
                    return winArr[i][k]
                }
            }   
        }
        soma=0
    }
    return false
}


function compVerifyOWin(XPlayer,OPlayer){
    let soma=0
    for(let i=0;i<winArr.length;i++){
        for(let j=0; j<3;j++){
            if(OPlayer.includes( winArr[i][j] ) ) soma++
        }
        if(soma==2){
            for(let k=0; k<3 ;k++){
                if( !(OPlayer.includes(winArr[i][k])) && !(XPlayer.includes(winArr[i][k])) ){
                    return winArr[i][k]
                }
            }  
        }
        soma=0 
    }
    return false
}

function computadorRandom(XPlayer){
    let numRandomico = Math.floor( Math.random()*9+1 ) 
    while(XPlayer.includes(numRandomico) || OPlayer.includes(numRandomico)){
        numRandomico = Math.floor( Math.random()*9+1 )
        if((XPlayer.reduce( (elem,soma)=>elem+soma,0 )+ OPlayer.reduce( (elem,soma)=>elem+soma,0 )) == 45){
            XPlayer=[]
            OPlayer=[]
        }
    }
    return numRandomico
}
