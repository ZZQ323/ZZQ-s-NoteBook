
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

归并排序的基础是分治（二分），然后归并排序结果，两个部分谁小谁放在前面。
别忘了**最后复制到原数组上**{.color-orange}，否则白排序了。

归并排序有个副作用，就是**可以计算逆序对**{.color-blue}。
但切记逆序对的要求，是**严格大于**{.color-purple}。


```java
class Solution {
    final int MOD = (int)1e9+7;
    int[] nums;
    // 逆序对个数
    int count;
    // 归并排序
    public void mergeSort(int l, int r)
    {
        if(l>=r)return;
        int ln = r-l+1;
        int mid = l + (ln-1)/2;
        mergeSort(l,mid);mergeSort(mid+1,r);

        int[] temp = new int[ln+10];
        int i=l,j=mid+1,k=0;
        while(i<=mid && j<=r){
            if(nums[i]<=nums[j]){
                temp[k++]=nums[i++];
            }else {
                count = (int)((count+mid-i+1L)%MOD);
                temp[k++]=nums[j++];
            }
        }
        while(i<=mid){temp[k++]=nums[i++];}
        while(j<=r){temp[k++]=nums[j++];}

        // 拷贝
        int kk=0;
        for(int idx=l;idx<=r;idx++){nums[idx]=temp[kk++];}
    }

    public int minAdjacentSwaps(int[] nums, int a, int b) {
        this.nums = nums;
        for(int i = 0; i < nums.length; i++){
            if(nums[i] < a)nums[i] = 1;
            else if(nums[i] <=b)nums[i] = 2;
            else nums[i] = 3;
        }
        mergeSort(0, nums.length-1);
        return count;
    }
}
```


## 桶排序


## 选择排序


## 冒泡排序

