# 搜索

## 一般搜索

为什么需要搜索 —— 问题的回答很简单，因为你需要一个任意层数的for。   
举个例子，如果你需要凭空产生无限个来自某个字符串的子序列并匹配去搜索它，那么你就需要搜索。

- [++1++, 2, 3, 4]
- [1, 2, 3, ++4++]
- [1, ++2++, ++3++, 4]
- [1, ++2++, ++3++, ++4++]
- [1, 2, ++3++, ++4++]
- [++1++, 2, 3, ++4++]
- [++1++, ++2++, 3, 4]

```java
void DFS(int pos, Deque<Integer> deque) {
    if (pos >= nums.length) {
        // 若 deque 非空才处理（空集不存）
        if (!deque.isEmpty()) {
            // 1. 计算 gcd
            int gcd = 0;
            for (int idx : deque) {
                gcd = (gcd == 0) ? nums[idx] : gcd(gcd, nums[idx]);
            }
            // 2. 保存子序列的副本（作为 List）
            List<Integer> subset = new ArrayList<>(deque);
            // 3. 存入 buffer（注意 buffer[gcd] 要先初始化为 ArrayList）
            buffer[gcd].add(subset);
        }
        return;
    }
    // 不选当前元素
    DFS(pos + 1, deque);
    // 选当前元素
    deque.push(pos);
    DFS(pos + 1, deque);
    deque.pop(); // 回溯
}
```

搜索只需要关心起点与终止条件，并且根据不同的方式找到不同的搜索方式。  
同时需要注意搜索深度，一般数据量在几十到几百的时候是适合搜索的，但是4位数往上就不合适了 —— 你也应当考虑数据结构辅助而不是盲目的搜索。


