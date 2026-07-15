# 分块方法

## 打断点


### 母题1    [3660. 跳跃游戏IX](https://leetcode.cn/problems/jump-game-ix/description/)

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















