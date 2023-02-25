function ratioCalculator(total, firstItem, secondItem, thirdItem) {
    let firstItemPercentage = 100 * (firstItem/total);
    let secondItemPercentage = 100 * (secondItem/total);
    let thirdItemPercentage = 100 * (thirdItem/total);
    return {
        firstItemPercentage,
        secondItemPercentage,
        thirdItemPercentage
    }
}

export default ratioCalculator;