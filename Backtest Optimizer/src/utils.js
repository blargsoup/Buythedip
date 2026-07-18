export function clamp(value,min,max){

    return Math.min(max,Math.max(min,value));

}

export function lerp(a,b,t){

    return a+(b-a)*t;

}

export function annualToDaily(rate){

    return Math.pow(1+rate,1/365)-1;

}

export function compound(rate,days){

    return Math.pow(1+rate,days);

}

export function daysBetween(a,b){

    return (b-a)/(1000*60*60*24);

}

export function yearsBetween(a,b){

    return daysBetween(a,b)/365.2425;

}

export function deepClone(obj){

    return structuredClone(obj);

}