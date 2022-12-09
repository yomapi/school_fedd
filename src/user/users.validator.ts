import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { USER_TYPE } from './enums/usertype.enum';
import { isInEnum } from '../common/validator/custom_validator.enums';

@ValidatorConstraint({ async: false })
export class UserTypeValidator implements ValidatorConstraintInterface {
  validate(userType: string, args: ValidationArguments) {
    return isInEnum(userType, USER_TYPE) && userType.length === 1;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '($value) is invalid user type varchar!';
  }
}
