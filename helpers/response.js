class Response {
    static success(api_version, total_items, items) {
        return {
            api_version: api_version,
            total_items: total_items,
            items: items
        }
    }
}

module.exports = Response