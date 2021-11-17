const cels =document.getElementsByTagName('td')
const reset =document.getElementsByTagName('button')[0]
const table=document.getElementById('mesa')

let XTime =true 
let XPlayer=[]
let OPlayer=[]

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
                    XPlayer.push(Number(e.target.id) ) 
                    XTime=false 
                    if( playerWin(XPlayer) ) {
                        window.alert( 'O x Ganhou!!' )
                        resetar()
                        return
                    }
                }
            }else{
                if(e.target.innerText==''){
                    cels[i].innerText='o'
                    OPlayer.push(Number(e.target.id) )
                    XTime=true 
                    if( playerWin(OPlayer) ) {
                        window.alert( 'O o Ganhou!!' )
                        resetar()
                        return 
                    }
                }
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


table.addEventListener('click',(e)=>{
    console.log(e.currentTarget.id )
})



/* Verificando se houve vitória, retorna true ou false */
function playerWin(arr){
    let soma=0
    for(let i=0;i<winArr.length;i++){
        for(let j=0; j<3;j++){
            if(arr.includes( winArr[i][j] ) ) soma++
            console.log(arr)
            console.log(winArr[i][j])
        }

        console.log(soma)
        if(soma==3) return true
        soma=0
    }
   return false
}
