
// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, In } from 'typeorm';
import { Permissions } from 'src/roles/subdomain/permissions/db/permissions.schema';
import { PermissionsEnum } from 'src/roles/subdomain/permissions/enum/permissions.enum';
import { EntitiesEnum } from 'src/roles/subdomain/permissions/enum/entities.enum';
import { EntitiesTitlesEnum } from 'src/roles/subdomain/permissions/enum/permissions_showed_title.enum';
import { EntitiesDescriptionsEnum } from 'src/roles/subdomain/permissions/enum/permissions_description.enum';
import { Roles } from 'src/roles/db/roles.schema';
import { Users } from 'src/users/db/users.schema';
import { UsersRoles } from 'src/users/subdomain/user_roles/db/users-roles.schema';

export default class RolesSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        console.log('Running UserSeeder...');
        const permissionRepository = dataSource.getRepository(Permissions);
        const roleRepository = dataSource.getRepository(Roles);
        const userRepository = dataSource.getRepository(Users);
        const userRoleRepository = dataSource.getRepository(UsersRoles);
        let fullAccessUser = "Full Access User"
        let student = "Student"
        let user = "User"
        let upload = "Upload"
        let teachers = "Teachers"
        let createFile = "File Creator";
        let createFilePermissions = [
            PermissionsEnum.CREATE + ":" + EntitiesEnum.FILES
        ];
        let createFilePermissionsEntities = await permissionRepository.find({
            where: {
                title: In(createFilePermissions)
            }
        })
        let uploadPermissions = [
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSES_ACCESS_MANAGER
        ]
        let uploadPermissionsEntities = await permissionRepository.find({
            where: {
                title: In(uploadPermissions)
            }
        })
        let teachersPermissions = [
            PermissionsEnum.READ + ":" + EntitiesEnum.COURSES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.GRADES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSES_ACCESS_MANAGER,
            PermissionsEnum.LIST + ":" + EntitiesEnum.STUDENTS,
            PermissionsEnum.READ + ":" + EntitiesEnum.TEACHERS,
            PermissionsEnum.READ + ":" + EntitiesEnum.STANDARDS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.STANDARDS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SUB_STANDARDS,
            PermissionsEnum.READ + ":" + EntitiesEnum.SUB_STANDARDS,
            PermissionsEnum.READ + ":" + EntitiesEnum.LESSONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.LESSONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.USER_COURSES_GRADE,
            PermissionsEnum.READ + ":" + EntitiesEnum.USER_COURSES_GRADE,
            PermissionsEnum.READ + ":" + EntitiesEnum.TYPES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.TYPES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSE_TYPES,
            PermissionsEnum.READ + ":" + EntitiesEnum.COURSE_TYPES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.QUESTIONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.QUESTIONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.BLOOMS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.BLOOMS,
            PermissionsEnum.READ + ":" + EntitiesEnum.DOKS,
            PermissionsEnum.READ + ":" + EntitiesEnum.QUESTION_OPTIONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.QUESTION_OPTIONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.EXAMS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.EXAMS,
            PermissionsEnum.READ + ":" + EntitiesEnum.USERS_QUESTION_ANSWERS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.USERS_QUESTION_ANSWERS,
            PermissionsEnum.READ + ":" + EntitiesEnum.USERS_GRADE_SUBMISSIONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.USERS_GRADE_SUBMISSIONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.ASSIGNMENTS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ASSIGNMENTS,
            PermissionsEnum.READ + ":" + EntitiesEnum.FILES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.FILES,
            PermissionsEnum.READ + ":" + EntitiesEnum.TERMS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.TERMS,
            PermissionsEnum.READ + ":" + EntitiesEnum.SCHEDULES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SCHEDULES,
            PermissionsEnum.READ + ":" + EntitiesEnum.SCHEDULE_DATES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SCHEDULE_DATES,
            PermissionsEnum.READ + ":" + EntitiesEnum.COURSES_HAS_SCHEDULE_DATES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSES_HAS_SCHEDULE_DATES,
            PermissionsEnum.READ + ":" + EntitiesEnum.SCHOOL_SCHEDULES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SCHOOL_SCHEDULES,
            PermissionsEnum.READ + ":" + EntitiesEnum.ATTENDANCES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ATTENDANCES,
            PermissionsEnum.READ + ":" + EntitiesEnum.ACTIVITIES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ACTIVITIES,
            PermissionsEnum.READ + ":" + EntitiesEnum.JOURNEYS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.JOURNEYS,
        ]
        let teachersPermissionsEntities = await permissionRepository.find({
            where: {
                title: In(teachersPermissions)
            }
        })
        let userRolePermissions = [
            PermissionsEnum.CREATE + ":" + EntitiesEnum.ME,
            PermissionsEnum.UPDATE + ":" + EntitiesEnum.ME,
            PermissionsEnum.DELETE + ":" + EntitiesEnum.ME,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ME,
            PermissionsEnum.READ + ":" + EntitiesEnum.ME,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ORGANIZATIONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.EMS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SCHOOL_GRADES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.SCHOOLS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.GRADES
        ]
        let userRolePermissionsEntities = await permissionRepository.find({
            where: {
                title: In(userRolePermissions)
            }
        })
        console.log(userRolePermissionsEntities.length);
        let studentRolePermissions = [
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSES,
            PermissionsEnum.READ + ":" + EntitiesEnum.COURSES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.LESSONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.LESSONS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ACTIVITIES,
            PermissionsEnum.READ + ":" + EntitiesEnum.ACTIVITIES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ASSIGNMENTS,
            PermissionsEnum.READ + ":" + EntitiesEnum.ASSIGNMENTS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.EXAMS,
            PermissionsEnum.READ + ":" + EntitiesEnum.EXAMS,
            PermissionsEnum.LIST + ":" + EntitiesEnum.COURSE_TYPES,
            PermissionsEnum.READ + ":" + EntitiesEnum.COURSE_TYPES,
            PermissionsEnum.LIST + ":" + EntitiesEnum.JOURNEYS,
            PermissionsEnum.READ + ":" + EntitiesEnum.JOURNEYS,
            PermissionsEnum.CREATE + ":" + EntitiesEnum.USERS_GRADE_SUBMISSIONS,
            PermissionsEnum.READ + ":" + EntitiesEnum.SCHOOL_GRADES,
            PermissionsEnum.CREATE + ":" + EntitiesEnum.ME,
            PermissionsEnum.UPDATE + ":" + EntitiesEnum.ME,
            PermissionsEnum.DELETE + ":" + EntitiesEnum.ME,
            PermissionsEnum.LIST + ":" + EntitiesEnum.ME,
            PermissionsEnum.READ + ":" + EntitiesEnum.ME,
        ];
        let studentRolePermissionsEntities = await permissionRepository.find({
            where: {
                title: In(studentRolePermissions)
            }
        });

        let userRole = await roleRepository.findOne({ where: { title: user, organizationsId: null } })
        if (!userRole) {
            userRole = new Roles();
            userRole.title = user;
            userRole.organizationsId = null;
            userRole.permissions = userRolePermissionsEntities;
            await roleRepository.save(userRole);
            userRole = await roleRepository.findOne({ where: { title: user, organizationsId: null } })
        }
        else {
            userRole.permissions = userRolePermissionsEntities;
            await roleRepository.save(userRole);
        }
        let studentRole = await roleRepository.findOne({ where: { title: student, organizationsId: null } })
        if (!studentRole) {
            studentRole = new Roles();
            studentRole.title = student;
            studentRole.organizationsId = null;
            studentRole.permissions = studentRolePermissionsEntities;
            await roleRepository.save(studentRole);
            studentRole = await roleRepository.findOne({ where: { title: student, organizationsId: null } })
        }
        else {
            studentRole.permissions = studentRolePermissionsEntities;
            await roleRepository.save(studentRole);
        }
        let uploadRole = await roleRepository.findOne({ where: { title: upload, organizationsId: null } })
        if (!uploadRole) {
            uploadRole = new Roles();
            uploadRole.title = upload;
            uploadRole.organizationsId = null;
            uploadRole.permissions = uploadPermissionsEntities;
            await roleRepository.save(uploadRole);
            uploadRole = await roleRepository.findOne({ where: { title: upload, organizationsId: null } })
        }
        else {
            uploadRole.permissions = uploadPermissionsEntities;
            await roleRepository.save(uploadRole);
        }
        let teachersRole = await roleRepository.findOne({ where: { title: teachers, organizationsId: null } })
        if (!teachersRole) {
            teachersRole = new Roles();
            teachersRole.title = teachers;
            teachersRole.organizationsId = null;
            teachersRole.permissions = teachersPermissionsEntities;
            await roleRepository.save(teachersRole);
            teachersRole = await roleRepository.findOne({ where: { title: teachers, organizationsId: null } })
        }
        else {
            teachersRole.permissions = teachersPermissionsEntities;
            await roleRepository.save(teachersRole);
        }
        let createFileRole = await roleRepository.findOne({ where: { title: createFile, organizationsId: null } })
        if (!createFileRole) {
            createFileRole = new Roles();
            createFileRole.title = createFile;
            createFileRole.organizationsId = null;
            createFileRole.permissions = createFilePermissionsEntities;
            await roleRepository.save(createFileRole);
            createFileRole = await roleRepository.findOne({ where: { title: createFile, organizationsId: null } })
        }
        else {
            createFileRole.permissions = createFilePermissionsEntities;
            await roleRepository.save(createFileRole);
        }

        let fullAccessRole = await roleRepository.findOne({ where: { title: fullAccessUser, organizationsId: null } })
        if (!fullAccessRole) {
            fullAccessRole = new Roles();
            fullAccessRole.title = fullAccessUser;
            fullAccessRole.organizationsId = null;
            fullAccessRole.permissions = await permissionRepository.find();
            await roleRepository.save(fullAccessRole);
            fullAccessRole = await roleRepository.findOne({ where: { title: fullAccessUser, organizationsId: null } })
        }
        else {
            fullAccessRole.permissions = await permissionRepository.find();
            await roleRepository.save(fullAccessRole);
        }
        let allUsers = await userRepository.find({
            relations: {
                students: {
                    school_grades: {
                        schools: {
                            EMS: true
                        }
                    }
                },
                teachers: true,
                organizations: true
            }
        });
        for (let user of allUsers) {
            if (user.students) {
                let studentHasRole = await userRoleRepository.findOne({ where: { usersId: user.id, entityId: user.students.school_grades.id, rolesId: studentRole.id } })
                let uploadHasRole = await userRoleRepository.findOne({ where: { usersId: user.id, entityId: user.students.school_grades.id, rolesId: uploadRole.id } })
                let createFileHasRole = await userRoleRepository.findOne({ where: { usersId: user.id, entityId: user.students.school_grades.id, rolesId: createFileRole.id } })
                if (!studentHasRole) {
                    studentHasRole = new UsersRoles();
                    console.log("Student");
                    studentHasRole.usersId = user.id;
                    studentHasRole.rolesId = studentRole.id;
                    studentHasRole.entityId = user.students.school_grades.schools.EMS.id;
                    await userRoleRepository.save(studentHasRole)
                }
                if (!uploadHasRole) {
                    uploadHasRole = new UsersRoles();
                    console.log("Upload");
                    uploadHasRole.usersId = user.id;
                    uploadHasRole.rolesId = uploadRole.id;
                    uploadHasRole.entityId = user.students.school_grades.schools.EMS.id;
                    await userRoleRepository.save(uploadHasRole)
                }
                if (!createFileHasRole) {
                    createFileHasRole = new UsersRoles();
                    console.log("Create File");
                    createFileHasRole.usersId = user.id;
                    createFileHasRole.rolesId = createFileRole.id;
                    createFileHasRole.entityId = user.students.school_grades.schools.EMS.id;
                    await userRoleRepository.save(createFileHasRole)
                }
            }
            else {
                let userHasRole = await userRoleRepository.findOne({ where: { usersId: user.id, rolesId: userRole.id, entityId: user.organizations.id } })
                if (!userHasRole && user.email != "omarrasmy@gmail.com") {
                    userHasRole = new UsersRoles();
                    console.log("User");
                    userHasRole.usersId = user.id;
                    userHasRole.rolesId = userRole.id;
                    userHasRole.entityId = user.organizations.id;
                    await userRoleRepository.save(userHasRole)
                }
                else if (!userHasRole) {
                    let userHasRole = await userRoleRepository.findOne({ where: { usersId: user.id, rolesId: fullAccessRole.id, entityId: user.organizations.id } })
                    if (!userHasRole) {
                        console.log("Full Access User");
                        userHasRole = new UsersRoles();
                        userHasRole.usersId = user.id;
                        userHasRole.rolesId = fullAccessRole.id;
                        userHasRole.entityId = user.organizations.id;
                        await userRoleRepository.save(userHasRole)
                    }
                }
            }
        }
    }
}
