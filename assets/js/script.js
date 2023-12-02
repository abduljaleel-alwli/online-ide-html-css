// Start import elements
const textArea = document.getElementById('textArea')

// const app2 = document.getElementById('app')

const editor = document.getElementById('editor')
const result = document.getElementById('result')
const runBtn = document.getElementById('runBtn')
const save =document.getElementById('save')
const auto_run = document.getElementById('auto-run')
const auto_save = document.getElementById('auto-save')
const font_size = document.getElementById('font-size')
const wrap = document.getElementById('wrap')
const font_count = document.getElementById('font-count')
const full_screen_editor = document.getElementById('full-secreen-editor')

const menue = document.getElementById('menue')
const show_Menue = document.getElementById('show-menue')
const close_Menue = document.getElementById('close-menue')

//---- Demo Code
const viewResult = () => {
    result.innerHTML = editor.value
}

//---- Save Code in Localstorage
const saveCode = () => {
    localStorage.setItem('myCode', editor.value)
}

//---- Save Code in LocalStorage
save.onclick = () => {
    saveCode()
}

const default_values = () => {
    // Default value of ( Font Size Editor )
    if (!localStorage.getItem('font-size-editor')) {
        font_size.value = 18
        font_count.innerText = 18
    }else{
        const font_size = localStorage.getItem('font-size-editor')
        editor.style.fontSize = `${font_size}px`
        font_size.value = `${font_size}`
    }
    
    // Default value of ( Full Screen Editor )
    if (!localStorage.getItem('full-screen-editor')) {
        localStorage.setItem('full-screen-editor', true)
        full_screen_editor.checked = true
    }

    // Default value of ( Wrap )
    if (!localStorage.getItem('wrap')) {
        localStorage.setItem('wrap', true)
        wrap.checked = true
    }

    // Default value of ( Code )
    if (!localStorage.getItem('myCode')) {
        const code = `
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        .welcome{
                            margin: 10px 0;
                            color: #f4ebf6;
                        }
                        span{
                            color: red;
                        }
                    </style>
                </head>
                <body>
                    <h1 class="welcome">Hello Wrold<span>!</span></h1> 
                </body>
            </html>
        `
        localStorage.setItem('myCode', code)
        editor.value = localStorage.getItem('myCode')
    }
    editor.value = localStorage.getItem('myCode')
}

//---- Get code from LocalStorage and write in Editor
window.onload = () => {
    default_values()
    Screen_Editor()
    checkWrap()
}


//---- Result Button
runBtn.onclick = () => {
    viewResult()
    runBtn.classList.toggle('running')
    result.classList.toggle('viewed')
    editor.classList.toggle('hiden')
    if (result.className == '') {
        runBtn.style.background = '#551a8b'
        runBtn.innerText = 'Run'
    }else{
        runBtn.style.background = '#607d8b'
        runBtn.innerText = 'Edit'
    }
}

// -- Checker Status box and Apply The Condition
const checker = (box, key) => {
    if (localStorage.getItem(key) == 'true') {
        box.checked = true
    }else{
        box.checked = false
    }
}

//---- Auto Save
checker(auto_save, 'auto-save')
auto_save.addEventListener('change', () => {
    if (auto_save.checked == true) {
        localStorage.setItem('auto-save', true)
    }else if(auto_save.checked == false){
        localStorage.setItem('auto-save', false)
    }
})

//---- Auto Run
checker(auto_run, 'auto-run')
auto_run.addEventListener('change', () => {
    if (auto_run.checked == true) {
        localStorage.setItem('auto-run', true)
    }else{
        localStorage.setItem('auto-run', false)
    }
})


//---- Font Size
font_count.innerText = localStorage.getItem('font-size-editor')
font_size.oninput =  () => {
    editor.style.fontSize = `${font_size.value}px`
    localStorage.setItem('font-size-editor', font_size.value)
    font_count.innerText = localStorage.getItem('font-size-editor')
}


//---- When you start writing, do the following
editor.onkeyup = () => {
    if (localStorage.getItem('auto-save') == 'true') {
        saveCode()
    }else{
        console.log('Not Activated Auto Save');
    }
    if (localStorage.getItem('auto-run') == 'true') {
        viewResult()
    }else{
        console.log('Not Activated Auto Run');
    }
}


//---- Word Wrap
// Check wrap is activated or not
const checkWrap = () => {
    const wrap_value = localStorage.getItem('wrap')
    const full_secreen_value = localStorage.getItem('full-screen-editor')
    if(wrap_value == 'true' && full_secreen_value == 'true'){
        editor.style = 'width: 100%; text-wrap: wrap;'
    }else if(wrap_value == 'false' && full_secreen_value == 'false'){
        editor.style = 'width: 50%; text-wrap: nowrap;'
    }else if(wrap_value == 'false' && full_secreen_value == 'true'){
        editor.style = 'width: 100%; text-wrap: nowrap;'
    }else if(wrap_value == 'true' && full_secreen_value == 'false'){
        editor.style = 'width: 50%; text-wrap: wrap;'
    }

    editor.style.fontSize = `${localStorage.getItem('font-size-editor')}px`
}
checker(wrap, 'wrap')
wrap.addEventListener('change', () => {
    localStorage.setItem('wrap', wrap.checked)
    checkWrap()
})

//---- Full Screen 
const Screen_Editor = () => {
    const full_secreen_value = localStorage.getItem('full-screen-editor')
    if (full_secreen_value == 'true') {
        editor.style = 'width: 100%'
        result.style = 'width: 0%'
    }
    if(full_secreen_value == 'false'){
        editor.style = 'width: 50%'
        result.style = 'width: 50%'
    }
}
checker(full_screen_editor, 'full-screen-editor')
full_screen_editor.addEventListener('change', () => {
    localStorage.setItem('full-screen-editor', full_screen_editor.checked)
    Screen_Editor()
    checkWrap()
})


//---- Menue

show_Menue.addEventListener('click', () => {
    menue.style = `right: -5px`
})
close_Menue.addEventListener('click', () => {
    menue.style = `right: -440px`
})

// body.onclick = () => {
//     if (menue.style.right == '-5px') {
//         menue.style.right = '-440px'
//     }
// }