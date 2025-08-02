
// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permissions } from 'src/roles/subdomain/permissions/db/permissions.schema';
import { PermissionsEnum } from 'src/roles/subdomain/permissions/enum/permissions.enum';
import { EntitiesEnum } from 'src/roles/subdomain/permissions/enum/entities.enum';
import { EntitiesTitlesEnum } from 'src/roles/subdomain/permissions/enum/permissions_showed_title.enum';
import { EntitiesDescriptionsEnum } from 'src/roles/subdomain/permissions/enum/permissions_description.enum';
import { AuthHierarchies } from 'src/roles/subdomain/auth_hierarchy/db/auth_hierarchy.schema';
import { SchoolGrades } from 'src/schools/subdomain/school_grades/db/school_grades.schema';

export default class AuthHierarchiesSchoolGradesSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const schoolGradesRepository = dataSource.getRepository(SchoolGrades);
        const authReporitory = dataSource.getRepository(AuthHierarchies);
        let schoolGradess = await schoolGradesRepository.find({
            relations: ['schools']
        });
        console.log('Running schoolGradesSeeder...');
        console.log(schoolGradess.length);
        for (let schoolGrades of schoolGradess) {
            let child = schoolGrades.id;
            let parent = schoolGrades.schools.id;
            let oldAuth = await authReporitory.findOne({
                where: {
                    parentId: parent,
                    childId: child
                }
            });
            if (!oldAuth)
                await authReporitory.insert({
                    parentId: parent,
                    childId: child
                });
        }
    }
}
