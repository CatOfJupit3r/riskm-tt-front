/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'Category': { kind: 'OBJECT'; name: 'Category'; fields: { '_id': { name: '_id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'createdBy': { name: 'createdBy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'description': { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'CategoryPaginatedResult': { kind: 'OBJECT'; name: 'CategoryPaginatedResult'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'filtered': { name: 'filtered'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Category'; ofType: null; }; }; }; } }; }; };
    'ID': unknown;
    'Int': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'changeRiskStatus': { name: 'changeRiskStatus'; type: { kind: 'OBJECT'; name: 'Risk'; ofType: null; } }; 'createCategory': { name: 'createCategory'; type: { kind: 'OBJECT'; name: 'Category'; ofType: null; } }; 'createRisk': { name: 'createRisk'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Risk'; ofType: null; }; } }; 'removeCategory': { name: 'removeCategory'; type: { kind: 'OBJECT'; name: 'Category'; ofType: null; } }; 'removeRisk': { name: 'removeRisk'; type: { kind: 'OBJECT'; name: 'Risk'; ofType: null; } }; 'updateCategory': { name: 'updateCategory'; type: { kind: 'OBJECT'; name: 'Category'; ofType: null; } }; 'updateRisk': { name: 'updateRisk'; type: { kind: 'OBJECT'; name: 'Risk'; ofType: null; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'categories': { name: 'categories'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'CategoryPaginatedResult'; ofType: null; }; } }; 'risks': { name: 'risks'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'RiskPaginatedResult'; ofType: null; }; } }; }; };
    'Risk': { kind: 'OBJECT'; name: 'Risk'; fields: { '_id': { name: '_id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'category': { name: 'category'; type: { kind: 'OBJECT'; name: 'Category'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'createdBy': { name: 'createdBy'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'description': { name: 'description'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'name': { name: 'name'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'resolved': { name: 'resolved'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; }; };
    'RiskPaginatedResult': { kind: 'OBJECT'; name: 'RiskPaginatedResult'; fields: { 'count': { name: 'count'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Int'; ofType: null; }; } }; 'filtered': { name: 'filtered'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Risk'; ofType: null; }; }; }; } }; }; };
    'String': unknown;
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}