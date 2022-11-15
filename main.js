// yes this is built on wordToShape...

const version = "<span style='font-size: 20px'>Multiline!</span>"

    , canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")
    , center = new Point(canvas.width / 2, canvas.height / 2, "", 0)

    , offset = 90

    , maxes = [
        [5, 20, 100, 5, 15],
        [10, 500, 500, 30, 30],
    ]

var labelOffset = 2
  , max = 0

  , lines = []

  , playing = true
  , line = true
  , label = true


document.querySelector("h1").innerHTML += " " + version

// frame
function dp()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (var lid in lines)
    {
        lines[lid].draw()
    }

    requestAnimationFrame(dp)
}

canvas.addEventListener("click", () => {
    canvas.style.cursor = "default"
    document.getElementById("secretBox").style.scale = "1"
})

document.getElementById("fileInput").addEventListener("change", importSettings, false);

/*
document.getElementById("scale").addEventListener("input", () => {
    file.line.speed = Number(document.getElementById("scale").value)
    document.getElementById("scaleLabel").innerText = `Speed (${document.getElementById("scale").value}): `
})

document.getElementById("scale2").addEventListener("input", () => {
    file.line.length = Number(document.getElementById("scale2").value) + 1
    document.getElementById("scaleLabel2").innerText = `Length (${document.getElementById("scale2").value}): `
})

document.getElementById("scale4").addEventListener("input", () => {
    file.line.dist = Number(document.getElementById("scale4").value)
    document.getElementById("scaleLabel4").innerText = `Distance (${document.getElementById("scale4").value}): `
})

document.getElementById("scale3").addEventListener("input", () => {
    file.line.change = Number(document.getElementById("scale3").value)
    document.getElementById("scaleLabel3").innerText = `Change (${document.getElementById("scale3").value}): `
})

document.getElementById("scale5").addEventListener("input", () => {
    file.line.size = Number(document.getElementById("scale5").value)
    document.getElementById("scaleLabel5").innerText = `Size (${document.getElementById("scale5").value + "n"}): `
})
*/

document.getElementById("pausebtn").addEventListener("click", () => {
    playing = !playing
})

document.getElementById("lbtglbtn").addEventListener("click", () => {
    label = !label
})

document.getElementById("litglbtn").addEventListener("click", () => {
    line = !line
})

document.getElementById("zoom").addEventListener("input", () => {
    document.getElementById("zoomLabel").innerText = `Zoom (${(1/document.getElementById("zoom").value).toFixed(2)}): `

    canvas.width = 500 * document.getElementById("zoom").value
    canvas.height = 500 * document.getElementById("zoom").value

    center.x = canvas.width / 2
    center.y = canvas.height / 2
})


document.getElementById("helpbtn").addEventListener("click", () => {
    console.log("good luck!")
    window.location.href = "https://github.com/undefined06855/Bendy-Multiline/blob/ad72306ba81510949b325ca9f6eac4eaaf8a9b6a/HELP.md"
})



requestAnimationFrame(dp)
