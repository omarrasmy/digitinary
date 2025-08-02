
// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permissions } from 'src/roles/subdomain/permissions/db/permissions.schema';
import { PermissionsEnum } from 'src/roles/subdomain/permissions/enum/permissions.enum';
import { EntitiesEnum } from 'src/roles/subdomain/permissions/enum/entities.enum';
import { EntitiesTitlesEnum } from 'src/roles/subdomain/permissions/enum/permissions_showed_title.enum';
import { EntitiesDescriptionsEnum } from 'src/roles/subdomain/permissions/enum/permissions_description.enum';
import { Courses } from 'src/courses/db/courses.schema';
import { AuthHierarchies } from 'src/roles/subdomain/auth_hierarchy/db/auth_hierarchy.schema';

export default class AuthHierarchiesCoursesSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const courseRepository = dataSource.getRepository(Courses);
        const authReporitory = dataSource.getRepository(AuthHierarchies);
        let courses = await courseRepository.find();
        console.log('Running CoursesSeeder...');
        console.log(courses.length);

        for (let course of courses) {
            let child = course.id;
            let parent = course.containersId;
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
            else
                console.log('Auth already exists');
        }
    }
}
