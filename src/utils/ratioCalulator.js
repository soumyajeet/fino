export default function initialRatio(total, a, b, c) {
    let x = total * (a/100); 
    let y = total * (b/100);
    let z = total * (c/100);

    return {x, y, z}
}