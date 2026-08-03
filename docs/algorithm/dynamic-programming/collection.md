
# DP 题的各种变式题单

## 图上dp

::: details **题目信息**
- **提交链接**：P1002 [NOIP 2002 普及组] 过河卒 [link](https://www.luogu.com.cn/problem/P1002) 
- **母题**
  - [P1434 [SHOI2002] 滑雪](https://www.luogu.com.cn/problem/P1434)
  - [P2196 [NOIP 1996 提高组] 挖地雷](https://www.luogu.com.cn/problem/P2196)
:::
::: tip **分析**
- 这题其实没什么太多的思考，dp转移方程很简单，因为是见怪不怪的那种{lightblue:“统计方案个数”}，所以{lightblue:转移方程}是 $dp[from] += dp[to]$
- 而难点在于{lightblue:更新顺序}，一般的数组我们可以强制依次遍历，滑雪题我们能清楚地知道行走的规则 —— 二者都很好更新。这一题属于是需要自己发现更新的规律，并且手动处理一下更新中的问题
- {lightblue:借由BFS/DFS的性质}，我们并不需要很特殊地“倒着遍历”，去保证“一次更新不会影响下一次更新”（一维数组的滚动数组更新是需要考虑这个的）；与之相反的则是，考虑搜索的顺序，去防止反复更新。
:::
::: danger 请注意
  - {lightblue:数值很大}，需要用 long long 。
:::

如果使用 DFS 去进行搜索的话，{lightsalmon:它不能保证“不走回头路”}，进而会导致，本来能一个 “右” 向走到的地方结果绕了一个 “下右上”。  

```C++
int DP(int x,int y)
{
    if(~dp[x][y])return dp[x][y];
    if(x==0 && y==0)return dp[x][y]=1;
    int ret = 0;
    vis[x][y] = 1;
    for(int i=0;i<3;++i){
        // 兵的走路横平竖直
        int nx = x+Fx[i];
        int ny = y+Fy[i];
        if(!check(nx,ny))continue;
        bool flag = 0;
        // 不要踩马的攻击范围
        for(int j=0;j<8;++j){
            // 马走日
            int hx = C.x+Hx[j];
            int hy = C.y+Hy[j];
            if(hx==nx && hy==ny){
                flag = 1;
                break;
            }
        }
        if(flag)continue;
        if(vis[nx][ny])continue;
        ret += DP(nx,ny);
    }
    vis[x][y] = 0;
    return dp[x][y] = ret;
}
```

所以改成BFS就好了，它能保证你不蛇形走路。

```C++
void DP(const Point & beg)
{
    dp[beg.x][beg.y] = 1;
    queue<Point> qe;
    qe.push(beg);
    while( !qe.empty() ){
        auto cur = qe.front();
        qe.pop();
        if(vis[cur.x][cur.y])continue;
        // cout << "在" << cur.x << ' ' << cur.y << '\n';
        vis[cur.x][cur.y] = 1;
        for(int i=0;i<4;++i){
            int nx = cur.x+Fx[i];
            int ny = cur.y+Fy[i];
            if(!check(nx,ny))continue;
            bool flag = 0;
            // 不要踩马的攻击范围
            // 马的位置也不要踩！！！
            for(int j=0;j<9;++j){
                // 马走日
                int hx = C.x+Hx[j];
                int hy = C.y+Hy[j];
                if(hx==nx && hy==ny){flag = 1;break;}
            }
            if(flag)continue;
            // 对更新开放，对取出闭合
            if( !vis[nx][ny] )dp[nx][ny] += dp[cur.x][cur.y];
            qe.push({nx,ny});
        }
        // print();
    }
}
```

还有一些细节，{lightsalmon:比如} $dp$ {lightsalmon:更新的时候，不能让他循环更新}。  
以下是全部代码，可以清晰地看到遍历的过程。之前通过打印发现dp很唐地通过了马的位置 —— 属于是贴脸开大。

```C++
#include<bits/stdc++.h>
using namespace std;
using ll  = long long ;

struct Point{
    int x;int y;
}B,C;
const int Fx[] = {0,-1,0,1};
const int Fy[] = {-1,0,1,0};
const int Hx[] = {0,1,-1,2,-2,2,-2,1,-1};
const int Hy[] = {0,2,2,1,1,-1,-1,-2,-2};

int maxX,maxY;
inline bool check(int x,int y){return x>=0 && x<=maxX && y>=0 && y<=maxY;}

ll dp[30][30]={};
bool vis[30][30]={};

void print()
{
    for(int i=0;i<=maxX;++i){
        for(int j=0;j<=maxY;++j){cout<< dp[i][j]<< ' ';}
        cout << '\n';
    }
}

void DP(const Point & beg)
{
    dp[beg.x][beg.y] = 1;
    queue<Point> qe;
    qe.push(beg);
    while( !qe.empty() ){
        auto cur = qe.front();
        qe.pop();
        if(vis[cur.x][cur.y])continue;
        // cout << "在" << cur.x << ' ' << cur.y << '\n';
        vis[cur.x][cur.y] = 1;
        for(int i=0;i<4;++i){
            int nx = cur.x+Fx[i];
            int ny = cur.y+Fy[i];
            if(!check(nx,ny))continue;
            bool flag = 0;
            // 不要踩马的攻击范围
            // 马也不要踩！！！
            for(int j=0;j<9;++j){
                // 马走日
                int hx = C.x+Hx[j];
                int hy = C.y+Hy[j];
                if(hx==nx && hy==ny){flag = 1;break;}
            }
            if(flag)continue;
            // 对更新开放，对取出闭合
            if( !vis[nx][ny] )dp[nx][ny] += dp[cur.x][cur.y];
            qe.push({nx,ny});
        }
        // print();
    }
}

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
//    memset(dp,-1,sizeof dp);
    cin >> B.x >> B.y >> C.x >> C.y;
    maxX = max(B.x,C.x+2);
    maxY = max(B.y,C.y+2);
    DP(B);
    cout <<  dp[0][0] << '\n';
    return 0;
}

```

## 区间覆盖

### 3995. 转换字符串的最小成本 III [link](https://leetcode.cn/problems/minimum-cost-to-convert-string-iii/description/)

:::info 
给你两个字符串 source 和 target。

同时给你一个二维字符串数组 rules，其中 $rules[i] = [pattern_i, replacement_i]$，以及一个整数数组 costs，其中 costs[i] 是应用 rules[i] 的基本成本。两个数组长度相同。此外， $pattern_i$ 和 $replacement_i$ 的长度也相同。

你可以任意 次数地应用任意规则。每次应用规则 rule[i] 的过程如下：
  1. 选择当前字符串的一个下标 l，使得从 $l$ 到 $l + pattern_i.length - 1$ 的位置范围存在于当前字符串中，并且这些位置中没有任何一个在之前的规则应用中被使用过。
  2. 对于 $pattern_i$ 每个下标 j，字符 $pattern_i[j]$ 必须 等于 当前字符串位置 $l + j$ 处的字符，或者是 '*'。将该范围内的字符替换为 replacementi 。替换内容将 完全 按照给定的使用，且不包含通配符。
  3. 这次规则应用的成本是 costs[i] 加上 $pattern_i$ 中 '*' 字符的数量。一旦某个字符位置在某次规则应用中被使用，它就不能在后续的任何规则应用中被再次使用。

因为每个 $pattern_i$ 和 $replacement_i$ 的长度都相同，所以在每次规则应用之后，字符的位置都会保留。

返回将 source 转换为 target 所需的 最小总成本。如果无法完成转换，则返回 -1。
:::

题目话很多，而且一个**困难**{.color-red}很tm吓人。但是呢一眼dp，审题重点如下：
1. 结合样例理解，就是 rules 有一个 pattern 有一个 replacement ，二者长度相同，然后用 pattern 换 replacement（长度不同其实也没关系，比如 [编辑距离](https://www.luogu.com.cn/problem/P2758) ， 无非就是一维还是二维的问题，这里是一维）
2. 然后“一旦某个字符位置在某次规则应用中被使用，它就不能在后续的任何规则应用中被再次使用”，**说明不存在 “规则堆叠”**{.color-orange}，也即在原位置通过好几个规则同时使用才能看到最终的效果
3. 最亮眼的还是 **最小总成本**{.color-red}，这下就是非DP不可了。

根据题目“你可以任意次数地应用任意规则”，这说明这还是个无限的背包的问题，采用正向遍历的方式进行 —— 但值得注意的是，应用了规则的一段范围内不能使用其他规则，也即规则使用范围不交叉。   

那么思路就出来了，首先标记这个点可以使用什么规则，然后正向更新每一个点。
但是如果只想到这些，那么dp的更新是断断续续的，我就栽跟头在这里 —— 这里还需要知道在这个点没有`rules`的时候且源字符串和目标相同的时候，进行dp数值的传递。

那如何保证这个规则能用呢？**不仅得保证pattern和source匹配，也需要保证 replacement 和target一致**{.color-orange} —— 那才是可选项。
并且注意提前预处理通配符'*'的额外消耗。

```java
class Solution {
    public int minCost(String source, String target, List<List<String>> rules, int[] costs) {
        int n = source.length();
        costs = costs.clone();
        for (int i = 0; i < rules.size(); i++) {
            int cnt = 0;
            for (char ch : rules.get(i).get(0).toCharArray()) {
                if (ch == '*') cnt++;
            }
            costs[i] += cnt;
        }

        // 直接逐字符比较预处理每个起点能用哪些规则
        List<Integer>[] possibilities = new List[n];
        for (int i = 0; i < n; i++) possibilities[i] = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < rules.size(); j++) {
                String pat = rules.get(j).get(0), rep = rules.get(j).get(1);
                int L = pat.length();
                if (i + L > n) continue;
                if (matches(source, i, pat) && target.regionMatches(i, rep, 0, L)) {
                    possibilities[i].add(j);
                }
            }
        }

        long INF = Long.MAX_VALUE / 2;
        long[] dp = new long[n + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == INF) continue;
            if (source.charAt(i) == target.charAt(i)) {
                dp[i+1] = Math.min(dp[i+1], dp[i]);
            }
            for (int j : possibilities[i]) {
                int L = rules.get(j).get(1).length();
                dp[i+L] = Math.min(dp[i+L], dp[i] + costs[j]);
            }
        }
        return dp[n] == INF ? -1 : (int) (dp[n] % 1_000_000_007);
    }

    private boolean matches(String s, int start, String pattern) {
        for (int k = 0; k < pattern.length(); k++) {
            char pc = pattern.charAt(k);
            if (pc != '*' && s.charAt(start + k) != pc) return false;
        }
        return true;
    }
}
```

字符串长度很小，说明不存在kmp等加速匹配的方法，但是我还是在蛊惑之下试了一下，发现根本不符合逻辑。

```java
int[] kmp(String s) {
        int[] next = new int[s.length() + 1];
        Arrays.fill(next, -1);
        int j = 0, k = -1;
        while (j < s.length()) {
            if (k == -1 || s.charAt(j) == s.charAt(k)) {
                ++j;
                k++;
                if (j >= s.length()) break;
                if (s.charAt(j) == s.charAt(k)) next[j++] = k++;
                else k = next[k];
            } else {
                k = next[k];
            }
        }
        return next;
    }

// kmp 优化片段
List<Integer>[] possibilities = new List[source.length()];
for (int i = 0; i < possibilities.length; i++) possibilities[i] = new ArrayList<>();

for (int i = 0; i < rules.size(); i++) {
    String pattern = rules.get(i).get(0);
    String replace = rules.get(i).get(1);
    int[] nex = kmp(replace);

    int j = 0, k = 0;
    for (; j < source.length() && k < pattern.length(); ) {
        // 使用next
        if (k == -1) {
            ++k;++j;
        } else if (
                (pattern.charAt(k) == '*' || source.charAt(j) == pattern.charAt(k))
                        && target.charAt(j) == replace.charAt(k)
        ) {
            ++k;++j;
        } else {
            k = nex[k];
        }
    }
    // 没用完，长度不够了也不算匹配
    if (k == pattern.length() ) {
        possibilities[j-1].add(i);
    }
}
```

因为 kmp 的匹配是针对于这个字符串的，并不能保证 pattern 和 replacement 一样的回溯逻辑，更何况pattern还有通配符！！

第一次写的时候，并没有想到是无限背包的dp，所以写的是记忆化搜索 —— 这里主要是判断使用逻辑的问题，必须是遇到了能使用的就使用。

```java
class Solution {
    String target,source;
    List<List<String>> rules;
    List<Integer>[] possibilities;
    int[] costs;
    int ans = 0;

    boolean DFS(int beg,int sum)
    {
        if(beg>=target.length()){
            ans = Math.min(ans,sum);
            return true;
        }
        for(int i=beg;i<target.length();i++){
            if( source.charAt(i) != target.charAt(i) ){
                // 无法解决
                if( possibilities[i].isEmpty() )return false;
                boolean flag = false;
                for(int j=0;j<possibilities[i].size();j++){
                    int idx = possibilities[i].get(j);
                    int ln =  rules.get(idx).get(1).length();
                    flag |= DFS(i + ln, sum + costs[idx]);
                }
                return flag;
            }
        }
        // 如果是顺利出来，那意味着没有
        ans = Math.min(ans,sum);
        return true;
    }

    boolean startsWithV2(String target,String pattern)
    {
        if( target.length() < pattern.length() )return false;
        for(int i=0;i<pattern.length();i++){
            if( pattern.charAt(i) == '*' || target.charAt(i) == pattern.charAt(i) )continue;
            return false;
        }
        return true;
    }

    public int minCost(String source, String target, List<List<String>> rules, int[] costs) {
        this.target = target;
        this.source = source;
        this.rules = rules;
        this.costs = costs;
        possibilities = new List[source.length()];

        for(int i = 0; i < possibilities.length; i++){
            possibilities[i] = new ArrayList<>();
        }

        for(int i = 0; i < rules.size(); i++){
            int cnt = 0;
            for(int j = 0; j < rules.get(i).get(1).length(); j++){
                if(rules.get(i).get(0).charAt(j)=='*'){
                    ++cnt;
                }
            }
            costs[i] += cnt;
        }

        for(int i=0;i<source.length();i++){
            for(int j=0;j<rules.size();j++){
                // 不需要在调用 startsWith 之前手动判断长度，内部已经帮你处理好了
                if( startsWithV2(source.substring(i),rules.get(j).get(0))  &&
                    startsWithV2(target.substring(i),rules.get(j).get(1))
                    ){
                    possibilities[i].add(j);
                }
            }
        }
        ans = Integer.MAX_VALUE;
        DFS(0, 0);
        return ans==Integer.MAX_VALUE?-1:ans;
    }
}
```

## 巴巴博弈

- [877. 石子游戏]( https://leetcode.cn/problems/stone-game/ )
  - 每回合，玩家从行的 开始 或 结束 处取走整堆石头，然后看最后谁最多
  - 与[486. 预测赢家](https://leetcode.cn/problems/predict-the-winner/description/) 是用一个题目
- [1406. 石子游戏 III]( https://leetcode.cn/problems/stone-game-iii/description/ )
  - 你只能从前往后选，每次可以选1、2、3堆

乍一看，是博弈问题，但仔细一看，并不是熟知的“巴什游戏”和“尼姆游戏”，其实只是一种利用dp进行博弈的计算方式。

针对 [877. 石子游戏]( https://leetcode.cn/problems/stone-game/ )而言，如果你考虑的是双指针，似乎总是出错 —— 因为贪心并不是“最优的考虑” ，无论是贪最大，还是贪“怎么样让对方下一次最小”，总是会出现无法遇见的意外 —— 这就是缺失信息了，需要用dp。

```java
// 错误示范
class Solution {
    public boolean predictTheWinner(int[] nums) {
        int l=0,r=nums.length-1;
        int winner1 = 0;
        int winner2 = 0;
        boolean turns = true;
        // 最小化对方的下一步
        while(l<r){
            int nmax = Math.max(nums[l],nums[r]);
            int nnmax1 = Math.max(nums[l+1],nums[r]);
            int nnmax2 = Math.max(nums[l],nums[r-1]);
            if(l==r-1){
                nnmax1 = nnmax2 = -1;
            }
            if(turns){
                if( nnmax1<nnmax2 )winner1+=nums[l++];
                else if( nnmax1>nnmax2 ) winner1+=nums[r--];
                else if( nums[l]>nums[r] )winner1+=nums[l++];
                else winner1+=nums[r--];
            }else{
                if( nnmax1<nnmax2 )winner2+=nums[l++];
                else if( nnmax1>nnmax2 ) winner2+=nums[r--];
                else if( nums[l]>nums[r] )winner2+=nums[l++];
                else winner2+=nums[r--];
            }
            turns = !turns;
        }
        if(turns){
            winner1+=nums[l];
        }else{
            winner2+=nums[r];
        }
        return winner1>=winner2;
    }
}
```

反而，你看到“谁更多”、“两端”、“每次都在收尾”，你应该能联想到区间dp的操作 —— dp能携带比贪心更多的信息。

那么接下来考虑的是遍历方式。这是第二个难点，我在两道题上都卡在了这个点上，也即 ——  怎么遍历？

从直觉上讲，无论是取前面的1、2、3堆，还是两边取，那么其实应该自顶向下运行，因为这就是题目运行的顺序。
但是如果这么想，不仅代码很难写，而且不符合dp运行的逻辑（从小到大）。

这里的误区在于，怎么开始并不是能直接选择的 —— 怎么开始伴随着接下来对对手最大的限制。
也即，在对手接下来取最大的情况下，我这一步这么选，能不能最好呢？

所以是**从后往前的考虑**{.color-purple}，在你考虑这么多的时候，后缀那么多最好的情况是，所以你这么选 —— **所以你才燃尽了，你得到了最好的结果**{.color-blue}。

```java
// 两边取
class Solution {
    public boolean predictTheWinner(int[] nums) {
        int ln = nums.length;
        if(ln==1)return true;
        int[][] dp = new int[ln][ln];
        for(int i = 0; i < ln; i++){
            dp[i][i] = nums[i];
        }
        // 奇数就是1
        // 偶数就是2
        for(int gap = 2;gap<=ln;++gap){
            for(int l=0;l<ln;l++){
                for(int r = l+gap-1;r<ln;r++){
                    dp[l][r] = Math.max(nums[r]-dp[l][r-1],nums[l]-dp[l+1][r]);
                }
            }
        }
        return dp[0][ln-1]>=0;
    }
}
```

```java
// 任意取1、2、3堆
class Solution {
    public String stoneGameIII(int[] stoneValue) {
        // Alice 总是先开始
        // 1、2 或 3 堆石子
        // 比赛的目标是决出最高分，得分最高的选手将会赢得比赛
        int ln = stoneValue.length;
        int[] dp = new int[ln + 10];
        Arrays.fill(dp, Integer.MIN_VALUE);
        int[] preSum = new int[ln + 10];

        preSum[0] = 0;
        for(int i = 1; i <= ln; i++){preSum[i] = preSum[i-1] + stoneValue[i-1];}
        // 从前面取：永远是后面的序列决定前面选择的状态
        // 从两边取：永远是中间决定开始的状态
        dp[ln] = 0;
        for(int i = ln-1; i >= 0; i--){
            dp[i] = Math.max(dp[i], preSum[i+1]-preSum[i]-dp[i+1]);
            if(i>ln-2)continue;
            dp[i] = Math.max(dp[i], preSum[i+2]-preSum[i]-dp[i+2]);
            if(i>ln-3)continue;
            dp[i] = Math.max(dp[i], preSum[i+3]-preSum[i]-dp[i+3]);
        }

        if (dp[0] == 0) return "Tie";
        else if (dp[0] > 0) return "Alice";
        else return "Bob";
    }
}
```

## 字符串的距离

也就是莱文斯坦距离（Levenshtein distance）

1. [编辑距离](https://www.luogu.com.cn/problem/P2758)
2. [字串距离](https://www.luogu.com.cn/problem/P1279)


