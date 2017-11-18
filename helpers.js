/**
 * File of helper functions that we use repeatedly and can expose to our template
 */

// dump is a function that can be used to preview data from the database
exports.dump = obj => JSON.stringify(obj, null, 2);

// site name
exports.siteName = 'Trans Culture';
