# 提供者
从前面了解到，controller用于处理接口请求以及路由机制；service用于业务逻辑和处理异常；module用于依赖注入，也就是作为IOC容器。

`Provider` 可以是一个定义了一系列函数的类，这些函数可以返回值（即提供某种服务）。`Provider` 可用于各种各样的任务，如数据访问、执行验证、执行复杂的业务逻辑等。NestJS 中的 `Provider` 主要用于实现依赖注入（Dependency Injection, DI），这是一种设计模式，用于实现类之间的低耦合关系。

## 基本用法
[provide]是`@Injectable()`装饰器标记的类(装饰器允许开发者在不修改原有对象代码的情况下，向对象添加新的行为或功能)。Providers可以直接通过 **构造函数参数注入** 注入到其他类中。例如：
::: code-group
```ts [app.controller.ts]
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  // 通过构造函数参数注入
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello2();
  }
}
```
```ts [app.service.ts]
import { Injectable } from '@nestjs/common';

// 使用 @Injectable() 装饰器标记了一个类可以被 Nest 的依赖注入器实例化和管理
// 也就是说 AppService 就是一个 Provider
// 将 MyService 注册到模块的 providers 数组中，它就可以被 NestJS 的依赖注入系统管理，并且可以在需要的地方被注入
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHello2(): string {
    return 'Hello World 2!';
  }
}
```
:::

## 自定义名称
那么**module**中的`providers`就是用于提供Nest中 injector 实例化后的可选提供程序列表，意思就是说此数组中的值可以当作一个`key`，指向**service**中实例化后的类`value`。这样**controller**就可以去容器里边找到`key`，最后通过`key`使用**service**提供的服务实现特定的业务场景。例如：

::: code-group
```ts [app.controller.ts]
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
    constructor(@Inject('Rpro') private readonly appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello2();
  }
}
```
```ts [app.module.ts]
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SessionTestModule } from './session-test/session-test.module';

@Module({
  imports: [ UserModule, SessionTestModule ],
  controllers: [ AppController ],
  providers: [{
    provide: 'Rpro',
    useClass: AppService
  }],
})
export class AppModule {}
```
:::
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202403092132628.png)


## 自定义注入值
代码如下：
::: code-group
```ts [app.controller.ts]
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('get')
export class AppController {
  constructor(
    @Inject('Rpro') private readonly appService: AppService,
    @Inject('test') private readonly num: Number
  ) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello2()+this.num;
  }
}
```
```ts [app.module.ts]
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SessionTestModule } from './session-test/session-test.module';

@Module({
  imports: [UserModule, SessionTestModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'Rpro',
      useClass: AppService
    }, {
      provide: 'test',
      useValue: 666
    }
  ],
})
export class AppModule { }
```
:::

![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202403092132589.png)


## 工厂模式
如果服务之间有相互的依赖或者逻辑处理可以使用`useFactory`，代码如下：
::: code-group
```ts [app.controller.ts]
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';

@Controller('get')
export class AppController {
  constructor(
    @Inject('Rpro') private readonly appService: AppService,
    @Inject('as2') private readonly as2: AppService2,
    @Inject('test') private readonly num: Number
  ) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello2()+' '+this.num+' '+this.as2;
  }
}
```
```ts [app.module.ts]
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';
import { UserModule } from './user/user.module';
import { SessionTestModule } from './session-test/session-test.module';

@Module({
  imports: [UserModule, SessionTestModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'Rpro',
      useClass: AppService
    }, {
      provide: 'test',
      useValue: 666
    },
    AppService2,
    {
      provide:'as2',
      inject:[AppService2],
      useFactory(appService2:AppService2){
        return appService2.getService2()
      }
      /* 异步模式
      async useFactory(appService2:AppService2){
        return await new Promise((r)=>{
          setTimeout(()=>{
            r(appService2.getService2())
          },10000)
        })
      }
      */
    }
  ],
})
export class AppModule { }
```
```ts [app.service2.ts]
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService2 {
  getService2(): string {
    return 'Hello AppService2!';
  }
}
```
:::
![](https://cdn.jsdelivr.net/gh/hr1201/img@main/imgs/202403092217563.png)

## 总结
NestJS 的 Provider 是实现依赖注入和业务逻辑封装的核心概念。通过使用 Provider，NestJS 应用可以保持高度的模块化和灵活性，同时简化了测试和维护。