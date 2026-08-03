# 排列与组合

## 高中知识复习

### 概念

[collection](https://blog.csdn.net/cyqiang2008/article/details/121194353?fromshare=blogdetail&sharetype=blogdetail&sharerId=121194353&sharerefer=PC&sharesource=&sharefrom=from_link)


- 排列（Permutation）：有序。选出来的元素，谁前谁后算不同结果。
    例如：从 {A, B, C} 选 2 个排队，AB 和 BA 是两种。   
    $A_n^k=\frac{n!}{(n-k)!}$
- 组合（Combination）：无序。选出来就行，顺序无所谓。  
    例如：从 {A, B, C} 选 2 个握手，AB 和 BA 是同一种。  
    $C_n^k=\frac{n!}{k!(n-k)!}=\frac{A_n^k}{A_k^k}$
- 性质
    $C_n^k=C_n^{n-k}$  
    $C_n^{k-1}+C_n^k=C_{n+1}^{k}$  
    $\sum_{i=0}^{n}C_n^i=2^n$

### 常见习题

[collection](https://www.luogu.com.cn/article/scd9df0r)

1. 从 8 名学生中挑选 1 人搬东西，挑选 1 人帮老师接水，挑选 1 人接送老师，共有几种不同方案？
2. 有 3 个苹果和 3 个香蕉，现在选择 2 个苹果和 2 个香蕉，每天吃一个水果，问有多少种安排方法。


