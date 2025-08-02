
// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permissions } from 'src/roles/subdomain/permissions/db/permissions.schema';
import { PermissionsEnum } from 'src/roles/subdomain/permissions/enum/permissions.enum';
import { EntitiesEnum } from 'src/roles/subdomain/permissions/enum/entities.enum';
import { EntitiesTitlesEnum } from 'src/roles/subdomain/permissions/enum/permissions_showed_title.enum';
import { EntitiesDescriptionsEnum } from 'src/roles/subdomain/permissions/enum/permissions_description.enum';
import { Roles } from 'src/roles/db/roles.schema';
import { DefaultRoleEnum } from '../enums/default-role-enum';

export default class PermissionSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        console.log('Running UserSeeder...');
        const repository = dataSource.getRepository(Permissions);
        let entities = Object.values(EntitiesEnum)
        let showedTitle = Object.values(EntitiesTitlesEnum)
        let descrption = Object.values(EntitiesDescriptionsEnum)
        let permissions = Object.values(PermissionsEnum)
        const roleRepository = dataSource.getRepository(Roles);
        let count = 0;
        console.log('Seeding permissions');
        let fullAccessRole = await roleRepository.findOne({ where: { title: DefaultRoleEnum.FullAccess, organizationsId: null }, relations: ['permissions'] });
        for (let i = 0; i < entities.length; i++) {
            for (let j = 0; j < permissions.length; j++) {
                const permission = new Permissions();
                permission.title = permissions[j] + ":" + entities[i];
                permission.showedTitle = showedTitle[count];
                permission.description = descrption[count];
                count++;
                let temp = await repository.findOne({ where: { title: permission.title } })
                if (temp) {
                    console.log("Permission already exists")
                    continue;
                }
                await repository.save(permission);
                if (fullAccessRole) {
                    fullAccessRole.permissions.push(permission);
                    console.log(permission.id);
                    await roleRepository.save(fullAccessRole);
                }
            }
        }
    }
}
