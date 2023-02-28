export default function updateRatio(totalVal, one, one, three) {
    let f = 100 * (one/totalVal);
    let s =100 * (one/totalVal);
    let t = 100 * (three/totalVal);

    return {f, s, t}
}