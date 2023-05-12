const buttonStart = document.querySelector('.game__button');
const buttonStop = document.querySelector('.game__button--stop')
const createFild = document.querySelector('.game__createFild');
const timer = document.querySelector('.game__timer');
    //create 필드 초기화
function createReset(){
    while(createFild.firstChild){
        createFild.removeChild(createFild.firstChild)
    }
}
    // 시간 카운트 다운
    let time = 30;
    var isStop = false;
    timer.innerHTML = `00:${time}`
    function timeout (){
        let time = 30;
        var interval = setInterval(()=>{
            if (!isStop){
                if (time==0){
                    gameEnd('lose')
                    return
                }
                time--;
                timer.innerHTML = `00:${time}`
            }
            else {
                clearInterval(interval)
            }
        },1000)
    }
// game start
function gameStart() {
    buttonStop.style.opacity = '1'
    buttonStart.classList.remove('active');
    buttonStop.classList.add('active');

    createReset()
    // 랜덤으로 10개 monster,carrot 만들기
    function createitem(itemClassName) {
        for (let i = 0; i < 10; i++){
        const item = document.createElement('button');
        
        item.classList.add(itemClassName)
        createFild.appendChild(item);
        item.style.top = `${Math.random() * 150}px`
        item.style.left = `${Math.random() * 650}px`
        }
    }
    createitem('game__button--carrot')
    createitem('game__button--monster')
    timeout()
    isStop = false;
}
buttonStart.addEventListener('click',()=>{
    gameStart()
})
// carrot 삭제 or bug click game alert
const itemCount  = document.querySelector('.game__item__countbox');

createFild.addEventListener('click',(e)=>{
    if (e.target.className==='game__button--monster'){
        gameEnd('lose')
        
    }
    else if(e.target.className==='game__button--carrot'){
        createFild.removeChild(e.target)
        let countInnertext = itemCount.innerHTML;
        itemCount.innerHTML = +countInnertext+1
        if (itemCount.innerHTML === '10'){
            gameEnd('win')
        }
        
        
    }
    else {return}
    

    // Game End
})
const gameResult = document.querySelector('.game__result')
const gameResultDesc = document.querySelector('.game__result__desc')
const game = document.querySelector('.game')
function gameEnd (winorlose){
    isStop = true;
    gameResult.classList.add('active')
    if (winorlose === 'win') {
        gameResultDesc.innerHTML = 'YOU WON'
    }
    else if (winorlose === 'lose'){
        gameResultDesc.innerHTML = 'YOU LOSE'
    }
    else {
        gameResultDesc.innerHTML = 'RETIRE'
    }
    createFild.classList.add('not');
}


const resetButton = document.querySelector('.game__button__reset');
resetButton.addEventListener('click',()=>{
    gameResult.classList.remove('active')
    createFild.classList.remove('not')
    time = 30;
    timer.innerHTML = `00:${time}`
    itemCount.innerHTML = 0;
    gameStart()
})

// stop 버튼 누르면 멈춤
buttonStop.addEventListener('click',()=>{
    buttonStop.style.opacity = '0'
    gameEnd('retire')
})
