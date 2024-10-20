import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(4, 50, {
    message: 'Vui lòng nhập tên từ 4 ký tự',
  })
  name: string;
  @Length(4, 100, {
    message: 'Vui lòng nhập email',
  })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @Length(6, 50, {
    message: 'Mật khẩu phải từ 6 ký tự',
  })
  password: string;

  created_at: string;

  updated_at: string;
}
