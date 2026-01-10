function plotGraph(point1, point2) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    const numSamples = 1000;
    const realValues = [];
    const imagValues = [];
    
 
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (math.min(point1.imag,point2.imag) <= 0 && math.max(point1.imag,point2.imag) >= 0) {
        const zeroY = (point1.imag)/(point2.imag - point1.imag)*canvas.height+canvas.height;
	
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height-zeroY);
        ctx.lineTo(canvas.width, canvas.height-zeroY);
        ctx.stroke();
    }
	if (math.min(point1.real,point2.real) <= 0 && math.max(point1.real,point2.real) >= 0) {
        const zeroX = (point1.real)/(point2.real - point1.real)*canvas.height+canvas.width;
	
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width-zeroX,0);
        ctx.lineTo(canvas.width- zeroX,canvas.height);
        ctx.stroke();
    }


    for (let i = 0; i <= numSamples; i++) {
        const t = i / numSamples;
        const real = point1.real + t * (point2.real - point1.real);
        const imag = point1.imag + t * (point2.imag - point1.imag);
        
        const z = math.complex(real, imag);
        const fn = math.evaluate(document.getElementById('function').value, { x: z });
        
        realValues.push(fn.re);
        imagValues.push(fn.im);
    }
    

    const graphWidth = canvas.width;
    const graphHeight = canvas.height;
    const maxValue = Math.max(...imagValues, ...realValues);
    const minValue = Math.min(...imagValues, ...realValues);


    ctx.beginPath();
    ctx.strokeStyle = 'red';
    for (let i = 0; i < realValues.length; i++) {
        const x = (i / numSamples) * graphWidth;
        const y = graphHeight - ((realValues[i] - minValue) / (maxValue - minValue)) * graphHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();


    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    for (let i = 0; i < imagValues.length; i++) {
        const x = (i / numSamples) * graphWidth;
        const y = graphHeight - ((imagValues[i] - minValue) / (maxValue - minValue)) * graphHeight;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}