
function mathieufloquet(v,z,q,a,c0=0,c2=0){
    let fi=math.complex(0,0)
    for(let n=-bign;n<=bign;n++)
fi=add(fi,mul(mathieufloquetc(mul(2,n),v,q,a,c0,c2),exp(mul(I,z,add(v,n,n)))))
return fi;}
function mathieufloquetc(n,v,q,a,c0=0,c2=0){
    if(n==0)return c0;
    if(modc(n,2)==1)return 0;
    if(n==2)return c2;
    if(n>0)return sub(mul(sub(a,sqr(add(v,mul(2,sub(n,2))))),mathieufloquetc(sub(n,2),q,a,c0,c2)),mul(q,mathieufloquetc(sub(n,4),q,a,c0,c2)))
    return sub(mul(sub(a,sqr(add(v,mul(2,add(n,2))))),mathieufloquetc(add(n,2),q,a,c0,c2)),mul(q,mathieufloquetc(add(n,4),q,a,c0,c2)))
}

function mathieura2munsolved(a,q){
    let fi=a
    for(let n=ceil(bign);n>=1;n-=1){
    if(n!==1)fi=mul(div(sqr(q),mul(16,n,n,sqr(sub(n,1)))),div(1,sub(1,div(a,4,n,n),fi)));
    else fi=fi=mul(div(sqr(q),2),div(1,sub(1,div(a,4,n,n),fi)));
  //  if(n!==1)fi=mul(q,div(q,16,n,n,sqr(sub(n,1))),div(1,sub(sub(1,div(a,4,n,n)),fi)));
  //  if(n==1)fi=mul(q,div(q,2),div(1,sub(sub(1,div(a,4,n,n)),fi)));
     //  console.log(div(1,sub(1,div(a,4,3,3),8)))
    }return sub(0,a,fi);
}
function mathieurvmunsolved(a,Q){
    const q=g(Q,0);const v=g(Q,1);
    
    return sub(sub(a, pow(v, 2)), div(pow(q, 2), sub(a, pow(add(v, 2), 2), div(pow(q, 2), sub(a, pow(add(v, 4), 2), div(pow(q, 2), sub(a, pow(add(v, 6), 2), div(pow(q, 2), sub(a, pow(add(v, 8), 2))))))))), div(pow(q, 2), sub(a, pow(sub(v, 2), 2), div(pow(q, 2), sub(a, pow(sub(v, 4), 2), div(pow(q, 2), sub(a, pow(sub(v, 6), 2), div(pow(q, 2), sub(a, pow(sub(v, 8), 2))))))))))
    
    let low=0;
    let hig=0;
    for(let n=ceil(4/2)*2;n>=2;n-=2){
   low=div(sqr(q),sub(a,sqr(add(v,n)),low))
  hig=div(sqr(q),sub(a,sqr(sub(v,n)),hig))
    }return sub(a,v,low,hig);
}/*
function mathieura1munsolved(a,q){
    let fi=a
    for(let n=ceil(bign);n>=1;n-=1){
    if(n!==1)fi=mul(div(sqr(q),mul(16,n,n,sqr(sub(n,1)))),div(1,sub(1,div(a,4,n,n),fi)));
    else fi=fi=mul(div(sqr(q),2),div(1,sub(1,div(a,4,n,n),fi)));
 
    }return sub(0,a,fi);
}*/

const mathieuaCache = new Map();
const mathieulCache = new Map();

function mathieua(q, rr = 0, gues=0.112) {
    const key = `${q},${rr},${gues}`;
    if (mathieuaCache.has(key)) {
        return mathieuaCache.get(key);
    }

    const guess = (mag(rr)<=10) ? mathieufraceigensmall(rr,q) : mathieufraceigenlarge(rr,q)
    //= (gues!==0.112)? gues: (rr<=6) ? mathieuaapproxtth(q,rr) : mathieufraceigensmall(rr,q)// add(sqr(rr),div(sqr(q),2,sub(sqr(rr),1)),div(mul(q,q,q,q,add(mul(rr,rr,5),7)),32,cum(sub(sqr(rr),1)),sub(sqr(rr),4))) //= (rr === 0) ? sub(0, q) : sqr(rr);
    const result = newtoninvfp(mathieura2munsolved, 0, guess, q);

    mathieuaCache.set(key, result);
    return result;
}
function mathieul(q, rr = 0, gues=0.112) {
    const key = `${q},${rr},${gues}`;
    if (mathieulCache.has(key)) {
        return mathieulCache.get(key);
    }
const guess=(gues!==0.112)? gues: 10000000;
   // const guess = (mag(rr)<=10) ? mathieufraceigensmall(rr,q) : mathieufraceigenlarge(rr,q)
    //= (gues!==0.112)? gues: (rr<=6) ? mathieuaapproxtth(q,rr) : mathieufraceigensmall(rr,q)// add(sqr(rr),div(sqr(q),2,sub(sqr(rr),1)),div(mul(q,q,q,q,add(mul(rr,rr,5),7)),32,cum(sub(sqr(rr),1)),sub(sqr(rr),4))) //= (rr === 0) ? sub(0, q) : sqr(rr);
    const result = newtoninvfp(mathieurvmunsolved, 0, guess, [q,rr]);

    mathieulCache.set(key, result);
    return result;
}

function mathieua2n(a,q,nn){
    
    if(nn<0 || nn%2!=0)return 0;
   // if(n==0 && )
 if(nn==0)return 1;
 //const a = mathieuram(q,mm)
 if(nn==2)return div(mul(a,mathieua2n(a,q,0)),q);
if(nn==4)return sub(div(mul(sub(a,4),mathieua2n(a,q,2)),q),mul(2,mathieua2n(a,q,0)))
return sub(div(mul(sub(a,mul(4,sqr(mul(sub(nn,2),0.5)))),mathieua2n(a,q,sub(nn,2))),q),mathieua2n(a,q,sub(nn,4)));
}
function mathieua1n(a,q,nn){
    if(nn<0 || nn%2!=1)return 0;
 if(nn==1)return 1;
 //const a = mathieuram(q,mm)
 if(nn==3)return div(mul(sub(a,1,q),mathieua1n(a,q,1)),q);
    const term1 = mul(sub(a, pow(add(sub(nn, 2), 1), 2)), mathieua1n(a, q, sub(nn, 2)));
    const term2 = mul(q, mathieua1n(a, q, sub(nn, 4)));
    return div(sub(term1, term2), q);
}
function mathieuan(a,q,nn){
  
    if(nn%2==0)return mathieua2n(a,q,nn);return mathieua1n(a,q,nn);
}


//function mathieucn(a,q,m,v){if (q==0)return 1; }


function mathieuc(a,q,z,nn=0){
let fi=0;
    for(let m=0;m<ceil(bign/2);m++)
fi=add(fi,mul(mathieuan(a,q,add(mul(2,m),modc(nn,2))),cos(mul(add(m,m,modc(nn,2)),z))));
return fi
}


function mathieuce(q,z,nn=0,rr=nn){
return  mathieuc(mathieul(q,rr),q,z,nn)
}