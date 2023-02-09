var d = new Date()
var t = [] // display time

// debug
const DEBUG = new URL(document.location).searchParams.get("debug")
var hour = 22
var minute = 58

if (DEBUG === "")
{
    d.getHours = () => {return hour}
    d.getMinutes = () => {return minute}
    console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
}


// https://stackoverflow.com/a/19277804
function findNearest(input)
{
    return [5, 10, 15, 20, 25].reduce(function(prev, curr) {
        return (Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev);
    })
}

function convertTo12Hour(hour)
{
    if (hour == 0) return [12, "am"]
    if (hour == 12) return [12, "pm"]
    if (hour < 12) return [hour, "am"]
    if (hour > 12) return [hour - 12, "pm"]
    throw("Error when converting to 12 hour formet: ", hour, " is not valid!")
}

function update()
{
    d = new Date()

    if (d.getMinutes() >= 58) t = ["", convertTo12Hour(d.getHours() + 1)[0], convertTo12Hour(d.getHours() + 1)[1]]
    else if (d.getMinutes() <= 2) t = ["", convertTo12Hour(d.getHours())[0], convertTo12Hour(d.getHours())[1]]
    else if (d.getMinutes() <= 28) t = [findNearest(d.getMinutes()), "minutes", "past", convertTo12Hour(d.getHours())[0], convertTo12Hour(d.getHours())[1]]
    else if (d.getMinutes() >= 32) t = [findNearest(60 - d.getMinutes()), "minutes", "to", d.getHours == 23 ? "midnight" : convertTo12Hour(d.getHours() + 1)[0], convertTo12Hour(d.getHours() + 1)[1]]
    else                           t = ["half", "past", convertTo12Hour(d.getHours())]

    // format t
    for (var i = 0; i < t.length; i++)
    {        
        var segment = t[i]
        if (i == 0 && typeof segment == "number") {segment = "number_begin_" + segment}
        if (i == t.length - 2 && typeof segment == "number") {segment = "number_end_" + segment}
    }

    for (const element of document.getElementsByClassName("segment"))
    {
        if (t.includes(element.getAttribute("data-segment")) || (t.includes("number_begin_25") && element.getAttribute("data-segment") == "number_begin_20"))
        {
            element.classList.add("on")
            element.classList.remove("off")
        }
        else
        {
            element.classList.add("off")
            element.classList.remove("on")
        }
    }
    
    for (const element of document.getElementsByClassName("alwayson"))
    {
        element.classList.add("on")
        element.classList.remove("off")
    }
    
    if (d.getSeconds() % 2 == 0)
    {
        document.getElementById("second_indicator").classList.add("on")
        document.getElementById("second_indicator").classList.remove("off")
    }
    else
    {
        document.getElementById("second_indicator").classList.add("off")
        document.getElementById("second_indicator").classList.remove("on")
    }

    requestAnimationFrame(update)
}

requestAnimationFrame(update)
