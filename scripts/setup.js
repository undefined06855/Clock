const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

for (const element of document.getElementsByClassName("segment"))
{
    const chars = element.innerText.split("")
    element.innerText = ""
    for (const char of chars)
    {
        const charWrapper = document.createElement("span")
        charWrapper.innerText = char
        charWrapper.classList.add("letter")
        element.appendChild(charWrapper)
    }
}

for (const element of document.getElementsByClassName("filler"))
{
    element.innerText = alphabet[Math.floor(Math.random() * alphabet.length)]
}

