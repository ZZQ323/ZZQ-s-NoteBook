# dp 入门

## 概述

dp 就是一种状态存储技术。任何时候，你需要记录中间过程的状态，并且将状态用于后续**多个**计算过程中，你就需要使用到dp。

dp 题目往往问的就是一个状态的事情，但是我们要有能力去分辨出，我们要不要额外构造多个状态：
- {lightblue:不同的状态之间会有“包含关系”}

dp 的解题核心在于写递推式子，dp 的理解核心在于储存什么。

有的人会觉得：啊！搜索加上记忆不就也差不多吗？   
这个感觉是没错的 {lightsalmon:记忆化搜索} 和 {lightsalmon:dp} 只是互为表里的关系，dp强调初始化状态与状态转移，搜索强调重复地执行答案搜索的过程。  
简单来说就是，一个自顶向下，一个从底向上。


## 母题-不限次数的组成

### 题干

纸笔问题是统计种类的问题。

- [P2834 纸币问题 3](https://www.luogu.com.cn/problem/P2834)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。

- [P2840 纸币问题 2](https://www.luogu.com.cn/problem/P2840)

你有 $n$ 种面额互不相同的纸币，现在你需要支付 $w$ 的金额，求问有多少种方式可以支付面额 $w$，答案对 $10^9+7$ 取模。 
{lightblue:不同种货币得到的属于不同的方案}。

### 解析

动态规划是状态的转移的设计，我们先考虑状态的表示 —— $dp[i]$ 表示方式的话，$i$ 就表示金额了，运算的时候就需要用 代表纸币的金额 $a[i]$ 去进行状态的转移： 
$$dp[i] = f(dp\left[ i-a \left[ j \right] \right] )$$  
而状态转移中，使用了的 $a[i]$，就自动保存在了这个方案里面。

<!-- <Badge type="warning" text="" />   -->
**<font style="color:lightblue;">那么具体状态是如何转移的呢？</font>**。  
对于{lightsalmon:不重复}的组合而言，我们应该是按照{lightsalmon:纸币}更新，也即每个纸笔独立地更新一次 —— 这样能保证纸币只被使用一次。  
而对于{lightsalmon:重复}的组合而言，我们应该按照{lightsalmon:每一个金额}，进行纸币组合的考虑，这样同样一个纸币可能在不同金额的组成出现多次，进而也是不同的方案组合了。

```C++
// 每个方案，只算一次 - P2834 纸币问题 3
#include<iostream>
using namespace std;

const int mod = 1e9 + 7;
int a[1005], dp[10005];

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int n, w; cin >> n >> w;
    for (int i = 0; i < n; ++i) cin >> a[i];
    dp[0] = 1;
    for (int i = 0; i < n ; ++i) {
        for(int j=a[i];j<=w;++j)
            if(dp[j-a[i]])
                dp[j] = (dp[j-a[i]] + dp[j]) % mod;
    }
    cout << dp[w] << '\n';
    return 0;
}

```

```C++
// 要考虑元素不同的位置 P2840 纸币问题 2
#include<iostream>
using namespace std;

const int mod = 1e9 + 7;
int a[1005], dp[10005];

int main()
{
//    ios::sync_with_stdio(0);
//    cin.tie(0);cout.tie(0);

    int n, w; cin >> n >> w;
    for (int i = 0; i < n; ++i) cin >> a[i];
    dp[0] = 1;
//    循环1
//    for (int j = 0; j <= w; ++j) {
//        for (int i = 0; i < n && j + a[i] <= w; ++i) {
//            dp[j + a[i]] = (0ll + dp[j + a[i]] + dp[j]) % mod;
//        }
//    }
//    循环2
    for (int j = 1; j <= w; ++j) {
        for (int i = 0; i < n && j>=a[i] ; ++i) {
            dp[j] = (0ll + dp[j] + dp[j-a[i]]) % mod;
        }
    }
    cout << dp[w] << '\n';
    return 0;
}

```

## 母题-只许拿一次的组成

### 题干  

- [P1048 [NOIP 2005 普及组] 采药](https://www.luogu.com.cn/problem/P1048)

山洞里有一些不同的草药，采每一株都需要一些时间 $t$，每一株也有它自身的价值 $v$ 。  
我会给你一段时间 $T$ ，在这段时间里，你可以采到一些草药。  
请让采到的草药的总价值最大。 

- [P1802 5 倍经验日](https://www.luogu.com.cn/problem/P1802)  
现在有 n 个好友，给定失败时可获得的经验、胜利时可获得的经验，打败他至少需要的药量。

### 解析

采山药，因为涉及到 “只许拿一次”，所以我们得倒着遍历 —— 就没了。  
这道题目不像其他题目那样明说“必须要以什么顺序遍历”，所以我们就自己规定一个顺序遍历即可。  

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e2+100;
const int T = 1e3+100;
// T 代表总共能够用来采药的时间，M 代表山洞里的草药的数目。
struct herb{
    int time;
    int value;
} h[M]={};
int dp[T]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int t,m;cin >>t>>m;
    // 分别表示采摘某株草药的时间和这株草药的价值。
    for(int i=0;i<m;++i){cin >> h[i].time >> h[i].value ;}
    for(int i=0;i<m;++i){
        for(int k=t;k>=h[i].time;--k){
            dp[k] = max(dp[k],dp[k-h[i].time]+h[i].value);
        }
    }
    cout << dp[t] << '\n';
    return 0;
}
```

之前我写的是二维dp，因为有点没把握是否会覆盖 —— 你写了二维dp之后会发现，其实没有必要！  

```C++
#include<bits/stdc++.h>
using namespace std;

const int M = 1e2+100;
const int T = 1e3+100;
// T 代表总共能够用来采药的时间，M 代表山洞里的草药的数目。
struct herb{
    int time;
    int value;
} h[M]={};
int dp[M][T]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    int t,m;cin >>t>>m;
    // 分别表示采摘某株草药的时间和这株草药的价值。
    for(int i=0;i<m;++i){cin >> h[i].time >> h[i].value ;}
    for(int i=0;i<m;++i){
        for(int k=t;k>=h[i].time;--k)
            dp[i][k] = h[i].value;
        for(int j=i-1;j>=0;--j){
            for(int k=t;k>=h[i].time;--k){
                dp[i][k] = max(dp[i][k],dp[j][k-h[i].time]+h[i].value);
            }
        }
    }
    // 不一定选到最后一个！
    int ans = -1;
    for(int i=0;i<m;++i)ans = max(ans,dp[i][t]);
    cout << ans << '\n';
    return 0;
}
```

而 5倍经验日 这一题，其实设立一个base，就好了，剩下的逻辑都是一样的。  
按照田忌赛马的逻辑，输是可以不需要成本的，也就是可以稳拿的，但是赢需要努力。所以先把输的部分加上，然后再考虑看看要不要赢的。  

```C++
// P1802 5 倍经验日
#include<bits/stdc++.h>
using namespace std;
using ll  = long long ;

const int N = 1e3+100;
int lose[N]={},win[N]={},use[N]={};
ll dp[N]={};  // 使用x个药物去打好友
int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);

    int n,x;cin >> n >> x;
    ll base = 0;
    for(int i=1;i<=n;++i){
        // 代表每个怪物
        cin >> lose[i] >> win[i] >> use[i];
        win[i] -= lose[i];  // 变成增量
        base += lose[i];
    }
    // 迷你装药物每个只能用一次
    // 把好友挨个打一遍
    for(int i=0;i<=x;++i)dp[i] = base;
    for(int i=1;i<=n;++i){
        // 两种情况的价值都要顾全
        for(int j=x;j>=use[i];--j){
            // 要谨慎的使用这些药
            dp[j] = max(dp[j-use[i]]+win[i],dp[j]);
        }
    }
    cout << 5*dp[x] << '\n';
    return 0;
}

```

## 多维dp

多维dp，其实就是因为“决策受到多个因素影响”。  
没有“一眼丁真的方法”去看是否一道题目是多维dp，你得在考虑状态转移的过程中才能发现，究竟需要多少个因素。


## 母题-图降维

### 题干

- [P2196 [NOIP 1996 提高组] 挖地雷](https://www.luogu.com.cn/problem/P2196)

当地窖及其连接的数据给出之后，你可以从任一处开始挖地雷，然后每次可以移动到 {lightblue:一个编号比当前节点大且联通的节点去挖地雷} ，当无满足条件的节点时挖地雷工作结束。  
请你设计一个挖地雷的方案，使某人能挖到 {lightblue:最多的地雷} 。

- [P1434 [SHOI2002] 滑雪](https://www.luogu.com.cn/problem/P1434)

一个人可以从某个点滑向上下左右相邻四个点之一，当且仅当高度会减小。Michael 想知道在一个区域中最长的滑坡。区域由一个二维数组给出。数组的每个数字代表点的高度。  

### 解析

这题的关系被抽象为 {lightsalmon:邻接矩阵} ，也即什么状态可以从什么状态过渡过来。  
在设计状态过渡的时候，我们得找到“不重复更新”的路径， —— 既然dp问题总是存在一个状态包含另一个状态，那么我们先更新小状态，然后更新大状态即可。  
这里则是 {lightsalmon:一个编号比当前节点大且联通的节点去挖地雷}，我们先更新小节点，然后大节点加入的时候则可以包含前面的决策计算 —— 而不是相反。  

```C++
// P2196 [NOIP 1996 提高组] 挖地雷
#include<bits/stdc++.h>
using namespace std;

const int N = 30;
int a[N]={}, dp[N]={},pre[N]={};
bool g[N][N]={};

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    memset(pre,-1,sizeof pre);
    int n;cin >> n;
    for (int i = 0; i < n; ++i) cin >> a[i],dp[i] = a[i];
    for(int i=0;i<n;++i){
        g[i][i] = 1;
        for(int j=i+1;j<n;++j){
            bool flag ;
            cin >> flag;
            g[j][i] = g[i][j] = flag;
        }
    }
    // 临接矩阵输出debug
    // for(int i=0;i<n;++i){for(int j=0;j<n;++j){cout<<g[i][j]<<' ';}cout<<'\n';}
    for(int i=0;i<n;++i){
        for(int j=i+1;j<n;++j){
            if(g[i][j]){
                if( dp[j] < dp[i]+a[j]){
                    dp[j] = dp[i]+a[j];
                    pre[j] = i;
                }// 否则保持原样
            }
        }
    }
    int idx=-1,ans = -1;
    for(int i=0;i<n;++i){
        if( ans < dp[i]){
            ans = dp[i];
            idx = i;
        }
    }
    // 处理输入输出 —— 因为逻辑是“知道答案找结果”，所以倒着输出
    stack<int> stk;
    for(int i = idx;~i;i=pre[i]){stk.push(i+1);}
    cout<<stk.top();stk.pop();
    while(stk.size()){ cout<<' '<<stk.top();stk.pop();}
    cout<<'\n'<< ans <<'\n';
    return 0;
}

```

而第二道题目，要硬写成一维的线性dp是可以的 —— 它本身也是这样一个逻辑的题目，只不过它对储存的要求卡的很紧 —— 一开始初始化的$const R=200 C=200$，结果就MLE了；写成记忆化搜索可能更好写，~~但我就懒得改了~~。

```C++
// P1434 [SHOI2002] 滑雪
#include<bits/stdc++.h>
using namespace std;

// 表示区域的二维数组的行数 R 和列数 C
const int R = 101;
const int C = 101;

// 表示区域的二维数组的行数 R 和列数 C
int r,c;
inline bool check(int x,int y){return x>=0 && x<r && y>=0 && y<c;}

// 上下左右走
const int Fx[] = {0,0,-1,1};
const int Fy[] = {-1,1,0,0};

// 用于拉平二维数据结构，方便遍历
struct point{
    int idx;
    int idy;
    int height;
    // 从大到小
    friend bool operator<(const point& a,const point& b){return a.height>b.height;}
} p[R*C];int cnt = 0;

// 原图
int h[R][C]={};

// BFS 遍历
// 能不能这样更新 —— 类比之前的临接逻辑，只不过这个是有向图
bool g[R*C][R*C]={},isVis[R*C]={};
void DFS(int from)
{
    if( isVis[from] )return;
    isVis[from] = 1;
    for(int i=0;i<4;++i){
        int nx = p[from].idx+Fx[i];
        int ny = p[from].idy+Fy[i];
        if( !check(nx,ny) )continue;
        if( h[nx][ny] >= h[ p[from].idx][p[from].idy] ) continue;
        int to;
        for(to=1;to<=cnt;++to){ if(p[to].idx==nx && p[to].idy==ny) break; }
        if(to>cnt)continue;
        DFS(to);
        g[from][to] = 1;
        for(int j=1;j<=cnt;++j){
            if( g[to][j] ) g[from][j] = 1;
        }
    }
}

int dp[R*C]={};

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    cin>>r>>c;
    for(int i=0;i<r;++i){
        for(int j=0;j<c;++j){
            int temp; cin >> temp;
            p[++cnt] = {i,j,temp};
            h[i][j] = temp;
        }
    }
    // 强行规定一个顺序
    sort(p+1,p+1+cnt);
    // for(int i=1;i<=cnt;++i)cout<<p[i].height<<' ';  // debug
    for(int i=1;i<=cnt;++i){
        // 获取i能到哪些需要更新的地方。
        DFS(i);
        // 进行更新，跟其他dp一样
        for(int j=i+1;j<=cnt;++j)
            if(g[i][j]) dp[j] = max(dp[j],dp[i]+1);
    }
    int ans = -1;
    for(int i=1;i<=cnt;++i){ans = max(ans,dp[i]);}
    cout << ans+1 << '\n';
    return 0;
}

```

## 母题-复杂图de记忆化搜索

### 题干

- [P4017 最大食物链计数](https://www.luogu.com.cn/problem/P4017)
给你一个食物网，你要求出这个食物网中最大食物链的数量。

### 解析

这种题想要拉成一维线性 `dp` 的搜索方式有点太难了，所以就自顶向下进行搜索吧。  
具体的转移方程设计还是从题目中读出来 —— 每个生物算一种货币，货币的位置是固定的（货币的顺序无所谓），计算组成不同货币组成金额（生物链）的种类。  
$$
dp[i] += dp[ 能更新i的地方 ]
$$
生物链是肯定不能有环的，要不然能量都不守恒了，但如果有环就加`bool vis[N]`。  

```C++
// P4017 最大食物链计数
#include<bits/stdc++.h>
using namespace std;

// 表示区域的二维数组的行数 R 和列数 C
const int mod = 80112002;
const int N = 5e3+10;
struct Node{
    vector<int> nex;
    vector<int> pre;
} p[N];
int dp[N];

int DP(int pos)
{
    if(~dp[pos])return dp[pos];
    if(p[pos].pre.size()==0)return dp[pos]=1;
    int ret = 0;
    for(int i=0;i<p[pos].pre.size();++i){
        int to = p[pos].pre[i];
        ret= (ret + DP(to)) % mod;
    }
    return dp[pos] = ret;
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);cout.tie(0);
    memset(dp,-1,sizeof(dp));
    int n,m;cin >> n >> m ;
    for(int i=0;i<m;++i){
        // 表示被吃的生物 A 和吃 A 的生物 B。
        int a,b;  cin >> a >> b ;
        p[a].nex.push_back(b);  // 谁吃
        p[b].pre.push_back(a);  // 吃谁
    }

    int ans = 0;
    for(int i=1;i<=n;++i){
        // 最高消费者
        if(p[i].nex.size()==0)
            ans = (ans + DP(i) )%mod;
    }
    cout << ans << '\n';
    return 0;
}

```

## 母题-选还是不选

### 题干

- [P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)
给出一个长度为 n 的序列 a，选出其中连续且非空的一段使得这段和最大。序列为任意大小的整数

### 解析

- [P1115 最大子段和](https://www.luogu.com.cn/problem/P1115)
需要考虑到，在处理的过程中，可能会“不用”之前的序列。这道题目不像纸币构成，每个都填进去，能填进去就一定填进去，从而去计算方案。
因为计算的是“最大的子序列”，所以可能存在中间的一段 —— 那么就得能发现并用上中间的那一段。  

```C++
// P1115 最大子段和
#include<bits/stdc++.h>
using namespace std;

const int N = 2e5 + 100;
int a[N];
using ll = long long ;
ll dp[N][2];

int main()
{
    ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);
    int n;
    cin >> n; // 表示序列的长度 n
    for (int i = 0; i < n; ++i){
        cin >> a[i];
        // if( a[i]>=0 )cout<<a[i]; debug
        dp[i][0] = dp[i][1] = INT_MIN;
    }
    // 选出其中连续且非空的一段使得这段和最大
    // dp[i][~]  选还是不选
    dp[0][1] = a[0];
    for (int i = 1; i < n; ++i) {
        // 直接不管
        dp[i][0] = max(dp[i - 1][0], dp[i - 1][1]);
        // 接上或者重开
        if(dp[i - 1][1] != INT_MIN) dp[i][1] = max(dp[i - 1][1] + a[i], 0ll + a[i]);
        else dp[i][1] = a[i];
    }
    cout << max(dp[n-1][0],dp[n-1][1]) << '\n';

    return 0;
}
```


## 入门题-数字三角形

- [P1216 [IOI 1994 / USACO1.5] 数字三角形 Number Triangles](https://www.luogu.com.cn/problem/P2834)

题目意思如图：

![数字三角形示意图](https://cdn.luogu.com.cn/upload/image_hosting/95pzs0ne.png)

其实只需要关注到更新时候的顺序就行 —— 写代码的时候会自动观察到的。

```C++
#include<bits/stdc++.h>
using namespace std;
const int N = 1e3+100;
int mp[N][N],dp[N];

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int r;
    cin >> r;
    for(int i=0;i<r;++i){
        for(int j=0;j<=i;++j)cin >> mp[i][j];
    }
    // 可以来自 左上角以及正上方
    // 这里如果反着遍历更新则答案错误 —— 读者可以自行思考一下。
    dp[0] = mp[0][0];
    for(int i=1;i<r;++i){
        dp[i] = dp[i-1] + mp[i][i];
        for(int j=i-1;j>=1;--j)
            dp[j] = max(dp[j-1],dp[j])+mp[i][j];
        dp[0] = dp[0] + mp[i][0];
    }
    int ans = -1;
    for(int i=0;i<r;++i)ans = max(ans,dp[i]);
    
    cout << ans <<'\n';
    return 0;
}
```