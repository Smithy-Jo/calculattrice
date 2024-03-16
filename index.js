let memory_one = "";
let memory_two = "";
let operation = '';
let result = 0

const numbers_btn = document.querySelectorAll('.number');
const operation_elem = document.querySelectorAll('.operation')

function update(res = '') {
    if (res === '') screen_result.textContent = memory_two + operation + memory_one;
    else screen_result.textContent = res
}

function clear() {
    memory_one = "";
    memory_two = "";
    operation = ''
    result = 0;
}

numbers_btn.forEach((num) => {
    num.addEventListener('click', () => {
        memory_one += num.textContent;
        update()
    })
});

btn_clear.addEventListener('click', ()=>{
    clear()
    update('0')
})

operation_elem.forEach((op_elem) => {
    op_elem.addEventListener('click', () => {
        operation = op_elem.textContent;
        memory_two = memory_one;
        memory_one = '';
        update(memory_two + ' ' + operation)
    })
})

btn_equal.addEventListener('click', () => {
    switch (operation) {
        case '+':
            result = Number(memory_two) + Number(memory_one);
            break;

        case '-':
            result = Number(memory_two) - Number(memory_one);
            break;

        case 'x':
            result = Number(memory_two) * Number(memory_one);
            break;

        case '÷':
            if (memory_one === '0'){
                result = 'ERROR'
                break;
            }
            result = Number(memory_two) / Number(memory_one);
            break;
    }

    update(result)
    
    memory_one = "";
    operation = ''
    result = 0;
})
