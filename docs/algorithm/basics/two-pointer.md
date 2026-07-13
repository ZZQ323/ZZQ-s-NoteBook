
# 区间处理
ref：[OI-WIKI](https://oi-wiki.org/misc/two-pointer/#%E5%9C%A8%E5%8D%95%E5%90%91%E9%93%BE%E8%A1%A8%E4%B8%AD%E6%89%BE%E7%8E%AF)

## 双指针

### 前后指针


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





