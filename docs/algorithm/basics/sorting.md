
# 排序板子

## 快速排序

[P1177 【模板】排序](https://www.luogu.com.cn/problem/P1177)

```C++
#include<iostream>
#include<algorithm>
using namespace std;
constexpr int N = 1e5 + 100;
int a[N];
void quick_sort(int q[], int l, int r)
{
    if (l >= r) return;
    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i++; while (q[i] < x);
        do j--; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j), quick_sort(q, j + 1, r);
}

int main(int argc, char const* argv[])
{
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; ++i)scanf("%d", a + i);
    quick_sort(a,1, n);
    for (int i = 1; i <= n; ++i)printf("%d ", a[i]);
    return 0;
}
```

## 归并排序

## 桶排序


## 选择排序


## 冒泡排序

