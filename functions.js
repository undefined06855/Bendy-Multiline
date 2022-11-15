function convertTo360( value, from, to ) { return ( value - from ) * 360 / ( to - from ) }

function downloadFile(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

/*
theres bugs with this so its easier
if i just disable it and make my friends
think that its impossible because
of technical limitations :)

function exportSettings()
{
    filename = document.getElementById("filenameInput").value.replace(".bline", "") + ".bline"

    //https://stackoverflow.com/a/30832210
    var file2 = JSON.stringify(file)
    var f = new Blob([file2], {type: "text/json"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(f, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(f)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(function() {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }
    console.log(file)
}
*/

function importSettings(importer)
{
    var f = importer.target.files[0]
    if (!f) return
    var reader = new FileReader()
    reader.onload = e => {
        nf = JSON.parse(e.target.result)

        lines.push(new Line(
            nf.line.speed,
            nf.line.length,
            nf.line.change,
            nf.line.dist,
            nf.line.size,
            nf.line.frame,
            nf.line.playing
        ))
    }
    reader.readAsText(f)
}

// classes

class Line {
    constructor(speed, length, change, dist, size, frame, playing)
    {
        this.line = {}

        this.line.speed = speed
        this.line.length = length
        this.line.change = change
        this.line.dist = dist
        this.line.size = size
        this.line.frame = frame
        this.line.playing = playing

        console.log(this.line)
    }
    draw()
    {
        var speed = this.line.speed
          , length = this.line.length
          , change = this.line.change
          , dist = this.line.dist
          , size = this.line.size

          , pl = []
        for (var i = 0; i < length; i++)
        {
            const p = new Point(0, i*dist, "point "+i, i*size)
            
            if (playing)
                var rot = Math.sin(Date.now() * (speed/300)) * (i*change*10)
            else
                var rot = Math.sin(file.line.frame * (speed/300)) * (i*change*10)
            const n = p.rotate(rot)
            
            
            ctx.fillStyle = `hsl(${convertTo360(n.y, -canvas.height, canvas.height)}deg, 50%, 50%)`

            if (pl.length == 0) n.draw()
            else                n.draw(pl[pl.length - 1])

            pl.push(n)
        }
    }
}

class Point {
    constructor(x, y, label = "N/A", r = 2)
    {
        this.radius = r
        this.x = x
        this.y = y
        this.l = label
    }

    draw(drawTo = center)
    {
        const nx = this.x + center.x
            , ny = this.y + center.y

            , dtx = (drawTo !== center ? drawTo.x + center.x : drawTo.x)
            , dty = (drawTo !== center ? drawTo.y + center.y : drawTo.y)

        ctx.beginPath();
        if (label)
        {
            ctx.font = "12px monospace"
            ctx.fillText(this.l, nx+this.radius+labelOffset, ny-this.radius+labelOffset)
        }

        if ( !(
                nx < 0-this.radius ||
                nx > canvas.width + this.radius ||
                nx < 0-this.radius ||
                nx > canvas.height + this.radius
            )
        ) {
            ctx.arc(nx, ny, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();    
        }

        if (line)
        {
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(dtx, dty)
            ctx.stroke()
        }

    }

    rotate(angle)
    {
        const rad = angle * (Math.PI / 180)
        //console.log(`Rotating with angle ${angle}deg and ${rad}rad`)

        return new Point (
            ( this.x * Math.cos(rad) ) - ( this.y * Math.sin(rad) ),
            ( this.x * Math.sin(rad) ) + ( this.y * Math.cos(rad) ),
            this.l,
            this.radius
        )
    }
}

