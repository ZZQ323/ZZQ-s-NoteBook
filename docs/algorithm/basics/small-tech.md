# 高频预处理方案（未分类）

## 前缀、后缀和

### 【母题】移动数位的前缀和 [3756. 连接非零数字并乘以其数字和 II](https://leetcode.cn/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/description/)

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

### 【母题】打断点  [3660. 跳跃游戏IX](https://leetcode.cn/problems/jump-game-ix/description/)

<!-- LC768「最多能完成排序的块 II」 -->

::: details
- 仅当 nums[j] > nums[i] 时，才允许跳跃到下标 j，其中 j < i。
- 对于每个下标 i，找出从 i 出发且可以跳跃任意次，能够到达 nums 中的 最大值 是多少。
:::

这道题目的意思就是：“向右边走变小”，而从大跳到小是为了变得更大（也就是先向右然后向左）。
这道题目最直观的模拟就是“考虑最大的右边，然后考虑第二大的右边 …… ”。

无论是`双指针`、`单调栈`、还是`索引重排`去处理最大值，虽然面对一般的数据可以通过减少问题的方式来趋近 $O(n)$，但是在最坏的情况下还是 $O(n^2)$（比如全单调的数组：1,2,3,4, ……10000）。  
从两个例子的情况去看，这个图其实应该是个森林，但如果盲目地去构建这个图将会使得复杂度飞起来。


```java
// 试图使用双指针找连接
class Solution {
    int[] fa;
    int find(int x){
        if(fa[x]==x)return  x;
        return  fa[x] = find(fa[x]);
    }
    class pair{
        int l, r;
        public int minId;
        pair(int l, int r){
            this.l = l;
            this.r = r;
        }
    }
    pair[] pi;
    public int[] maxValue(int[] nums) {
        // 向后走变小、向前走变大
        // 取最大就是：先向后，然后向前
        fa = new int[nums.length];
        pi = new pair[nums.length+10];
        int[] ret = new int[nums.length];
        for(int i=0;i<nums.length;i++) {
            fa[i]=i;
        }
        int cnt=0;
        {
            int l=0,r=l+1;
            int minId = l;
            //  区间最大
            while( r<nums.length ){
                if(nums[r] <= nums[l]){
                    fa[r]=find(l);
                    if(nums[minId] > nums[r]){
                        minId = r;
                    }
                }else{
                    pi[++cnt]=new pair(l,r-1);
                    pi[cnt].minId =minId;
                    minId=l=r;
                }
                ++r;
            }
            pi[++cnt]=new pair(l,r-1);
            pi[cnt].minId =minId;
        }
        // 区间 最大-最小 联系
        for(int i=1;i<cnt;i++) {
            for(int j=cnt;j>i;j--) {
                if( nums[pi[i].l] > nums[pi[j].minId]) {
                    fa[pi[i].l] = find(pi[j].l);
                    break;
                }
            }
        }
        for(int i=0;i<nums.length;i++){
            ret[i]=Math.max(nums[find(i)],nums[i]);
        }
        return ret;
    }
}
```

```java
// 试图使用重排之后的索引查找，但是逻辑不够完善
class Solution {
    int[] fa;
    Integer[] idx;
    int find(int x){
        if(fa[x]==x)return  x;
        return  fa[x] = find(fa[x]);
    }
    public int[] maxValue(int[] nums) {
        // 向后走变小、向前走变大
        // 取最大就是：先向后，然后向前
        fa = new int[nums.length];
        idx = new Integer[nums.length];
        int[] ret = new int[nums.length];
        for(int i=0;i<nums.length;i++) {
            fa[i]=i;
            idx[i]=i;
            ret[i] = nums[i];
        }
        // 根据值倒序排序
        Arrays.sort(idx,(a,b)-> -Integer.compare(nums[a],nums[b]) );
        //  大到小
        for(int i=0;i<nums.length;i++) {
            if( idx[i]!=nums.length-1-i ){
                for(int j=i+1;j<nums.length;j++) {
                    if(fa[idx[j]] == idx[j] && idx[i] < idx[j]){
                        fa[idx[j]] = find(fa[idx[i]]);
                    }
                }
            }
        }
        for(int i=0;i<nums.length;i++) {
            ret[i] = Math.max(ret[i],nums[find(i)]);
        }
        return ret;
    }
}
```

重新观察题目的描述，从排序的角度出发，其实是“逆序对”；任意一对**逆序对 $(i,j)$**{.color-blue} 都会在 $i$、$j$ 之间产生**一条无向边**{.color-blue}。
但仅仅观察到这一点是不够的，因为之前考虑过的所有方法，**用他们去建图亦或是并查集**{.color-red}，也是 $O(n^2)$。

整个问题就转化成了：==把下标按"是否存在逆序对连接"分成若干连通块==，而每个连通块内所有下标的答案都等于块内的最大值。  

如果是按照图的思想去模拟，那么肯定是没办法做出来的，但是如果按照数组分块的角度去考虑呢？
数组分块的特点是“连续”，而从逆序对连接的规则来看，主要有两种情况：
1. 一种是“森林”，也即前面的最大值都无法向后跳跃，从而获取不到最大值，比如`2 1 5 3 4`，形成一个2为根的树和5为根的树
2. 一种则只是“树”，前面的可以向后跳跃，然后获得后面的最大值，比如 `2 3 1`
3. 如果有多个最大值，那么**就会根据能不能连接得**{.color-blue}到一个树或者一篇森林，而这样的**树和森林都必然是连续**{.color-red}的；

所以我们能思索得出，如果我们能比较任意点 $i$ 前面一片的最大值`prefixMax[i]`，以及点后面一片的最小值`suffixMin[i+1]`，并且满足`prefixMax[i]<suffixMin[i+1]`，那么**一定不能进行连接**{.color-red} —— 反之就用整个区间的 `prefixMax[i]` 对区间进行填充。

```java
class Solution {
    int[] prefixMax;
    int[] suffixMin;

    public int[] maxValue(int[] nums) {

        prefixMax = new int[nums.length];
        Arrays.fill(prefixMax,0);
        suffixMin = new int[nums.length];
        Arrays.fill(suffixMin,Integer.MAX_VALUE);

        int[] ret = new int[nums.length];

        ret[0] = prefixMax[0] = nums[0];
        for(int i = 1; i < nums.length; i++){
            prefixMax[i] = Math.max(prefixMax[i-1], nums[i]);
            ret[i] = nums[i];
        }
        suffixMin[nums.length-1] = nums[nums.length-1];
        for(int i=nums.length-2; i>=0; i--){
            suffixMin[i] =  Math.min(suffixMin[i+1], nums[i]);
        }

        int beg = 0;
        for(int i=0; i<nums.length-1; i++){
            if (prefixMax[i] <= suffixMin[i+1]) {
                for(int j=beg; j<i+1; j++){
                    ret[j] = prefixMax[i];
                }
                beg = i+1;
            }
        }
        for(int i=beg; i<nums.length; i++){
            ret[i] = Math.max(prefixMax[nums.length-1], nums[i]);
        }

        return ret;
    }
}
```

## 单调栈

### 带约束的单调栈构造 [1081. 不同字符的最小子序列](https://leetcode.cn/problems/smallest-subsequence-of-distinct-characters/description/)

相同：[316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/description/)

:::info
返回 s 字典序最小的，该子序列包含 s 的所有不同字符，且只包含一次。
:::

一道很怪的单调栈，本质上是利用单调栈的单调性，以及最右边界的约束去构造子序列。


```java
class Solution {
    int[] rurest;
    public String smallestSubsequence(String s) {
        rurest=new int[30];

        Set<Character> set=new HashSet<>();
        for(int i=0;i<s.length();i++){
            int idx = s.charAt(i)-'a';
            set.add(s.charAt(i));
            rurest[idx]= Math.max(rurest[idx],i);
        }

        Deque<Integer> stack = new LinkedList<>();
        boolean[] visited=new boolean[30];
        for(int i=0;i<s.length();i++){
            while( !stack.isEmpty()
                    // 严格递增，不允许有重复的
                    && s.charAt(i)<=s.charAt(stack.peek())
                    // 边界收束，防止筛选的太猛了，把其他字符给漏了
                    && rurest[s.charAt(stack.peek())-'a']>=i
                     // 防止你他妈把我配好的最小字典序的给替换了
                    && visited[s.charAt(i)-'a']==false
            ){
                char curCh = s.charAt(stack.pop());
                visited[curCh-'a']=false;
            }
            if( visited[s.charAt(i)-'a']==false ){
                stack.push(i);
                visited[s.charAt(i)-'a']=true;
            }
        }

        StringBuilder sb=new StringBuilder();
        while(!stack.isEmpty()){
            char ch = s.charAt(stack.pop());
            sb.append(ch);
        }
        return sb.reverse().toString();
    }
}
```

## 逆序对个数

### 处理过后的逆序对 3994. 划分数组的最少相邻交换次数 [link](https://leetcode.cn/problems/minimum-adjacent-swaps-to-partition-array/submissions/736768386)
:::info
给你一个整数数组 nums 和两个整数 a 和 b，满足 a < b。
如果一个数组可以按顺序分成三个 连续 的部分，并且满足以下条件，则称其为 好数组：
    1. 第一部分中的每个元素都 小于 a。
    2. 第二部分中的每个元素都 在 闭区间 [a, b] 内。
    3. 第三部分中的每个元素都 大于 b。
这三个部分中的任意一个都 可以 为空。
在一次 相邻交换 中，你可以交换 nums 的两个 相邻 元素。
返回使 nums 成为好数组所需的 最少 相邻交换次数。由于答案可能非常大，请将其对 $10^9 + 7$ 取余 后返回。
:::

这题可以注意到，**本质上可以讲数组分成三个数“1、2、3”，因为在区间内的数无关先后**{color-red}。
因为这一步本质上是在找多少个逆序对，然后按照冒泡排序的方式去进行统计。

那么逆序对的个数与移动次数是否有必然的关系呢？其实是有的。
因为逆序对本身要求前面的数比后面的大，所以：
1. 如果最小的数在最大的位置，那么意味着它与剩下所有的数字都构成逆序对
2. 如果数字 `x` 前面只有一个逆序对，**那么就只有一个 `y`是大于它的，并且一定是挨着的**{color-purple}！！！否则就会有更多逆序对，这种情况下也只需要交换这么一下就好。

基于这种性质，我们能知道，统计逆序对，就能快速统计到所有的交换次数。

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



