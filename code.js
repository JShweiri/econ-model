'use strict'
let canvas = document.getElementById('graph');
canvas.width = 1000;
canvas.height = 500;
let ctx = canvas.getContext('2d');

// The Population Values for species A and species B
let a = [];
let b = [];

//The change in time between points
let timeStep = 0.001;

// The time of the last calculated point
let finalTime = 50;

//initial population sizes
a[0] = 0.9;
b[0] = 1;

//growth rate and death rate for prey
let alpha = 0.3;
let beta = 0.9;

//growth rate and death rate for predator
let sigma = .3;
let gamma = 0.2;

let row = 0.6;

//Largest values to be expected
let MAX_DISTANCES = {
    x: finalTime,
    y: 10
}

//Function to return point object
function point(xPos, yPos, pointColor = 'black') {
    return {
        x: xPos,
        y: yPos,
        color: pointColor
    };
}

//Draws point on the canvas
function drawPoint(point) {
    let xScale = canvas.width / MAX_DISTANCES.x;
    let yScale = canvas.height / MAX_DISTANCES.y;

    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x * xScale, point.y * yScale, 1, 0, 2 * Math.PI);
    ctx.fill();

}

function drawGrid() {

    let xScale = canvas.width / MAX_DISTANCES.x;
    let yScale = canvas.height / MAX_DISTANCES.y;


    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 0.5;

    for (let i = 1; i < MAX_DISTANCES.x; i++) {
        ctx.beginPath();
        ctx.moveTo(xScale * i, 0);
        ctx.lineTo(xScale * i, canvas.height);
        ctx.stroke();
    }

    for (let j = 1; j < MAX_DISTANCES.y; j++) {
        ctx.beginPath();
        ctx.moveTo(0, yScale * j);
        ctx.lineTo(canvas.width, yScale * j);
        ctx.stroke();
    }
}


function drawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    let i = 1;
    for (let t = 0; t < finalTime; t += timeStep) {

        // Calculates Values
        //population at time t = last calculated population + (rate of change of population) * change in time
        a[i] = a[i - 1] + (1 / (sigma) - (alpha + beta) - b[i - 1] / sigma) * a[i - 1] * timeStep;
        b[i] = b[i - 1] + (row * a[i - 1] - (alpha + gamma)) * b[i - 1] * timeStep;


        // MAX_DISTANCES.y - because higher values are lower on the canvas
        drawPoint({
            x: t,
            y: MAX_DISTANCES.y - a[i],
            color: '#0000FF80'
        });
        drawPoint({
            x: t,
            y: MAX_DISTANCES.y - b[i],
            color: '#FF000080'
        });
        i++;
    }
};
drawing();

//Writes new values of variables from forms
function submitted() {

    a = [];
    b = [];
    a[0] = parseFloat(document.getElementById('Prey').value, 10);

    b[0] = parseFloat(document.getElementById('Predator').value, 10);

    alpha = parseFloat(document.getElementById('Alpha').value, 10);

    beta = parseFloat(document.getElementById('Beta').value, 10);

    sigma = parseFloat(document.getElementById('Sigma').value, 10);

    gamma = parseFloat(document.getElementById('Gamma').value, 10);

    row = parseFloat(document.getElementById('Row').value, 10);

    timeStep = parseFloat(document.getElementById('TimeStep').value, 10);

    finalTime = parseFloat(document.getElementById('FinalTime').value, 10);

    MAX_DISTANCES = {
        x: finalTime,
        y: 10
    }

    drawing();
};