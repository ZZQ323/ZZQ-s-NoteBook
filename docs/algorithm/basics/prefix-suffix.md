# 前缀后缀和

## 3756. 连接非零数字并乘以其数字和 II [link](https://leetcode.cn/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/description/)

:::info
输入： s = "10203004", queries = [[0,7],[1,3],[4,6]]
输出： [12340, 4, 9]
解释：
    s[0..7] = "10203004"
        x = 1234
        sum = 1 + 2 + 3 + 4 = 10
        因此，答案是 1234 * 10 = 12340。
    s[1..3] = "020"
        x = 2
        sum = 2
        因此，答案是 2 * 2 = 4。
    s[4..6] = "300"
        x = 3
        sum = 3
        因此，答案是 3 * 3 = 9。
:::

这一题主要的问题在于 s.length 和 queries 太多。
1. s.length变成真实数字的时候会正溢出变成负数 —— 但其实对于一个要求计算mod的题目溢出是一定会溢出的，但int的溢出是以 2147483648 为 mod的溢出，就会导致结果不一致。
2. queries太多会导致反复查询 $O(n^2)$ ，除了结合数据结构，那么就是把结果以某种形式存起来。

结合样例的意思，我们能知道，就是对一段string进行去零转化成真实的十进制数字，然后求和，最后求乘积。
那么对于乘积，其实有前缀和这个工具。

然而，对于**真实的十进制数字似乎不能直接进行相减**{.color-blue}。
但是！！如果我们按顺序从左往右看数字（也就是左边是最高位）的话。
以 `9876543210` 为例，那么我们在遍历到 `987` 和 `98765`的时候，我们可以先让两个数进行对齐 `98700`  `98765`，然后进行相减。

但是怎么知道对齐多少呢？因为也有可能是 `90008007060543000210`，除了直接存储对方的幂次，还可以数有多少个**非零数字**{.color-purple}。
然后两者非零数字的差，就是需要补充的0的个数。

```java

class Solution {
    final int MOD = (int)1e9 + 7;
    public int[] sumAndMultiply(String s, int[][] queries) {
        int ln = s.length();
        int[] preSum = new int[ln+10];         // 前缀和
        int[] preCon = new int[ln+10];         // 直接连接出来的十进制数字
        int[] noneZeroCnt = new int[ln+10];       // 统计非 0数字

        // 幂表
        int[] pow10 = new int[ln + 10];
        pow10[0] = 1;
        for (int i = 1; i <= ln; i++) pow10[i] = (int)(1L*pow10[i-1] * 10% MOD) ;

        for(int i = 1; i <= ln; i++){
            int curNum = s.charAt(i-1)-'0';
            preSum[i] = preSum[i-1] + curNum;
            if(curNum>0) {
                noneZeroCnt[i] = noneZeroCnt[i-1]+1;
                preCon[i] = (int)((1L*preCon[i-1]*10%MOD + curNum)%MOD);
            }else{
                noneZeroCnt[i] = noneZeroCnt[i-1];
                preCon[i] = preCon[i-1];
            }
        }

        int[] ret = new int[queries.length];
        for(int i=0;i<queries.length;i++){
            int l = queries[i][0]+1;
            int r = queries[i][1]+1;

            int times = noneZeroCnt[r]-noneZeroCnt[l-1];
            int num = (int)((preCon[r]-1L*preCon[l-1]*pow10[times]%MOD+MOD)%MOD);
            int sum = (preSum[r]-preSum[l-1]+MOD)%MOD;
            ret[i] = (int)(1L*num*sum%MOD);
        }
        return ret;
    }
}
```

