import { Schema, Query } from "mongoose";

interface AutoPopulateOptions {
  fields?: string[];
}

function autoPopulatePlugin<T>(
  schema: Schema<T>,
  options: AutoPopulateOptions = {}
): void {
  schema.pre<Query<T[], T>>("find", function (next) {
    autoPopulateFields(this, schema, options);
    next();
  });

  schema.pre<Query<T | null, T>>("findOne", function (next) {
    autoPopulateFields(this, schema, options);
    next();
  });
}

function autoPopulateFields<T>(
  query: Query<T, any>,
  schema: Schema,
  options: AutoPopulateOptions
): void {
  if (options.fields && options.fields.length > 0) {
    options.fields.forEach((field) => query.populate(field));
  } else {
    const paths = Object.keys(schema.paths);
    paths.forEach((path) => {
      if (
        schema.paths[path].options &&
        (schema.paths[path] as any).options.ref
      ) {
        query.populate(path);
      }
    });
  }
}

export default autoPopulatePlugin;
