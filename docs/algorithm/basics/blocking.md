# 分块方法

## 如何统计

### 3499. 操作后最大活跃区段数 I [link](https://leetcode.cn/problems/maximize-active-section-with-trade-i/description/)

题目允许**最多一次的打包执行**{.color-purple}的动作：
1. 将一个被 '0' 包围的连续 '1' 区块转换为全 '0'。
2. 然后，将一个被 '1' 包围的连续 '0' 区块转换为全 '1'。

然后问如果能操作的话，那么字母`'1'`最多多少个？

其实就是统计0的个数，因为0是一定可以被转换的（外面包夹两个1）。
而且因为先0包着1，然后1包着0 —— 这个东西本质上就是消化掉了中间的1，然后联通了两个间断的0，这些0全部变成了新增的部分。

那么问题其实可以转换成，如果给你那么多连续的0（断开的部分就是1嘛），那么**你最多能联通多少**{.color-blue}？
联通的0区块的个数，就是答案增加的个数。

```java
class Solution {
    public int maxActiveSectionsAfterTrade(String s) {
        int ans= 0;
        for(int i=0;i<s.length();i++){
            if(s.charAt(i)=='1'){
                ans++;
            }
        }
        String[] cur = Arrays.stream(s.split("1+")).filter(ele -> !ele.equals("") ).toArray(String[]::new);
        int tmp = 0;
        if(cur.length==1){ return  ans;}
        for(int i = 0; i+1 < cur.length; i++){
            tmp = Math.max(tmp,cur[i].length()+cur[i+1].length());
        }
        return ans+tmp;
    }
}
```

之前写了个很复杂的状态机，当时我以为是“1最大连续长度”，问了AI才发现理解错了 …… 

```java
class Solution {
    public int maxActiveSectionsAfterTrade(String s) {
        int ans = 0;
        int l=0,r=0;

        int tmp = 0;
        for(int i=0;i<s.length();i++){
            if(s.charAt(i)=='1'){
                ++tmp;
            }
            ans = Math.max(ans,tmp);
        }
        ans = Math.max(ans,tmp);
        int cnt1=0,cnt2=0,cnt3=0,cnt4=0,cnt5=0;

        while(r<s.length() && s.charAt(r)=='1')++r;
        if( r == s.length() )return s.length();
        cnt1 = r-l;l=r;

        while(r<s.length() && s.charAt(r)=='0')++r;
        cnt2 = r-l;l=r;
        if( r == s.length() )return ans;

        while(r<s.length() && s.charAt(r)=='1')++r;
        cnt3 = r-l;l=r;
        if( r == s.length() )return ans;

        while(true){
            if(cnt4 !=0 && cnt5 !=0){
                cnt1=cnt3;
                cnt2=cnt4;
                cnt3=cnt5;
            }
            while(r<s.length() && s.charAt(r)=='0')++r;
            cnt4 = r-l;l=r;
            if( r == s.length() ){
                ans =  Math.max(ans,cnt1+cnt2+cnt3+cnt4);
                break;
            }

            while(r<s.length() && s.charAt(r)=='1')++r;
            cnt5 = r-l;l=r;
            ans =  Math.max(ans,cnt1+cnt2+cnt3+cnt4+cnt5);
            if( r == s.length() )break;
        }
        return ans;
    }
}
```






