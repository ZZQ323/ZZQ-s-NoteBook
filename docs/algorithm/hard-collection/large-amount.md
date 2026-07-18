# 你会不会数数？

## 数字很多，但是数字不大。

### 3312. 查询排序后的最大公约数 [link](https://leetcode.cn/problems/sorted-gcd-pair-queries/)

读题发现两个难点，一个是 queries 很多，另一个是 queries 的值很大。
这两个问题导致很难正常进行枚举 $gcd$ ，因为正常暴力枚举是 $O(n^2)$，然后`new 1e10` 的 `int` 放 $gcd$ 也很变态。   

但是我们能注意到， $0\leq nums[i] \leq 5 * 10^{4}$，数字本身要比前两者力小很多。
那么问题转换成了，如何不进行枚举就能知道 $gcd$ 为v的个数，我们记作 `exact`。

单单只有 `exact[v]` 还是需要暴力 $gcd$ ，那是因为我们是对每个 `nums` 的数字 `x` 进行枚举才会这样。
所以我们不能对每个 `x` 这么操作，我们需要统计 `x` 有多少然后统一进行操作。
假设已知 `x` 有 `cnt[x]` 个，那么除了自身和自身产生的数，还有和其他 `y`、 `z` 会有 $gcd$ —— 这种处理办法能很好地减少计算个数。

但是，如果是 $0\leq nums[i] \leq 5 * 10^{4}$ 全部都列出来一遍呢？
这样操作依旧会 $O(n^2)$ 超时。

如果从代数基本定理出发，那么 $gcd$ 其实就是两个数幂次的交集，除掉不重复的部分。
如果从这些交集出发呢？也即每个数字 $p$ 都有可能是某对 `nums[i]`、`nums[j]`的交集，
而条件是$nums[i]=k_1 p$、$nums[j]=k_2 p$

而最大的GCD莫过于 $5 * 10^{4}$。所以？所以我们可以通过枚举可能的 $gcd$ ，用可能的 `nums[i]` 为它做贡献。
也即，统计数字 `x` 有多少个倍数。比如 16，是4也是2的倍数。

然后所有可能的倍数中，比如 3、6、12，他们有可能构成更大的 $gcd$；
比如 $gcd(6,12)=6$，那么就应当先计算出所有 $gcd(x,y)=6$ 的情况；
对于没有更大数字的时候，比如 12、15、18，就相当于 “3个里面取2个” 种情况得到 $gcd(x,y)=3$。

对于统计到的 $extract[gcd]$ ，搜索 $queries[i]$的数值：
1. 可以做减法看什么时候下标是负数
2. 也可以前缀和+二分，这里的gcd是递增的，所以可以二分。

这里虽然想到枚举因子但用的不是素数，是因为可能存在1、2、3、4等合数作为 $gcd$ 。

```java
public int[] gcdValues(int[] nums, long[] queries) {
        int numMax = 0;
        for (int x : nums) numMax = Math.max(numMax, x);
        int[] cnt = new int[numMax+10];
        for (int x : nums) cnt[x]++;

        // 有多少个数是 i 的倍数
        int[] multiples = new int[numMax+10];
        for(int v=1 ;v<=numMax;v++){
            for(int x=v;x<=numMax;x+=v){
                multiples[v] += cnt[x];
            }
        }

        long[] exact = new long[numMax + 2];
        for(int v=numMax;v>=1;--v){
            long m = multiples[v];
            long pairsGe = m*(m-1)/2;
            for(int x=2*v;x<=numMax;x+=v){
                pairsGe-=exact[x];
            }
            exact[v] = pairsGe;
        }

        // 前缀和排序
        long[] prefix = new long[numMax+10];
        for(int v=1;v<=numMax;v++){
            // 公因数为v的有多少个（按顺序）
            prefix[v] = prefix[v-1] + exact[v];
        }

        int[] gcdPairs = new int[queries.length];
        for(int i=0;i<queries.length;i++){
            // 查询第几个大
            long target = queries[i]+1L;
            int l=1,r=numMax;
            while(l<r){
                int mid = (l+r) >> 1;
                if(prefix[mid] < target)l=mid+1;
                else r=mid;
            }
            gcdPairs[i] = l;
        }

        return gcdPairs;
    }
```



