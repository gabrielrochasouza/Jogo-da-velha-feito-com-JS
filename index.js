const cels =document.getElementsByTagName('td')
const reset =document.getElementsByTagName('button')[0]
const table=document.getElementById('mesa')

let XTime =true 
let XPlayer=[]
let OPlayer=[]

const player1Score=document.getElementsByClassName('player1__score')[0]
const player2Score=document.getElementsByClassName('player2__score')[0]

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
                    XPlayer.push(Number(e.target.id) ) 
                    XTime=false 
                    changeOfturn(XTime)
                    if( playerWin(XPlayer) ) {
                        window.alert( 'x Ganhou!!' )
                        resetar()
                        player2Score.innerText+='I'
                         
                        changeOfturn(XTime)
                        return
                    }
                }
            }else{
                if(e.target.innerText==''){
                    cels[i].innerText='o'
                    cels[i].style.color='blue'
                    OPlayer.push(Number(e.target.id) )
                    XTime=true 
                    changeOfturn(XTime)
                    if( playerWin(OPlayer) ) {
                        window.alert( 'o Ganhou!!' )
                        resetar()
                        player1Score.innerText+='I'
                        
                        changeOfturn(XTime)
                        return 
                    }
                }
            } 
            if( (XPlayer.reduce( (elem,soma)=>elem+soma,0 )+ OPlayer.reduce( (elem,soma)=>elem+soma,0 )) == 45 ){
                window.alert('Empate, reiniciando a partida!')
                draws++
                drawsCounting.innerText=`${draws}`
                resetar()
            }   
        } )
    
}
reset.addEventListener('click',resetar )

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
