window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const list = document.querySelector('#list')
    const inputSearch = document.querySelector('#input-search')
    let counter = document.querySelector('#num')
    let arrayOfLinks = []
    let selectedArrayOfLinks = []

    findLinks(body)

    inputSearch.oninput = function () {
        selectedArrayOfLinks = []
        let value = this.value.toLowerCase().trim()
        let regExp1 = new RegExp(value, 'ig');
        if (value !== '') {
            arrayOfLinks.forEach(node => {
                if ((regExp1).test(node.textContent)) {
                    selectedArrayOfLinks.push(node)
                }
            })
            counter.textContent = selectedArrayOfLinks.length.toString()
            list.innerHTML = ""
            selectedArrayOfLinks.forEach(node => {
                let regExp2 = new RegExp('(?<=>)(.*?)(?=<)', 'ig');
                let strForReplace = node.outerHTML.replace(/\s{2,}|[\r\n]/g, '').match(regExp2)
                let newStr = strForReplace.join().replace(regExp1, '<span style="background: yellow">' + value + '</span>')
                list.innerHTML += node.outerHTML.replace(regExp2, newStr)
            })
        } else {
            list.innerHTML = ""
            counter.textContent = ''
        }
    }

    function findLinks(element) {
        element.childNodes.forEach(node => {
            if (node.nodeName.match(/^A/) && (node.textContent !== '')) {
                arrayOfLinks.push(node)
            } else {
                findLinks(node)
            }
        })
    }
})
