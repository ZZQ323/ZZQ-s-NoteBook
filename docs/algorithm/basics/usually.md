# 常用工具与语法块（java版）

## 重载排序函数

认识二维函数与 `Comparator`

```java
int[][] edges = {{3, 4}, {1, 2}, {2, 5}};
// 三种参考写法
Arrays.sort(edges, (a, b) -> a[0] - b[0]);
Arrays.sort(edges, (a, b) -> Integer.compare(a[0], b[0]));
Arrays.sort(edges, Comparator.comparingInt(a -> a[0]));
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

## 索引重排

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

3. 使用record 特性

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
