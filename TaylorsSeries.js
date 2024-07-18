// Function to calculate the nth partial derivative with respect to x
function nthPartialDerivativeX(f, x0, y0, nx, ny, h = 1e-5) {
    if (nx === 0) {
        return nthPartialDerivativeY(f, x0, y0, ny, h);
    }
    return (nthPartialDerivativeX(f, x0 + h, y0, nx - 1, ny, h) - nthPartialDerivativeX(f, x0 - h, y0, nx - 1, ny, h)) / (2 * h);
}

// Function to calculate the nth partial derivative with respect to y
function nthPartialDerivativeY(f, x0, y0, ny, h = 1e-5) {
    if (ny === 0) {
        return f(x0, y0);
    }
    return (nthPartialDerivativeY(f, x0, y0 + h, ny - 1, h) - nthPartialDerivativeY(f, x0, y0 - h, ny - 1, h)) / (2 * h);
}

// Taylor series method for two variables
function taylorSeries2D(f, x0, y0, x, y, order) {
    let sum = 0;
    for (let nx = 0; nx <= order; nx++) {
        for (let ny = 0; ny <= order - nx; ny++) {
            const derivative = nthPartialDerivativeX(f, x0, y0, nx, ny);
            sum += (Math.pow(x - x0, nx) * Math.pow(y - y0, ny) / (factorial(nx) * factorial(ny))) * derivative;
        }
    }
    return sum;
}

// Helper function to calculate factorial
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Example usage
const f = (x, y) => x + y; // Example function f(x, y) = x^2 + y^2
const x0 = 0; // Point around which the series is expanded
const y0 = 1; // Point around which the series is expanded
const x = 0.1; // Point at which we want to approximate the function
const y = ; // Point at which we want to approximate the function
const order = 2; // Order of the Taylor series

const result = taylorSeries2D(f, x0, y0, x, y, order);
console.log(`The approximation of f(${x}, ${y}) using Taylor series up to order ${order} is ${result}`);
