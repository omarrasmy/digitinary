// import { Organizations } from "src/organizations/db/organizations.schema";
// import { AuthHierarchies } from "src/roles/subdomain/auth_hierarchy/db/auth_hierarchy.schema";
// import { DataSource } from "typeorm";
// import { Seeder, SeederFactoryManager } from "typeorm-extension";

// export default class AuthHeirarchiesOrganizationSeeder implements Seeder {
//     public async run(
//         dataSource: DataSource,
//         factoryManager: SeederFactoryManager,
//     ): Promise<void> {
//         const organizationRepository = dataSource.getRepository(Organizations);
//         const authReporitory = dataSource.getRepository(AuthHierarchies);
//         let organizations = await organizationRepository.find();
//         console.log('Running organizationSeeder...');
//         console.log(organizations.length);

//         for (let organization of organizations) {
//             let child = organization.id
//             let oldAuth = await authReporitory.findOne({
//                 where: {
//                     parentId: null,
//                     childId: child
//                 }
//             });
//             if (!oldAuth)
//                 await authReporitory.insert({
//                     parentId: null,
//                     childId: child
//                 });
//         }
//     }
// }