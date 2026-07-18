# 数论常见代码

## 欧几里得算法

```java
// 递归
int GCD(int a, int b) {return b == 0?a:GCD(b, a % b);}

// 递推
int gcd(int a, int b) 
{
    a = Math.abs(a);
    b = Math.abs(b);
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

## 快速产生素数

目前能想到，如果要产生大量素数的话，那么可以使用代数基本定理对数字进行分解，然后做线性代数操作。

**欧拉筛**

```java
final int N = (int)5e4+100;
int[] primes;
public int[] eulerSieve(int n) {
    // 1. 特判
    if (n < 2) return new int[0];
    // 2. 状态数组：false 表示素数，true 表示合数
    boolean[] isComposite = new boolean[n + 1];
    // 3. 存储素数的数组（最多 n 个）
    int[] primes = new int[n + 1];
    int cnt = 0; // 素数个数
    for (int i = 2; i <= n; i++) {
        // 如果当前是素数，加入数组
        if (!isComposite[i]) primes[cnt++] = i;
        // 核心循环：用当前的 i 去乘以已知的素数，筛掉合数
        for (int j = 0; j < cnt; j++) {
            long product = (long) i * primes[j]; // 防止溢出
            if (product > n) break; // 超出范围，后面的素数更大，直接退出
            isComposite[(int) product] = true; // 标记为合数
            // ★★★ 最关键的一句 ★★★
            // 保证每个合数只被其最小质因子筛掉
            // 如果 i % primes[j] == 0，说明 primes[j] 是 i 的最小质因子
            // 继续往下乘的话，primes[j+1] 就不是最小质因子了，必须 break
            if (i % primes[j] == 0) break;
            
        }
    }
    // 返回实际大小的素数数组
    return Arrays.copyOf(primes, count);
}
```

遍历每个数：for (int i = 2; i <= n; i++)。
存素数：**如果当前 i 没被标记为合数**，就把 i 加入 primes 列表。
筛合数：通过已有的素数进行分解。

:::info
为什么 i % primes[j] == 0 时必须 break？
简单来说看，这样遍历得到的总是最小的素数因子，能防止重复标记。
:::




























