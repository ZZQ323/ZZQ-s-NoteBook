# 搜索

## 一般搜索

为什么需要搜索 —— 问题的回答很简单，因为你需要一个任意层数的for。   
举个例子，如果你需要凭空产生无限个来自某个字符串的子序列并匹配去搜索它，那么你就需要搜索。

- [++1++, 2, 3, 4]
- [1, 2, 3, ++4++]
- [1, ++2++, ++3++, 4]
- [1, ++2++, ++3++, ++4++]
- [1, 2, ++3++, ++4++]
- [++1++, 2, 3, ++4++]
- [++1++, ++2++, 3, 4]

搜索只需要关心起点与终止条件，并且根据不同的方式找到不同的搜索方式。  
同时需要注意搜索深度，一般数据量在几十到几百的时候是适合搜索的，但是4位数往上就不合适了 —— 你也应当考虑数据结构辅助而不是盲目的搜索。

从搜索逻辑上讲，一般有这么几种

1. 针对一个序列选和不选（**产生子序列**{.color-orange}），这种的复杂度是 $2^n$
    ```java
    void DFS(int pos, Deque<Integer> deque) 
    {
        if (pos >= nums.length) {
            // 若 deque 非空才处理（空集不存）
            if (deque.size()>0) {
                // 计算 gcd
                int gcd = 0;
                for (int idx : deque) {
                    gcd = (gcd == 0) ? nums[idx] : GCD(gcd, nums[idx]);
                }
                // 保存子序列的副本（作为 List）
                List<Integer> subset = deque.stream().toList();
                // 存入 buffer（注意 buffer[gcd] 要先初始化为 ArrayList）
                buffer[gcd].add(subset);
            }
            return;
        }
        // 不选当前元素
        DFS(pos + 1, deque);
        // 选当前元素
        deque.push(pos);
        DFS(pos + 1, deque);
        deque.pop(); // 回溯
    }
    ```

2. 针对**两个不互相重复**{.color-orange}的序列，这种的复杂度是 $3^n$
    ```java
    class Solution {
        public int GCD(int a, int b) {
            // 欧几里得算法：gcd(a, b) = gcd(b, a % b)
            return b == 0 ? Math.abs(a) : GCD(b, a % b);
        }
        final int mod = (int)(1e9 + 7);
        int[] nums;
        int[][][] dp; // 记忆化
        int DFS(int pos, int gcd1,int gcd2)  {
            if (pos >= nums.length) {
                if(gcd1==0 && gcd2==0) return 0;
                else return gcd1==gcd2?1:0;
            }
            if(dp[pos][gcd1][gcd2]!=-1)
                return dp[pos][gcd1][gcd2];
            int sum = 0;
            // 不选当前元素
            sum = ( sum+DFS(pos + 1, gcd1, gcd2) )%mod;
            // 到 gcd1
            sum = ( sum+DFS(pos+1, GCD(nums[pos],gcd1),gcd2) )%mod;
            // 到 gcd2
            sum = ( sum+DFS(pos+1, gcd1,GCD(nums[pos],gcd2)) )%mod;
            return dp[pos][gcd1][gcd2]=sum;
        }
        public int subsequencePairCount(int[] nums) {
            this.nums = nums;
            dp = new int[nums.length][210][210];
            for(int i=0;i<nums.length;i++){
                for(int j=0;j<210;j++){
                    Arrays.fill(dp[i][j], -1);
                }
            }
            return DFS(0, 0,0);
        }
    }
    ```

3. 
