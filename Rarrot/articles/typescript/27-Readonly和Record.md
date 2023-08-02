# Readonly和Record

## Readonly

### 示例

```typescript
type Person={
    name:string,
    age:number,
    text:string
}

/**
 * 此时man的类型为：
    type man = {
        readonly name: string;
        readonly age: number;
        readonly text: string;
    }
 */
type man=Readonly<Person>
```





### 从源码进行解读：

```typescript
type key='name'|'age'|'text'

/**
 * 将 T 中的所有属性设为只读
 * 这里T为Person，keyof Person后即为上面的key，再对其进行遍历
 * T[P]就相当于Person[name]，也就等于string
` * 再对其添加只读readonly约束，返回一个新的对象类型
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```







## Record

### 示例

```typescript
type Person = {
    name: string,
    age: number,
    text: string
}

type t='i'|'k'|'u'|'n'

type woman = Recor<t, Person>

let objec:woman={
    i:{name:'cxk',age:66,text:'唱'},
    k:{name:'cxk',age:66,text:'跳'},
    u:{name:'cxk',age:66,text:'rap'},
    n:{name:'cxk',age:66,text:'篮球'}
}
```



### 从源码进行解读：

```typescript
type key = string | number | symbol

/**
 * 从 Person 中选择一组属性，其键位于并集 'age'|'name' 中
 * keyof T即为上面的key，
 * K extends keyof T表示K为T的子集，这样才能确保K中的属性名是T中存在的属性名
 * 这样才可以使用T[P]获取T中对应属性的类型
 * 然后进行遍历，最后返回新的对象类型
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

