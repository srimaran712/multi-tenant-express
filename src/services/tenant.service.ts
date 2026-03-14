import { EntityManager, Repository } from "typeorm";
import { Tenant } from "../models/tenant.model";
import {TenantInterface} from "../interfaces/tenant.interface";
import { AppDataSource } from "../config/data-source.config";
//create query 

//const Query = AppDataSource.createQueryBuilder();

export class TenantService {
    constructor(
     
    ) {
      
    }

    async createTenant(tenantData: TenantInterface,manager:EntityManager) {
        const checkTenant = await manager
            .createQueryBuilder(Tenant, "tenant")
            .select("tenant.id")
            .where("tenant.name = :name", { name: tenantData.name })
            .getOne()

        if (checkTenant) {
            throw new Error("Tenant already exists")
        }

        const newTenant = await manager
            .createQueryBuilder()
            .insert()
            .into(Tenant)
            .values(tenantData)
            .execute()
   //console log the new tenant
        console.log(newTenant)
        return newTenant.raw[0].id
    
    }
    
}
// # Implementing a TypeORM Query in Your Service

// Here's a step-by-step guide to implement the `createTenant` method using TypeORM.

// ---

// ## Step 1: Define Your Entity

// Create a `Tenant` entity with the necessary columns:

// ```typescript
// import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// @Entity()
// export class Tenant {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     // add other columns as needed
// }
// ```

// [[Entity setup](https://typeorm.io/docs/getting-started/#step-by-step-guide)]

// ---

// ## Step 2: Set Up Your DataSource

// Create a `data-source.ts` file to configure your database connection:

// ```typescript
// import { DataSource } from "typeorm"

// export const myDataSource = new DataSource({
//     type: "mysql", // or postgres, sqlite, etc.
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "test",
//     database: "test",
//     entities: ["src/entity/*.js"],
//     logging: true,
//     synchronize: true,
// })
// ```

// [[DataSource setup](https://typeorm.io/docs/guides/example-with-express/#adding-typeorm-to-the-application)]

// ---

// ## Step 3: Implement the Service Using the Repository

// Inject the `DataSource` into your service and use the repository to insert data:

// ```typescript
// import { DataSource } from "typeorm"
// import { Tenant } from "./entity/Tenant"

// export class TenantService {
//     constructor(private dataSource: DataSource) {}

//     async createTenant(tenantData: any) {
//         const tenantRepository = this.dataSource.getRepository(Tenant)
//         const tenant = tenantRepository.create(tenantData)
//         const result = await tenantRepository.save(tenant)
//         return result
//     }
// }
// ```

// **What each method does:**
// - **`create()`** — Creates a new instance of the entity from the plain object. [[Repository API](https://typeorm.io/docs/working-with-entity-manager/repository-api/#repository-api)]
// - **`save()`** — Inserts the entity if it doesn't exist, or updates it if it does. [[Repository API](https://typeorm.io/docs/working-with-entity-manager/repository-api/#repository-api)]

// ---

// ## Alternative: Using QueryBuilder for Insert

// If you prefer more control, you can use the `InsertQueryBuilder`:

// ```typescript
// async createTenant(tenantData: any) {
//     await this.dataSource
//         .createQueryBuilder()
//         .insert()
//         .into(Tenant)
//         .values(tenantData)
//         .execute()
// }
// ```

// [[Insert QueryBuilder](https://typeorm.io/docs/query-builder/insert-query-builder/)]

// ---

// ## Step 4: Initialize the DataSource in Your App Entry Point

// Make sure the DataSource is initialized before handling requests:

// ```typescript
// import "reflect-metadata"
// import { myDataSource } from "./app-data-source"

// try {
//     await myDataSource.initialize()
//     console.log("Data Source has been initialized!")
// } catch (error) {
//     console.error("Error during Data Source initialization:", error)
// }
// ```

// [[App setup](https://typeorm.io/docs/guides/example-with-express/#adding-typeorm-to-the-application)]

// ---

// > **Note:** The same pattern applies to your `UserService.createUser` method — just swap `Tenant` for your `User` entity.