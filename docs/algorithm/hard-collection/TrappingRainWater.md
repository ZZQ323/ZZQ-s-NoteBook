# 接雨水

顺序	题目	用来建立什么直觉
1. 	LC 496 / 503. 下一个更大元素	单调栈进阶（含循环数组），巩固"栈里存的是下标不是值"
2. 	LC 42. 接雨水本身	建议按 暴力→前缀后缀数组→双指针→单调栈 的顺序自己写四遍
3. （进阶）	LC 407. 接雨水 II	三维版本，需要用小根堆+BFS，做完二维版再挑战

## 双指针贪面积

### LC11 盛最多水的容器 [link](https://leetcode.cn/problems/container-with-most-water/description/)

:::info
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 $(i, 0)$ 和 $(i, height[i])$ 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
**返回容器可以储存的最大水量**{.color-red}。
:::

![](../../asset/docs/algorithm/hard-collection/TrappingRainWater.md/LC11bucket.png)

传统方法是双循环遍历，找到面积最大的部分，但是数据量不允许，而且暴力方法很难剪枝。   
通过观察，如果较大的边在边上，那么它将拥有最长的宽以及较大的长 —— 面积自然是最大的。   
但是如果较大的两个边移动到了中间，那么该怎么办呢？我们可以用双指针夹这个图形 —— **毕竟宽长，整体面积就容易大**{.color-blue}，但是难以判断有没有更大的。
移动指着指针的依据呢？最简单的还是贪心，看看往中间移动的两个边是不是比我现在的两个边大，那么我才决定移动不移动。
```java
class Solution {
    int[] height;
    int calc(int l,int r)
    {return Math.min(height[r],height[l])*(r-l);}
    public int maxArea(int[] height) {
        this.height = height;
        int l=0,r=height.length-1;
        int ans = calc(l,r);
        while(l<r){
            if(height[l]<height[l+1])++l;
            else if(height[r]<height[r-1])--r;
            else {
                ++l;
                --r;
            }
            ans = Math.max(ans,calc(l,r));
        }
        return ans;
    }
}
```

但是这份代码会被这个数据卡住：`height = [3,6,1]`。  
原因是移动的顺序，如果我们先移动了左指针，那么我们就只能得到面积为1的小正方形，而得不到先移动右指针得到面积为3的长方形。
那么这里修改贪心的标准 —— 转而移动较小的一边，**如果较小的一边能优先变大，那么整体的提升也会更大（木桶效应）**{.color-purple}。

```java
class Solution {
    int[] height;
    int calc(int l,int r)
    {return Math.min(height[r],height[l])*(r-l);}

    public int maxArea(int[] height) {
        this.height = height;
        int l=0,r=height.length-1;
        int ans = calc(l,r);
        while(l<r){
            if(height[l]>height[r])--r;
            else ++l;
            ans = Math.max(ans,calc(l,r));
        }
        return ans;
    }
}
```

然后AC。这一题告诉我们：
1. 求面积先从两侧开始，因为两侧的时候宽是固定最长的，然而长边可能藏在中间
2. 优先提升短板，能整体提升更多

## 单调栈

### LC84 柱状图中最大的矩形 [link](https://leetcode.cn/problems/0ynMMM/) 

相同：[LCR 039](https://leetcode.cn/problems/0ynMMM/description/)

:::info
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。
:::

首先还是求面积，所以我们还是需要考虑尽可能宽，但其次呢这一次是从相邻的地方考虑的，因为要考虑连续的数组对高度的限制。
所以我们不能从两侧开始取，因为你再长结果高度都是1，甚至是0，那就难受了。   

![](../../asset/docs/algorithm/hard-collection/TrappingRainWater.md/LC84.png)

那么呢，根据这个样例，其实能感觉到这个东西和临近点相关的这么一种做法。
但是最关键的，这个东西还是跟极小值相关。这里注意是极小值而不是最小值，极值是区域性的，最值是全局的。
所以不能采用前缀后缀的做法，光是一堆0都够让人头大的了，一堆0会让算法退化成 $O(n^2)$。  
dp？dp选出来的点是间断的。  

![](../../asset/docs/algorithm/hard-collection/TrappingRainWater.md/LC84_1.png)
![](../../asset/docs/algorithm/hard-collection/TrappingRainWater.md/LC84_2.png)

目前的话只能想到单调栈了，根据用例的图示，我脑补了怎么取出最大值的动画。

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int ans = 0;
        for(int i=0;i<heights.length;i++){
            int nmin = heights[i];
            while(!stack.isEmpty() && heights[i] >= heights[stack.peek()]){
                int idx = stack.pop();
                nmin =  Math.min(nmin,heights[idx]);
                ans = Math.max(ans, (i-idx+1)*nmin);
            }
            ans = Math.max(ans,heights[i]);
            stack.push(i);
            if(heights[i]==0){
                stack.clear();
            }
        }

        stack.clear();
        for(int i=heights.length-1;i>=0;i--){
            int nmin = heights[i];
            while(!stack.isEmpty() && heights[i] >= heights[stack.peek()]){
                int idx = stack.pop();
                nmin =  Math.min(nmin,heights[idx]);
                ans = Math.max(ans,(idx-i+1)*nmin);
            }
            ans = Math.max(ans,heights[i]);
            stack.push(i);
            if(heights[i]==0){
                stack.clear();
            }
        }
        return ans;
    }
}
```

这种肯定是不行的，你要是什么都依赖从小到大的出栈入栈的话，就很难处理 $[999,999,999,999,]$ 数组，以及很多间隔0的那种。
这种臆测只是根据局部的小+大来实现的，不够。   

但是反过来想的话，单调栈本身的性质是保证单调，那么单调栈内部的值，是不是就是说一定能保证“比你大”、“比你小”呢？
[最短上升序列]()就是直接对这个单调性进行操作。   

那么这里，如果极小值是重点，那么我们为什么不在每一个点处维护一个递增栈呢？
这样能保证周围的比它大，那么它就是极小值，就可以单向或者双向扩展。
如果不能呢？那就说明本身就是极大值。

怎么能保证它是能比较 “宽矮” 以及 “高瘦” 呢？宽矮本质上就是极小值的双向扩展，高瘦就是极大值不进行扩展。
所以就做出来了，这道题提示我们要学会利用单调栈的单调性来判断极值。

```java
class Solution {
    int[] toLurest,toRurest,heights;

    public int largestRectangleArea(int[] heights) {
        this.heights = heights;
        toLurest = new int[heights.length];
        toRurest = new int[heights.length];
        for(int i=0;i<heights.length;i++){
            toLurest[i] = i;
            toRurest[i] = i;
        }
        Deque<Integer> stack = new ArrayDeque<>();
        for(int i = 0; i < heights.length; i++){
            while(!stack.isEmpty() && heights[i]<=heights[stack.peek()]){
                int idx = stack.pop();
                toLurest[i] = Math.min(toLurest[i], toLurest[idx]);
            }
            stack.push(i);
        }
        stack.clear();
        for(int i = heights.length-1; i >= 0 ; --i){
            while(!stack.isEmpty() && heights[i]<=heights[stack.peek()]){
                int idx = stack.pop();
                toRurest[i] = Math.max(toRurest[i], toRurest[idx]);
            }
            stack.push(i);
        }

        int ans = 0;
        for(int i=0; i < heights.length ;i++){
            ans = Math.max(ans,heights[i]*(toRurest[i]-toLurest[i]+1));
        }
        return ans;
    }
}
```

## 最后一击

延续之前的逻辑，我们能知道可以通过单调性去维护

```java
class Solution {
    int[] toLurest,toRurest,height;

    public int trap(int[] height) {
        this.height = height;
        toLurest = new int[height.length];
        toRurest = new int[height.length];
        Deque<Integer> stack = new ArrayDeque<>();

        for(int i=0;i<height.length;i++){
            toLurest[i]=i;
            toRurest[i]=i;
        }

        for(int i = 0; i < height.length; i++){
            int nmax=0;
            while(!stack.isEmpty() && height[i]<=height[stack.peek()]){
                int idx = stack.pop();
                nmax = Math.max(nmax,height[idx]);
                if(height[idx]>=nmax){
                    toLurest[i] = Math.min(toLurest[i],toLurest[idx]);
                }
            }
            stack.push(i);
        }

        stack.clear();
        for(int i=height.length-1;i>=0;i--){
            int nmax=0;
            while(!stack.isEmpty() && height[i]<=height[stack.peek()]){
                int idx = stack.pop();
                nmax = Math.max(nmax,height[idx]);
                if(height[idx]>=nmax) {
                    toRurest[i] = Math.max(toRurest[i], toRurest[idx]);
                }
            }
            stack.push(i);
        }
        int ans = 0;
        for(int i=0;i<height.length;i++){
            if(toLurest[i]!=i && toRurest[i]!=i){
                int l=toLurest[i],r=toRurest[i];
                int level = Math.min(height[l],height[r]);
                while(level>height[i] && l+1<r){
                    while(height[l+1]>=level )++l;
                    while(height[r-1]>=level )--r;
                    ans += (r-l-1);
                    --level;
                }
            }
        }
        return ans;
    }
}
```




```java
class Solution {
    int[] height;
    public int trap(int[] height) {
        this.height = height;
        Deque<Integer> stack = new ArrayDeque<>();
        int ans = 0;
        for(int i = 0; i < height.length; i++){
            while(!stack.isEmpty() && height[i] > height[stack.peek()] ){
                int bottom = stack.pop();
                if(stack.isEmpty())break;
                int left = stack.peek();
                int bounded = Math.min(height[left], height[i]) - height[bottom];
                int width = i - left - 1;
                ans += width * bounded;
            }
            stack.push(i);
        }
        return ans;
    }
}
```
