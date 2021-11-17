const puppeteer = require('puppeteer')
const codeObj = require('./codes')

let email = "xoyidip373@incoware.com";
let pass = "pepcoding"
//launch browser
let loginlink = "https://www.hackerrank.com/auth/login";


//IIFI -> use ; in the end for line above it

(async function () {
    try {
        const browserOpenInstance = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })
        let newTab = await browserOpenInstance.newPage();
        await newTab.goto(loginlink)
        await newTab.type("input[id='input-1']", email, { delay: 20 })
        await newTab.type("input[id='input-2']", pass, { delay: 20 })
        await newTab.click("button[type='submit']")
        await waitAndClick('a[data-attr1="algorithms"]', newTab)
        await waitAndClick('input[value="warmup"]', newTab)
        let allChallenges = await newTab.$$('div.challenge-submit-btn', { delay: 50 });
        console.log("No of Questions - ", allChallenges.length)
        await questionsolver(newTab, allChallenges[0], codeObj.answers[0]);



    } catch (error) {
        console.log(error)
    }
})()



async function waitAndClick(selector, cPage) {
    await cPage.waitForSelector(selector)

    let selectorClicked = cPage.click(selector)
    return selectorClicked
}

async function questionsolver(page, question, answer) {
    await question.click()
    await waitAndClick(".monaco-editor.no-user-select.vs", page) //editor clicked
    await waitAndClick('input[type="checkbox"]', page);
    await waitAndClick('textarea.custominput', page)
    await page.type('textarea.custominput', answer, { delay: 5 })
    await page.keyboard.down('Control')
    await page.keyboard.press('A', { delay: 50 })
    await page.keyboard.press('X', { delay: 50 })
    await page.keyboard.up('Control')
    await waitAndClick(".monaco-editor.no-user-select.vs", page)
    await page.keyboard.down('Control')
    await page.keyboard.press('A',{delay:50})
    await page.keyboard.press('V',{delay:50})
    await page.keyboard.up('Control')
    await waitAndClick(".hr-monaco__run-code",page,{delay:20})
}