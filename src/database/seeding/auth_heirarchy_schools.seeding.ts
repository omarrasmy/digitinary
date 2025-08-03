
// // src/db/seeds/user.seeder.ts
// import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { Permissions } from 'src/roles/subdomain/permissions/db/permissions.schema';
// import { PermissionsEnum } from 'src/roles/subdomain/permissions/enum/permissions.enum';
// import { EntitiesEnum } from 'src/roles/subdomain/permissions/enum/entities.enum';
// import { EntitiesTitlesEnum } from 'src/roles/subdomain/permissions/enum/permissions_showed_title.enum';
// import { EntitiesDescriptionsEnum } from 'src/roles/subdomain/permissions/enum/permissions_description.enum';
// import { AuthHierarchies } from 'src/roles/subdomain/auth_hierarchy/db/auth_hierarchy.schema';
// import { Schools } from 'src/schools/db/schools.schema';

// export default class AuthHierarchiesSchoolSeeder implements Seeder {
//     public async run(
//         dataSource: DataSource,
//         factoryManager: SeederFactoryManager,
//     ): Promise<void> {
//         const schoolRepository = dataSource.getRepository(Schools);
//         const authReporitory = dataSource.getRepository(AuthHierarchies);
//         let schools = await schoolRepository.find({
//             relations: {
//                 EMS: true,
//             }
//         });
//         console.log('Running schoolSeeder...');
//         console.log(schools.length);
//         for (let school of schools) {
//             let child = school.id;
//             let parent = school.EMS.id;
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
