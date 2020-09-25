exports.fields = (obj) => {
    let statement = ``
    const len = Object.values(obj).length
    Object.entries(obj).forEach(([key, value], index) => {
        statement += `${key} = '${value}' ${index !== len - 1 ? ', ' : ''}`
    })
    return statement
}
exports.where = (opt) => {
    if (!opt) return ''
    const len = Object.values(opt).length
    let statement = ``
    Object.entries(opt).forEach(([key, value], index) => {
        statement += `${key} = '${value}' ${index !== len - 1 ? 'AND ' : ''}`
    })
    return statement
}


console.log(this.where())