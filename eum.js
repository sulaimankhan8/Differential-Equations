let x0=0;
let f =(x,y)=>x+y ;
let y0=1;
//let x=1;
let n=5;
// let h=(x-x0)/n;
 let h=0.1;
let itteration = 5
let y =y0 + h*f(x0,y0);
let xs=x0+h;
for( let i=1;i<=itteration;i++)
{
    
    let ys=y0 + h*(f(x0,y0)+f(xs,y))/2;
    console.log(ys);
    y=ys;
    
}