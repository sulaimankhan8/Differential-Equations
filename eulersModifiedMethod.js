document.getElementById('euler-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const x0 = parseFloat(document.getElementById('x0').value);
    const y0 = parseFloat(document.getElementById('y0').value);
    const n = parseInt(document.getElementById('n').value);
    const hInput = document.getElementById('h').value;
    const xTargetInput = document.getElementById('x-target').value;
    const equation = document.getElementById('equation').value;

    let h;
    if (hInput) {
        h = parseFloat(hInput);
    } else if (xTargetInput) {
        const xTarget = parseFloat(xTargetInput);
        h = (xTarget - x0) / n;
    } else {
        alert("Please provide either step size (h) or target x.");
        return;
    }

    function cot(x) {
        return 1 / Math.tan(x);
    }
    
    function sec(x) {
        return 1 / Math.cos(x);
    }
    
    function cosec(x) {
        return 1 / Math.sin(x);
    }
    
    function log(x) {
        return Math.log10(x);  // Base-10 logarithm
    }

    // Function to parse the equation input and return the function f(x, y)
    const f = new Function('x', 'y','Math', 'cot', 'sec', 'cosec', 'log', `return ${equation};`);

    // Euler's modified method implementation
    function eulerModifiedMethod(f, x0, y0, h, n) {
        let x = x0;
        let y = y0;
        let xs = x0 + h;
        const results = [[x, y]];
        const polynomials = [`y = ${y0}`];

        for (let i = 1; i <= n; i++) {
            let y1 = y + h * f(x, y, Math, cot, sec, cosec, log);
            let  yNew = y + h * (f(x, y, Math, cot, sec, cosec, log) + f(xs, y1, Math, cot, sec, cosec, log)) / 2;
            polynomials.push(`${y} = ${y1} + h/2 * [f(x${i-1}, y${i-1}) + f(x${i}, y${i})]`);
            y = yNew;
            x += h;
            xs += h;
            results.push([x, y]);
        }

        return {results , polynomials};
    }

    // Calculate the results
    const {results, polynomials} = eulerModifiedMethod(f, x0, y0, h, n);

    // Display the results
    const iterationsElement = document.getElementById('iterations');
    const polynomialsElement = document.getElementById('polynomials');
    
    iterationsElement.innerHTML = 'Iterations:\n';
    results.forEach(([x, y], index) => {
        iterationsElement.innerHTML += `Step ${index}: x = ${x.toFixed(2)}, y = ${y.toFixed(4)}\n`;
    });
    
    polynomialsElement.innerHTML = 'Polynomials:\n';
    polynomials.forEach((poly,index) => {
        polynomialsElement.innerHTML +=`Step ${index+1}: ${poly}\n`;
    });
});
