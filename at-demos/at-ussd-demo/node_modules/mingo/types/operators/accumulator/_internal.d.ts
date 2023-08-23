/**
 * Compute the standard deviation of the data set
 * @param {Array} array of numbers
 * @param {Boolean} if true calculates a sample standard deviation, otherwise calculates a population stddev
 * @return {Number}
 */
export declare function stddev(data: number[], sampled?: boolean): number;
export declare function covariance(dataset: number[][], sampled?: boolean): number;
