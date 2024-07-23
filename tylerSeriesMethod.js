function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

function nthDerivative(f, x0, y0, n, h = 1e-5) {
    if (n === 0) return y0;
    if (n === 1) return f(x0, y0);
    let prevValue = nthDerivative(f, x0, y0, n - 1, h);
    return (nthDerivative(f, x0 + h, y0 + h * prevValue, n - 1, h) - nthDerivative(f, x0 - h, y0 - h * prevValue, n - 1, h)) / (2 * h);
}

function taylorSeries(f, x0, y0, x, order) {
    let sum = y0;
    let polynomial = `${y0}`;
    for (let n = 1; n <= order; n++) {
        const derivative = nthDerivative(f, x0, y0, n);
        const term = (Math.pow(x - x0, n) / factorial(n)) * derivative;
        sum += term;
        polynomial += ` + (${derivative} * (x - ${x0})^${n} / ${factorial(n)})`;
    }
    return { sum, polynomial };
}

function calculate() {
    const form = document.getElementById("calcForm");
    const resultElement = document.getElementById("result");
    const polynomialElement = document.getElementById("polynomial");

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const { expression, x0, y0, x, order } = data;

        const customMath = {
            sin:Math.sin,
            cos:Math.cos,
            tan:Math.tan,
            cot:(x) => 1/Math.tan,
            sec:(x) => 1/Math.cos,
            cosec:(x) => 1/Math.sin,
            log:Math.log10
           
        }

        const preparedExpression = expression.replace(/sin|cos|tan|cot|sec|cosec|log/g,match => `customMath.${match}`);


        const f = (x, y) => new Function('x','y','customMath',`return ${preparedExpression}`)(x,y,customMath);
        const { sum, polynomial } = taylorSeries(f, parseFloat(x0), parseFloat(y0), parseFloat(x), parseInt(order));
        resultElement.innerHTML = `<strong>Taylor Series approximation at x = ${x}:</strong> ${sum}`;
        polynomialElement.innerHTML = `<strong >Polynomial:</strong> ${polynomial}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        polynomialElement.textContent = "";
    }
}
