const canvas = document.getElementById("canvas");
const clock = canvas.getContext("2d");
const radians = 2*Math.PI;
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const rolex = ['Rolex'];
const params = {
    "H": window.innerHeight,
    "W": window.innerWidth,
    "x": window.innerWidth/2,
    "y": window.innerHeight/2,
    "fps": 60,
    "radius": {
        
        "Eadge": window.innerHeight*0.78/2,
        "MinOuter": window.innerHeight*0.63/2,
        "MinInner": window.innerHeight*0.45/2,
    },
    "sec": {
        "θ": 360/60,
        "indis": window.innerHeight*0.014,
        "indiL": window.innerHeight*0.021
    },
    "min": {
        "θ": 360/60
    },
    "hr": {
        "θ": 360/12
    }
}
const color = {
    "theColor": "#312424"
}

function draw(sec, min, hr, s, m, h, sign, D, M, Y, W) {
    clock.clearRect(0,0,params.W,params.H);
    
    clock.font = `${params.sec.indiL*1.5}px Arial, sans-serif`;

clock.translate(params.x,params.y);
    //const
    for(let i=0,r=[params.radius.Eadge,params.radius.MinOuter,params.radius.MinInner];i<r.length;i++){
        clock.beginPath();
        clock.strokeStyle = "white";
        clock.lineWidth = 2;
        clock.arc(0,0,r[i],0,radians);
        clock.stroke();
        if(r[i]==params.radius.MinOuter){clock.fillStyle = "white";clock.fill();}
        if(r[i]==params.radius.MinInner){clock.fillStyle = color.theColor;clock.fill();}
    }

    //second
    for(let i=0;i<60;i++,sec+=params.sec.θ){
        clock.beginPath();
        clock.translate(params.radius.Eadge*Math.cos(sec/360*radians),params.radius.Eadge*Math.sin(sec/360*radians));
        clock.strokeStyle = "white";
        clock.lineWidth = i%5?2:4;
        clock.moveTo(0,0);
        let indi = i%5?params.sec.indis:params.sec.indiL;
        clock.lineTo(indi*Math.cos((sec-180)/360*radians),indi*Math.sin((sec-180)/360*radians));
        clock.stroke();
        clock.translate(-params.radius.Eadge*Math.cos(sec/360*radians),-params.radius.Eadge*Math.sin(sec/360*radians));
        clock.save();

        clock.beginPath();
        clock.fillStyle = "white";
        let align = i<10?clock.measureText(`${i}`).width/2:0;
        clock.translate(params.radius.Eadge*Math.cos((sec+1)/360*radians),params.radius.Eadge*Math.sin((sec+1)/360*radians));
        clock.rotate(sec/360*radians);
        clock.fillText(i,-params.sec.indiL*3+align,0);
        clock.restore();
    }

    //minute
    for(let i=0;i<60;i++,min+=params.min.θ){
        clock.save();

        clock.beginPath();
        clock.fillStyle = color.theColor;
        let align = i<10?clock.measureText(`${i}`).width/2:0;
        clock.translate(params.radius.MinOuter*Math.cos((min+2)/360*radians),params.radius.MinOuter*Math.sin((min+2)/360*radians));
        clock.rotate(min/360*radians);
        clock.fillText(i,-params.sec.indiL*3+align,0);
        clock.restore();
    }

    //hour
    clock.font = `${params.sec.indiL*2.2}px Arial, sans-serif`;
    for(let i=0;i<=12;i++,hr+=params.hr.θ){
        clock.save();

        clock.beginPath();
        clock.fillStyle = "white";
        let align = i<10?clock.measureText(`${i}`).width/2:0;
        clock.translate(params.radius.MinInner*Math.cos((hr+3)/360*radians),params.radius.MinInner*Math.sin((hr+3)/360*radians));
        clock.rotate(hr/360*radians);
        clock.fillText(i==0?" ":i,-params.sec.indiL*3+align,0);
        clock.restore();
    }

    
    

    //Half circle
    clock.beginPath();
    clock.fillStyle = color.theColor;
    clock.arc(0,0,params.radius.Eadge-1,(50/360)*radians,(230/360)*radians);
    clock.fill();

    clock.beginPath();
    clock.fillStyle = color.theColor;
    clock.arc(0,0,params.radius.Eadge-1,(130/360)*radians,(310/360)*radians);
    clock.fill();

    //Baseline
    clock.beginPath();
    clock.fillStyle = "red";
    clock.arc(0,0,8,0,radians);
    clock.fill();

    clock.beginPath();
    clock.strokeStyle = "red";
    clock.lineWidth = 1;
    clock.moveTo(0,0);
    clock.lineTo(params.radius.Eadge,0);
    clock.stroke();

    clock.beginPath();
    clock.strokeStyle = "red";
    clock.fillStyle = "red";
    clock.translate(params.radius.Eadge-params.sec.indis,0);
    clock.moveTo(0,0);
    clock.lineTo(params.sec.indis,params.sec.indis*Math.sin(45/360*radians));
    clock.lineTo(params.sec.indis,-params.sec.indis*Math.sin(45/360*radians));
    clock.lineTo(0,0);
    clock.stroke();
    clock.fill();
    clock.translate(-(params.radius.Eadge-params.sec.indis),0);

    // clock.beginPath();
    // clock.strokeStyle = color.theColor;
    // clock.lineWidth = 2;
    // clock.moveTo(0,0);
    // clock.lineTo(0,-params.radius.Eadge);
    // clock.lineTo(0,params.radius.Eadge);
    // clock.stroke();

    //Text
    let buffer = 20;
    clock.translate(-buffer,0);
    clock.font = `${params.sec.indiL*2.6}px Arial, sans-serif`;
    clock.fillStyle = "white";
    let txt = `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")} ${sign}`;
    clock.fillText(txt,-clock.measureText(txt).width,params.sec.indis);
    
    clock.font = `${params.sec.indiL*1.8}px Arial, sans-serif`;
    clock.translate(0,-params.radius.MinInner*2/3);
    clock.fillStyle = "white";
    txt = `${Y} / ${months[M]} / ${D}`;
    clock.fillText(txt,-clock.measureText(txt).width,params.sec.indis);   

    
    clock.translate(0,params.radius.MinInner*4/3);
    clock.fillStyle = "white";
    txt = `${weeks[W]}`;
    clock.fillText(txt,-clock.measureText(txt).width,params.sec.indis);
    clock.translate(0,-params.radius.MinInner*2/3);
    
    clock.translate(buffer,0);
    clock.translate(-params.x,-params.y);

    
}


window.addEventListener("load", ()=>{
    canvas.height = params.H;
    canvas.width = params.W;
    setInterval(()=>{
        let date = new Date();
        let sec = date.getSeconds();
        let ms = date.getMilliseconds();
        let min = date.getMinutes();
        let hr = date.getHours()>12?date.getHours()-12:date.getHours();
        let sign = date.getHours()>=12?"pm":"am";
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let week = date.getDay();
        draw((60-sec-ms/1000)*params.sec.θ, (60-min-(sec>=59?ms/1000:0))*params.min.θ, (12-hr-(min>=59&&sec>=59?ms/1000:0))*params.hr.θ, sec, min, hr, sign, day, month, year, week);
    }, 1000/params.fps);
});

window.addEventListener("resize", ()=>{location.reload();});