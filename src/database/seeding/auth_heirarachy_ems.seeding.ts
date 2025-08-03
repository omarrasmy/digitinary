// import { EMS } from "src/organizations/subdomain/ems/db/ems.schema";
// import { AuthHierarchies } from "src/roles/subdomain/auth_hierarchy/db/auth_hierarchy.schema";
// import { DataSource } from "typeorm";
// import { Seeder, SeederFactoryManager } from "typeorm-extension";

// export default class AuthHierarchiesEmsSeeder implements Seeder {
//     public async run(
//         dataSource: DataSource,
//         factoryManager: SeederFactoryManager,
//     ): Promise<void> {
//         const emsRepository = dataSource.getRepository(EMS);
//         const authReporitory = dataSource.getRepository(AuthHierarchies);
//         let emss = await emsRepository.find({
//             relations: {
//                 organizations: true
//             }
//         });
//         console.log('Running emsSeeder...');
//         console.log(emss.length);
//         for (let ems of emss) {
//             let child = ems.id;
//             let parent = ems.organizations.id;
//             let oldAuth = await authReporitory.findOne({
//                 where: {
//                     parentId: parent,
//                     childId: child
//                 }
//             });
//             if (!oldAuth)
//                 await authReporitory.insert({
//                     parentId: parent,
//                     childId: child
//                 });
//         }
//     }
// }