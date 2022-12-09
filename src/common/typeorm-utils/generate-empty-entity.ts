import { CustomBaseEntity } from '../../app.entity';
import { School } from '../../school/entities/school.entity';
import { User } from '../../user/entities/user.entity';

export function getEmptyUserEntity(id: number) {
  const user = new User();
  return setIdPropertyOfEntity(user, id);
}

export function getEmptySchoolEntity(id: number) {
  const school = new School();
  return setIdPropertyOfEntity(school, id);
}

function setIdPropertyOfEntity(entity: CustomBaseEntity, id: number) {
  entity.id = id;
  return entity;
}
