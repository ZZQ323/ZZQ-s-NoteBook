
# 区间处理
ref：[OI-WIKI](https://oi-wiki.org/misc/two-pointer/#%E5%9C%A8%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8%E4%B8%AD%E6%89%BE%E7%8E%AF)

## 双指针

### 前后指针

#### 桶计数1 

[438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/)
:::info
- 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
- 异位词就是原字符串p字母的重排，也即字符对应字符数一样即可。
:::

这个题其实没有什么难点，主要是对双指针移动细节的处理。
直觉上的处理方案就是：
1. 左边的字符多了就去掉左边的
2. 右边的字符少了就加上这个右边的
3. 越界不要移动
   
但有的时候其实是中间字符的多或者少，那么这个时候，应当强制移动来打破平衡；
由题目要求可知，如果这个起始点分别满足而两端不满足，其实无论右边界如何拓展都无法满足（移动了就打破右边字符的个数，不移动死循环）。

那么这个时候这个起始点的左边界可以放弃，从而寻找下一家。

最后得出答案：

```java
class Solution {
    int[] templateCnt;
    int[] curCnt;

    boolean isEqual()
    {
        boolean flag = true;
        for(int i=0;i<26;++i){
            if(templateCnt[i]!=curCnt[i])flag=false;
        }
        return flag;
    }

    public List<Integer> findAnagrams(String s, String p) {

        templateCnt = new int[26];
        for(int i = 0; i < p.length(); i++){
            templateCnt[p.charAt(i) - 'a']++;
        }
        List<Integer> ret = new ArrayList<>();
        curCnt = new int[26];
        int l=0,r=0;
        boolean move;
        while( l<s.length() && r<s.length()){
            move = false;
            int rc = s.charAt(r)-'a';
            int lc = s.charAt(l)-'a';

            if(  r<s.length() && curCnt[rc]<templateCnt[rc] ){
                curCnt[rc]++;
                ++r;
                move=true;
            }
            if( r==s.length() && curCnt[rc]<templateCnt[rc]) break;
            if( l<s.length() && curCnt[lc]>templateCnt[lc] ){
                curCnt[lc]--;
                l++;
                move=true;
            }
            if( l==s.length() )break;

            if( isEqual() ){
                ret.add(l);
                lc = s.charAt(l)-'a';
                curCnt[lc]--;
                l++;
                move=true;
            }

            if(!move){
                lc = s.charAt(l)-'a';
                curCnt[lc]--;
                l++;
            }
        }
        return ret;
    }
}
```


### 对撞指针



## [hot 100-15. 三数之和](https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked)


```C++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(),nums.end());
        int zero=0;
        bool pos=0,neg=0;
        vector<vector<int>> ans = vector<vector<int>>();
        // 全是0，只有正数、只有复数的剪枝
        for(int i=0;i<nums.size();++i){
            if(nums[i]==0)++zero;
            else if(nums[i]>0)pos|=1;
            else neg|=1;
        }
        if(zero>=3){
            vector<int> tmp = {0,0,0};
            ans.push_back(tmp);
        }
        if( pos^neg ){
            return ans;
        }
        if(zero>1){
            // 要么1个0，要么3个0,3个0 的情况全部重复
            auto newEnd = remove(nums.begin(), nums.end(), 0);
            nums.erase(newEnd, nums.end());
            nums.push_back(0);
            sort(nums.begin(),nums.end());
        }
        // 三指针，定1，挪2
        for(int i=1;i<nums.size()-1;++i){
            int l=0,r=nums.size()-1;
            while(l<i && i<r){
                int sum = nums[l]+nums[r];
                if(-sum > nums[i])++l;
                else if(-sum < nums[i])--r;
                else{
                    vector<int> tmp = vector<int>();
                    tmp.push_back(nums[l]);
                    tmp.push_back(nums[i]);
                    tmp.push_back(nums[r]);
                    ans.push_back(tmp);
                    ++l;--r;
                }
            }
        }
        set<vector<int>> s(ans.begin(), ans.end());
        ans.assign(s.begin(), s.end());
        return ans;
    }
};
```


## 单调栈

单调栈分两种，递增栈和递减栈。==递增栈确定最小的顺序，递减栈确定最大的顺序==。
其母题来源于 “最长上升子序列” ，这个数据结构的优点在于能构建间断的单调序列。





