"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function autoPopulatePlugin(schema, options = {}) {
    schema.pre("find", function (next) {
        autoPopulateFields(this, schema, options);
        next();
    });
    schema.pre("findOne", function (next) {
        autoPopulateFields(this, schema, options);
        next();
    });
}
function autoPopulateFields(query, schema, options) {
    if (options.fields && options.fields.length > 0) {
        options.fields.forEach((field) => query.populate(field));
    }
    else {
        const paths = Object.keys(schema.paths);
        paths.forEach((path) => {
            if (schema.paths[path].options &&
                schema.paths[path].options.ref) {
                query.populate(path);
            }
        });
    }
}
exports.default = autoPopulatePlugin;
