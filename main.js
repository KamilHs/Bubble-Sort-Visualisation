let canvas;
let ctx;



let speed = 10;

let ELEMENTS_COUNT = 100;
let WIDTH;

let elements;
let currentElement = -1;
let currentCompared = -1;



function renderDom() {
    document.body.innerHTML += `
    <div class="settings">
    <form action="#">
        <div class="form-group">
            <label for="count">Number of Elements</label>
            <input type="range" class="form-control-range" name="count" value="100" id="count" min="2" max="1000">
        </div>
        <div class="form-group">
            <label for="speed">Enter speed of sorting</label>
            <input type="range" class="form-control-range" name="speed" value="50" id="speed" min="1" max="100">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>`;

    document.body.querySelector('button').addEventListener('click', function (e) {
        e.preventDefault();

        speed = +document.querySelector('#speed').getAttribute('max') - +document.querySelector('#speed').value;
        ELEMENTS_COUNT = +document.querySelector('#count').value;

        document.body.removeChild(document.body.lastElementChild);

        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');

        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        document.body.appendChild(canvas)

        WIDTH = canvas.width / ELEMENTS_COUNT;


        elements = generate();
        clear();
        sort();
    })
}


function generate() {
    const array = [];

    for (let i = 0; i < ELEMENTS_COUNT; i++)
        array.push(Math.floor(Math.random() * (canvas.height - 1) + 1));
    return array;
}

function draw() {
    clear();
    elements.forEach((e, i) => {
        ctx.beginPath();
        ctx.fillStyle = "white";
        if (currentElement != -1 && i == currentElement)
            ctx.fillStyle = "red";
        if (currentCompared != -1 && i == currentCompared)
            ctx.fillStyle = "green";


        ctx.fillRect(i * WIDTH, canvas.height, WIDTH, -e);
        ctx.closePath();
    })
}

async function sort() {
    for (let i = 0; i < elements.length; i++) {
        currentElement = i;
        for (let j = i; j < elements.length; j++) {
            currentCompared = j;
            if (elements[i] > elements[j]) {
                await sleep(speed);
                let temp = elements[i];
                elements[i] = elements[j];
                elements[j] = temp;
                draw();
            }
        }
    }
    currentCompared = -1;
    currentElement = -1;
    draw();
}

function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


renderDom();
