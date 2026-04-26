
## 并查集


https://leetcode.cn/problems/path-existence-queries-in-a-graph-i/

```java
int[] fa;
    // 找到父亲
    int find(int x){
        if(fa[x]==x)return x;
        //  路径压缩
        else return fa[x] = find(fa[x]);
    }
    void merge(int a, int b){
        fa[find(a)]=find(b);
    }
    public boolean[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
        // nums 非递减
        fa=new int[nums.length];
        for(int i=0;i<nums.length;++i){fa[i]=i;}

        for(int i=0;i<nums.length;++i){
            if(nums[i+1]-nums[i]<=maxDiff){
                fa[i]=fa[i+1];
            }
        }
        boolean[] ret = new boolean[queries.length];
        for(int i=0;i<queries.length;i++) {
            int u,v;
            u = queries[i][0];
            v = queries[i][1];
            if(find(u)==find(v)){
                ret[i]=true;
            }else{
                ret[i]=false;
            }
        }
        return ret;
    }
```