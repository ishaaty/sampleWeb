let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let currentColor = document.querySelector("#currentColor");
let clearBtn = document.querySelector("#clear");
let color = "black";
let pixelsList = [];
let selectedArray = [];

class Pixel {
    xCoordinate;
    yCoordinate;
    color;

    constructor (xCoordinate, yCoordinate, color){
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.color = color || "black";
    }

    changeColor(color){
        this.color = color;
    }

    fill(x = 0, y  = 0, color){
        ctx.beginPath();
        ctx.fillStyle = color || this.color;
        ctx.arc(x, y, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
            }

            makeOrColorGrid(xMin, yMin, xMax, yMax, inc, color) {
                // making vertical lines
                for (let xUpdate = xMin; xUpdate < xMax; xUpdate += inc){
                    for (let yUpdate = yMin; yUpdate < yMax; yUpdate++){
                        if (!color){0
                            this.fill(xUpdate, yUpdate);
                        } else {
                            this.fill(xUpdate, yUpdate, color);
                        }
                    }
                }

                // making horizontal lines
                for (let yUpdate = yMin; yUpdate < yMax; yUpdate += inc){ 
                    for (let xUpdate = xMin; xUpdate < xMax; xUpdate++){
                        if (!color){
                            this.fill(xUpdate, yUpdate);
                        } else {
                            this.fill(xUpdate, yUpdate, color);
                        }
                    }
                }
            }   
        }

        for(let x = 0; x <= 800; x += 40){
            for (let y = 0; y <= 800; y += 40){
                let p = new Pixel(x, y, "black");
                selectedArray.push(p);
            }
        }

        for(let x = 0; x <= canvas.height; x += 40){
            for (let y = 0; y <= canvas.width; y += 40){
                let pixel = new Pixel(x, y, color);
                pixelsList.push(pixel);
            }
        }


        window.addEventListener("load", function () {
            // creating the grid
            let pixelGrid = pixelsList[0]; // contains coordinates (0,0)
            pixelGrid.changeColor("black");
            pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);
        });

        // changing color
        document.querySelectorAll(".colorBtn").forEach(function(elm){
            elm.addEventListener("click", function (event){
                let clickedColor = event.currentTarget;
                currentColor.textContent = (`Current Color: ${clickedColor.textContent}`);
                for (const p of selectedArray){
                    p.changeColor(clickedColor.dataset.key);
                }
            })
        });

        function colorPixel(event){
            for (const p of selectedArray){
                if ((event.offsetX <= p.xCoordinate && event.offsetX >= p.xCoordinate - 40) && (event.offsetY <= p.yCoordinate && event.offsetY >= p.yCoordinate - 40)){
                        console.log(`${p.color}: (${p.xCoordinate}, ${p.yCoordinate})`);
                        p.makeOrColorGrid(p.xCoordinate - 38, p.yCoordinate - 38, p.xCoordinate - 1, p.yCoordinate - 1, 1);
                }
            }
        }

        // coloring in a pixel when user clicks/drags
        canvas.addEventListener("mousedown", function(event){
            colorPixel(event)
            canvas.addEventListener("mousemove", colorPixel);
        });

        canvas.addEventListener("mouseup", function (){
            canvas.removeEventListener("mousemove", colorPixel);
        });


        // uncolors pixel
        canvas.addEventListener("dblclick", function(event){
            for (const p of selectedArray){
                if ((event.offsetX <= p.xCoordinate && event.offsetX >= p.xCoordinate - 40) && (event.offsetY <= p.yCoordinate && event.offsetY >= p.yCoordinate - 40)){
                    p.makeOrColorGrid(p.xCoordinate - 38, p.yCoordinate - 38, p.xCoordinate - 1, p.yCoordinate - 1, 1, "white")
                    console.log(`Unclicked ${p.color}: (${p.xCoordinate}, ${p.yCoordinate})`);
                }
            }
        })

        clearBtn.addEventListener("click", function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //repetitive, make it a function
            let pixelGrid = pixelsList[0]; // contains coordinates (0,0)
            pixelGrid.changeColor("black");
            pixelGrid.makeOrColorGrid(0, 0, canvas.width, canvas.height, 40);

            return;
            
        })