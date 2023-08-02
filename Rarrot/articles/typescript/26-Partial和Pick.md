# Partial和Pick

## Partial

### 示例

```typescript
type Person={
    name:string,
    age:number,
    text:string
}

/**
 * 此时p的类型为
    type p = {
        name?: string;
        age?: number;
        text?: string;
    }
 */
type p=Partial<Person>
```



### 从源码进行解读：

```typescript
type key='name'|'age'|'text'

/**
 * 将 T 中的所有属性设为只读
` * 这里T为Person，keyof Person即为上面的key，再对其进行遍历
 * T[P]就相当于Person[name]，也就等于string
 * 再对其添加可选?约束，返回一个新的对象类型
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```





## Pick

### 示例

```typescript
/**
 * 此时p2的类型为
    type p2 = {
        age: number;
    }
 */
type p2=Pick<Person,'age'>

/**
 * 此时p3的类型为
    type p3 = {
        name: string;
        age: number;
    }
 */
type p3=Pick<Person,'age'|'name'>
```



### 从源码进行解读：

```typescript
type key='name'|'age'|'text'

/**
 * 构造一个具有类型 T 的一组属性 K 的类型
 * keyof any即为上面的key，
 * K extends keyof any表示K为any的子集，这样才能确保K的类型可以是any允许的类型
` * 这样才可以传入不作类型限制的T
 * 然后进行遍历，最后返回新的对象类型
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```



