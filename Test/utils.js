module.exports.isNotEmpty = function trim(str) {
    str.replace(/(^\s*)|(\s*$)/g, '');
    return str != null && str.length > 0
};
