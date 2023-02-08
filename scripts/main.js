// "IT IS_FIVETENFIFTEENTWENTY-FIVE_MINUTESHALF_PASTTO_ONETWOTHREEFOURFIVESIXSEVENEIGHTNINETENELEVENTWELVE_PMAM."
// length: 108
// width: 9

var d = new Date()
var t = [] // display time

// debug
const DEBUG = false
const hour = 5
const minute = 0

if (DEBUG)
{
    d.getHours = () => {return hour}
    d.getMinutes = () => {return minute}
    d.getSeconds = () => {return 0}
    console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
}


// https://stackoverflow.com/a/19277804
function findNearest(input)
{
    return [0, 5, 10, 15, 20, 25].reduce(function(prev, curr) {
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

if (findNearest(d.getMinutes()) == 0) t = ["", convertTo12Hour(d.getHours())[0], convertTo12Hour(d.getHours())[1]]
else if (d.getMinutes() < 30) t = [findNearest(d.getMinutes()), "minutes", "past", convertTo12Hour(d.getHours())[0], convertTo12Hour(d.getHours())[1]]
else if (d.getMinutes() > 30) t = [findNearest(60 - d.getMinutes()), "minutes", "to", d.getHours == 23 ? "midnight" : convertTo12Hour(d.getHours() + 1)[0], convertTo12Hour(d.getHours() + 1)[1]]
else t = ["half", "past", convertTo12Hour(d.getHours())]

console.log(t)

for (var i = 0; i < t.length; i++)
{
    var segment = t[i]

    if (i == 0 && typeof segment == "number") {segment = "number_begin_" + segment}
    if (i == t.length - 2 && typeof segment == "number") {segment = "number_end_" + segment}

    for (const element of document.getElementsByClassName("segment"))
    {
        if (element.getAttribute("data-segment") == segment)
        {
            element.classList.add("on")
            element.classList.remove("off")
        }
    }
}
