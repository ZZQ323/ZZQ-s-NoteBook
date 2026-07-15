# 数位dp



## 其实不一定那么麻烦

[1291. 顺次数](https://leetcode.cn/problems/sequential-digits/description/?envType=daily-question&envId=2026-07-13)
:::info
我们定义「顺次数」为：**每一位上的数字**{.color-blue}都比前一位上的数字大 1 的整数。
请你返回由 [low, high] 范围内所有顺次数组成的 有序 列表（从小到大排序）。
:::

审题关键点在于**“每一位上的数字”**{.color-blue}

```java
List<Integer> ret;
    Integer[] buffer;

    int[] digitsLow;
    int[] digitsHigh;
    int low;
    int high;

    void DFS(int power,int pre,boolean islow,boolean ishigh)
    {
        if(power<0){
            int ans = 0;
            for(int i=0;;i++){
                if(buffer[i]==-1)break;

                ans+=buffer[i]*(int)(Math.pow(10,i));
            }
            ret.add(ans);
            Arrays.fill(buffer,-1);
            return;
        }

        for(int i=0;i<10;i++){
            if(islow && i<digitsLow[power])continue;
            if(ishigh && i>digitsHigh[power])break;
            if(pre!=0 && i!=pre+1)continue;
            buffer[power]=i;
            DFS(power-1,i,islow && i==digitsLow[power] ,ishigh && i==digitsHigh[power]);
        }
    }

    int divide(int x,int[] digits)
    {
        int p=0;
        do{
            digits[p] = x%10;
            x/=10;
            ++p;
        }while(x>0);
        return p;
    }

    public List<Integer> sequentialDigits(int low, int high) {
        this.low = low;
        this.high = high;

        ret =new ArrayList<Integer>(10000);
        buffer = new Integer[20];
        Arrays.fill(buffer,-1);
        digitsLow =  new int[10000];
        digitsHigh =  new int[10000];

        divide(low,digitsLow);
        int p = divide(high, digitsHigh);

        DFS(p,0,true,true);

        return ret;
    }
```