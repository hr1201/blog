# RESTful

RESTful是一种架构风格，虽然不是强制性的标准，但它提出了一种客户端与服务端交互时的设计原则和理念。基于这些原则和理念，我们可以设计出更简洁、灵活的接口。

RESTful的特点包括以下几个方面：

1. **资源定位**：RESTful架构中，每个资源都有一个唯一的URL来进行定位。通过URL可以准确地获取到所需的资源。

2. **数据展示**：RESTful架构中，数据的展示采用JSON格式。JSON是一种轻量级的数据交换格式，易于阅读和解析。

3. **使用HTTP方法**：RESTful架构中，使用HTTP方法来描述行为。常用的HTTP方法包括GET、POST、PUT、DELETE等，每个方法对应着不同的操作。

4. **使用HTTP状态码**：RESTful架构中，使用HTTP状态码来描述操作结果。常见的状态码包括200（成功）、404（资源不存在）、500（服务器错误）等。

通过遵循RESTful的设计原则，我们可以使接口更加清晰、易于理解和使用。同时，RESTful也提供了一种统一的接口设计方式，使得不同的客户端和服务端可以进行无缝的交互。

## 使用HTTP方法

查询 GET

提交 POST

更新 PUT PATCH

删除 DELETE

```ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
```

## 使用HTTP状态码

HTTP状态码是用来表示HTTP请求的处理结果的标准化代码。它们提供了关于请求是否成功、是否需要进一步操作以及是否存在错误的信息。

以下是常见的HTTP状态码及其含义：

- 1xx：信息性状态码，表示请求已被接收，服务器需要进一步处理。
- 2xx：成功状态码，表示请求已成功被服务器接收、理解和处理。
- 3xx：重定向状态码，表示需要进一步操作以完成请求。
- 4xx：客户端错误状态码，表示服务器无法处理请求。
- 5xx：服务器错误状态码，表示服务器在处理请求时发生了错误。

常见的HTTP状态码包括：

- 200：请求成功，服务器成功处理了请求。
- 201：已创建，服务器成功创建了资源。
- 204：无内容，服务器成功处理了请求，但没有返回任何内容。
- 301：永久重定向，请求的资源已被永久移动到新位置。
- 302：临时重定向，请求的资源已被临时移动到新位置。
- 400：错误的请求，服务器无法理解请求的语法或参数。
- 401：未授权，请求需要用户身份验证。
- 403：禁止访问，服务器拒绝了请求。
- 404：未找到，服务器无法找到请求的资源。
- 500：服务器内部错误，服务器在处理请求时发生了错误。