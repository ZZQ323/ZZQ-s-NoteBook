# 常用工具与语法块（java版）

## 排序的使用

### 重载排序函数

认识二维函数与 `Comparator`

```java
int[][] edges = {{3, 4}, {1, 2}, {2, 5}};
// 三种参考写法
Arrays.sort(edges, (a, b) -> a[0] - b[0]);
Arrays.sort(edges, (a, b) -> Integer.compare(a[0], b[0]));
Arrays.sort(edges, Comparator.comparingInt(a -> a[0]));
```

如果 `a[0] - b[0]` 返回0就继续比较呢？似乎不够满足更多的要求。

1. Lambda 手动判断
    
    Java 是强类型静态语言，一切表达式都必须有明确的类型。箭头函数本身没有类型，它只能出现在函数式接口（只有一个抽象方法的接口） 的上下文里，由编译器推断目标类型。箭头函数在JavaScript很多，因为随时创建没有模子的对象，这是两种语言很深刻的区别。
```java
Arrays.sort(edges, (a, b) -> {
    if (a[0] != b[0]) {
        return Integer.compare(a[0], b[0]);   // 先按第一个元素
    } else {
        return Integer.compare(a[1], b[1]);   // 第一个相同，按第二个元素
    }
});
```

2.  Comparator.comparingInt 链式调用
```java
Arrays.sort(edges, Comparator.comparingInt((int[] a) -> a[0])
            .thenComparingInt(a -> a[1]));
```

3. Java 8 之前匿名内部类
    
    看起来很诡异，但其实写的最明白，直接传入一个比较的对象来给标准对象用，C++的STL也是可以用和这个方式重载的
    ```java
    Arrays.sort(edges, new Comparator<int[]>() {
        public int compare(int[] a, int[] b) {
            if (a[0] != b[0]) return a[0] - b[0];
            else return a[1] - b[1];
        }
    });
    ```

### 索引重排

有的时候原数组是乱的，但是我们被强制要输出原索引，这个时候排序就不能直接修改原数组了。
主要有几种方法：

1. 值作为索引比较其他数组

```java
int[] idx_rearrange(int[] nums){
    // 1. 创建一个存放索引的 Integer 数组
    int[] idx = new int[nums.length];
    for (int i = 0; i < nums.length; i++) idx[i] = i;
    
    // 2. 按 nums 中的值对索引进行排序
    Arrays.sort(idx, (a, b) -> Integer.compare(nums[a], nums[b]));

    return idx;
}
```

2. 类似第一种但写成2维数组，并且只对其中一个维度排序

```java
int[] idx_rearrange(int[] nums){
    // 1. 构建二维数组，第二维存 [数值, 索引]
    int[][] pair = new int[nums.length][2];
    for (int i = 0; i < nums.length; i++) {
        pair[i][0] = nums[i];  // 数值
        pair[i][1] = i;        // 原始索引
    }

    // 2. 按数值升序排序（如果数值相同，可以再按索引排，保证稳定性）
    Arrays.sort(pair, (a, b) -> {
        if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
        return Integer.compare(a[1], b[1]);
    });
}
```

3. 使用 record 特性

    record是一种特殊类，专为不可变数据载体设计，并且只能这么写。

```java
// 定义 Record（或 class）
record Node(int value, int index) {}
int[] idx_rearrange(int[] nums){
    Node[] nodes = new Node[nums.length];
    for (int i = 0; i < nums.length; i++) {
        nodes[i] = new Node(nums[i], i);
    }
    Arrays.sort(nodes, (a, b) -> Integer.compare(a.value(), b.value()));
}
```


## 集合框架

主要是在new的时候看，选择用什么，以及为什么。
很简单的一点就是：`new类而不是new接口`

![集合框架](collection-in-one.png)

## new后初始化

基本类型自动被填充，包装器就多一步 `Arrays.fill`。

```java
boolean[] vis = new boolean[nums.length];  // 所有元素初始为 false

Boolean[] vis = new Boolean[nums.length];
Arrays.fill(vis, Boolean.FALSE);   // 全部设为 false
// 或 Arrays.fill(vis, true);      // 自动装箱为 Boolean.TRUE
```

## 模拟STL

### 模拟stack

栈方法：push(e), pop(), peek()
类：ArrayDeque, LinkedList, Dequeue 都可以

```java
Deque<Integer> stack = new ArrayDeque<>();
//  递增栈
for(int i=0;i<nums.length;i++){
    while(!stack.isEmpty() &&  nums[i] >= stack.peek() ){
        stack.pop();
    }
    stack.push(nums[i]);
    ret[i] = Math.max(ret[i],stack.getLast());
}
```






