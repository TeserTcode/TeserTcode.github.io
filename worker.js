	importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.1/math.min.js');
	importScripts('mthfnc.js');
	importScripts('clrspc.js');
	
self.onmessage = function(e) {
    const { minReal, maxImag, reStep, imStep, width, height, funcStr, startRow, endRow, magnitudeToLightnessExpr, colorMode, saturationChroma, lightness, paletteImageData } = e.data;
    const result = [];

    let memo = 0;
    for (let x = 0; x < width; x++) {
        for (let y = startRow; y < endRow; y++) {
            const re = minReal + x * reStep;
            const im = maxImag - y * imStep;
            let color = [0, 0, 0];

            try {
                const complexValue = math.complex(re, im);
                const funcValue = sinp(complexValue);
console.log(complexValue);
                // Ensure complexToColor handles complex values correctly
                color = complexToColor(complexValue, funcValue, magnitudeToLightnessExpr, colorMode, saturationChroma, lightness, paletteImageData, 0.1, math.divide(math.subtract(funcValue, memo), imStep));
                memo = funcValue;
            } catch (error) {
                console.error('Error evaluating function or applying color transformation:', error);
            }

            const index = (y * width + x) * 4;
            result.push({ index, color });
        }
    }

    self.postMessage(result);
};