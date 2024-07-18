let x0=0;
let f =(x,y)=>x*x+y*y ;
let y0=1;
//let x=1;
let n=5;
// let h=(x-x0)/n;
 let h=0.1;
let itteration = 5

for( let i=1;i<=itteration;i++)
{
    let y =y0 + h*f(x0,y0);
    console.log(y);
    y0=y;
    x0=x0+h;
}