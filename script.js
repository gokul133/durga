const canvas = document.querySelector("canvas"),
buttons = document.querySelectorAll(".current_shape"),
clear = document.querySelector(".clear");
save = document.querySelector(".save");
ctx = canvas.getContext("2d");

let isDrawing = false,SelectedTool,prevX,prevY,shp;


function mouseEvent(event) {
    var bounds = canvas.getBoundingClientRect();
    prevX = event.pageX - bounds.left - scrollX;
    prevY = event.pageY - bounds.top - scrollY;

    prevX /= bounds.width; 
    prevY /= bounds.height; 


    prevX *= canvas.width;
    prevY *= canvas.height;
}


canvas.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.heigth = canvas.offsetHeight;
});

const drawSquare = (e) => {
    ctx.strokeRect(prevX,prevY,100,100);
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX, prevY+20, 5, 0, 2 * Math.PI);
    ctx.arc(prevX, prevY+40, 5, 0, 2 * Math.PI);
    ctx.arc(prevX, prevY+60, 5, 0, 2 * Math.PI);
    ctx.arc(prevX, prevY+80, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX+100, prevY+33, 5, 0, 2 * Math.PI);
    ctx.arc(prevX+100, prevY+66, 5, 0, 2 * Math.PI);
    ctx.fill();
}

const drawRect = (e) => {
    ctx.strokeRect(prevX,prevY,100,50);
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX, prevY+12.5, 5, 0, 2 * Math.PI);
    ctx.arc(prevX, prevY+37.5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX+100, prevY+25, 5, 0, 2 * Math.PI);
    ctx.fill();
}

const drawLine = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(e.offsetX,e.offsetY);
    // if(prevX > e.offsetX){
    //     ctx.moveTo(e.offsetX,e.offsetY);
    //     ctx.lineTo(e.offsetX+10,e.offsetY+10);
    //     ctx.moveTo(e.offsetX,e.offsetY);
    //     ctx.lineTo(e.offsetX+10,e.offsetY-10);
    // }
    // else{
    //     ctx.beginPath();
    //     ctx.moveTo(e.offsetX,e.offsetY);
    //     ctx.lineTo(e.offsetX - arrowSize, e.offsetY - arrowSize);
    //     ctx.lineTo(e.offsetX - arrowSize, e.offsetY + arrowSize);
    //     ctx.closePath();
    //     ctx.fill();
    //     // ctx.moveTo(e.offsetX,e.offsetY);
    //     // ctx.lineTo(e.offsetX-10,e.offsetY+10);
    //     // ctx.moveTo(e.offsetX,e.offsetY);
    //     // ctx.lineTo(e.offsetX-10,e.offsetY-10);
    // }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(prevX-100,prevY-100);
    ctx.lineTo(prevX-100,prevY+100);
    ctx.closePath();
    ctx.stroke();

    xcord = prevX-100;

    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(xcord, prevY-66, 5, 0, 2 * Math.PI);
    ctx.arc(xcord, prevY-33, 5, 0, 2 * Math.PI);
    ctx.arc(xcord, prevY+66, 5, 0, 2 * Math.PI);
    ctx.arc(xcord, prevY+33, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX, prevY, 5, 0, 2 * Math.PI);
    ctx.fill();
    
}

const drawCircle = (e) => {
    ctx.arc(prevX, prevY, 50, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX-50, prevY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(prevX+50, prevY, 5, 0, 2 * Math.PI);
    ctx.fill();

}

const StartDraw = (e) => {
    console.log(e.offsetX);
    console.log(e.offsetY);
    isDrawing=true;
    // prevX = e.offsetX;
    // prevY = e.offsetY;
    mouseEvent(e);
    ctx.beginPath();
    if(SelectedTool === "square"){
        drawSquare(e);
    }
    else if(SelectedTool === "rectangle"){
        drawRect(e);
    }
    else if(SelectedTool === "triangle"){
        drawTriangle(e);
    }
    else if(SelectedTool === "circle"){
        drawCircle(e);
    }
    shp = ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawing = (e) => {
    if(!isDrawing)
        return;
    ctx.putImageData(shp,0,0);
    if(SelectedTool === "line"){
        drawLine(e);
    }
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".available_shapes .active").classList.remove("active");
        button.classList.add("active");
        SelectedTool=button.id;
        console.log(SelectedTool);        
    });
});

clear.addEventListener("click", () => {
    ctx.clearRect(0,0,1200,650);
});

save.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});

canvas.addEventListener("mousedown",StartDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup", () =>isDrawing=false);