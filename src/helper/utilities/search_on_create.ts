import { CreateAssignmentRequest } from 'src/lessons/subdomain/assignments/dto/create-assignment-request.dto';
import { CreateExamRequest } from 'src/lessons/subdomain/exams/dto/create-exam-request.dto';
import { CourseType } from 'src/courses/domain/course_types';
import { Equal, IsNull, Or } from 'typeorm';
export function searchExamAndAssignment(
  Type: CourseType,
  createRequest: CreateAssignmentRequest | CreateExamRequest,
) {
  let search, searchOld;

  if (createRequest.lessonsId) {
    search = {
      lessons: { id: createRequest.lessonsId },
      questionType: Type.getTypes().getQuestionsType(),
      question_types: {
        typesId: Or(Equal(Type.types.id), IsNull()),
      },
    };
    searchOld = {
      lessons: { id: createRequest.lessonsId },
      course_types: { id: Type.getId() },
    };
  } else {
    search = {
      courses: { id: Type.getCourses().getId() },
      questionType: Type.getTypes().getQuestionsType(),
      question_types: {
        typesId: Or(Equal(Type.types.id), IsNull()),
      },
    };
    createRequest.coursesId = Type.getCourses().getId();
    searchOld = {
      courses: { id: Type.getCourses().getId() },
      course_types: { id: Type.getId() },
    };
  }
  return { search, searchOld };
}
