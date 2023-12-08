const screen = document.querySelector("#input")
const numbers = document.querySelectorAll(".number")
const operater = document.querySelectorAll(".operation")
const buttons = document.querySelectorAll("button")

let operatorOn = ''; // 연산자 입력
let previousNum = ''; //이전 값
let resentNum = ''; // 최근값

let calculate = (n1, operater, n2) => {
    let result = 0;
    if (operater == '+') {
        result = Number(n1) + Number(n2);
    }
    if (operater == '-') {
        result = Number(n1) - Number(n2);
    }
    if (operater == 'x') {
        result = Number(n1) * Number(n2);
    }
    if (operater == '/') {
        result = Number(n1) / Number(n2);
    }

    return String(result);
};

let calculator = () => {
    let isFirstDigit = true;

    buttons.forEach((item) => {
        item.addEventListener("click", (e) => {
            let action = e.target.classList[0];
            let click = e.target.innerText;

            if (action === "operation") {
                //연산자 눌렀을 때
                operatorOn = click;
                previousNum = screen.textContent;
                screen.textContent = "";
                isFirstDigit = true;
                // 연산자를 누르면 다음 숫자는 첫 번째 숫자가 됨
            }
            if (action === "number") {
                if (isFirstDigit && click === '0') {
                    // 첫 번째 숫자이고 입력된 값이 0인 경우 아무 작업도 수행하지 않음
                    return;
                }

                if (screen.textContent === '' && operatorOn === '') {
                    //창이비어있고 연산자 누르지 않았을때(한자리)
                    screen.textContent = click;
                    previousNum = screen.textContent;
                } else if (
                    //창이비어지 않고 연산자 누르지 않았을때(한자리이상)
                    screen.textContent !== '' &&
                    operatorOn === ''
                ) {
                    screen.textContent =
                        screen.textContent + click;
                    previousNum = screen.textContent;
                } else if (
                    //창이비어있고 연산자 눌렀을때(한자리)
                    screen.textContent === '' &&
                    operatorOn !== ''
                ) {
                    screen.textContent = click;
                    resentNum = screen.textContent;
                } else if (
                    //창이비어있지않고 연산자 누르지 않았을때 (한자리이상)
                    screen.textContent !== '' &&
                    operatorOn !== ''
                ) {
                    screen.textContent =
                        screen.textContent + click;
                    resentNum = screen.textContent;
                }
                isFirstDigit = false;
                // 첫 번째 숫자 입력 후에는 첫 번째 숫자가 아님을 표시
            }

            if (action === "result") {
                // = 눌렀을 때 calculate함수 실행
                screen.textContent = calculate(
                    previousNum,
                    operatorOn,
                    resentNum
                );
                isFirstDigit = true;
                // 결과를 표시한 후에는 다음 숫자는 첫 번째 숫자가 됨
            }
            if (action === "clear") {
                //C 버튼 눌렀을 때 모든 할당 초기화
                screen.textContent = '';
                previousNum = '';
                operatorOn = '';
                resentNum = '';
                isFirstDigit = true;
                // 모든 할당 초기화 후에는 다음 숫자는 첫 번째 숫자가 됨
            }
        });
    });
}
calculator();