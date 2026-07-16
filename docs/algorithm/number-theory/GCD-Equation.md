# 理解 GCD，成为 GCD

> 什么？你问我为什么个页面写这么多推导？  
> 那你得问问给我上信息学的老师，为什么tmd3节课就讲到勒让德符号 …… 

## 整数除法与余数{.color-orange}

### 亿点术语

#### 整除与不整除

如果$a | b$，那么$b=aq$，同时$b\%a==0$

这个时候，我们说：

- $b$ 可以被 $a$ 整除
- $b$ 是 $a$ 的倍数
- $a$ 是 $b$ 的约数、因数
- **除了$1$以及自身**{.color-blue}，其他的约数都叫做真约数，$\pm 1$和$(\pm 自身)$被称作平凡约数。举个例子：3有$\pm 1$和$(\pm 3)$作为平凡约数，而16有2、4、8作为真约数。

其中，整除有一些性质：
- $b=qa+c \land a|b\Rightarrow a|c$
- $a|b\Leftrightarrow ma|mb\;,\;|a|\leq b\;,\;-a|b\;,\;a|-b$
- $a|b\land a|c\Rightarrow a|(xb+yc)$
- $a|b\land b|a\Rightarrow b=\pm a$

对于无法整除的数字$a$、$b$，有带余除法式子$b=qa+r$

其中，$r$被称作余数，$0\leq r < a$。余数可正可负，但是余数的正负是根据被除数决定的，一般都会令余数为正，但是有时会可能会讨论到负余数的情况。

比如：$11\%7=4$、$-11\%7=-4$、$(-11)\%(-7)=-4$

不难得知：**相邻的a个整数依次被a除了之后，一定会恰好取完上述式子中r的所有情况**{.color-blue}（也即$r=0,1,..,a-1$），这里面“r的所有情况”可以组成： “模a的剩余系” 。

## 数字的基底{.color-orange}

### 素数（质数）与互素（互质）

上面讨论了带余数的除法，其中涉及到了因数、平凡约数的概念。

那么对于一个数自身而言，如果一个数a只有平凡约数（也就是只有$\pm 1$、$\pm a$作为因因数、约数），那么$a$被称作素数。

常见的素数是：2、3、5、7、11、13、17、19、23、29 …… 
然后，大于3的素数都可以被这么描述：$6n\pm 1$

但是两个数之间的关系呢？我们有互素的概念。
如果两个数（a,b）之间有$(a,b)==1$或者$\gcd(a,b)==1$，那么这两个数就是互素的关系。


GCD就是最大公因数，就是把两个数a、b的所有因数列出来取最大。
比如：16的因数1、2、4、8、16，12的因数1、2、3、4、6、12，这里面求$\max(16的因数，12的因数)=4$了

与之相对的有最小公倍数LCM。

---

素数之间一定互素，但互素并不需要双方都是素数。
**很多定理只要求“互素”，而有些定理要求“必须是素数”，这一点得非常注意。**


还有一概念：就是**多个数互素以及两两互素**。

- 多个数互素就是$(a_1,a_2,...,a_n)$它本质上是先算$d_1=(a_1,a_2)$，然后算$(d_1,a_3)$这样一路算下去。
- 两两互素就是每个数之间都是互素的

举个例子：6、10、15 这三个数是互素的，但是两两并不互素。

借用代数基本定理去理解：**多个数互素只是代表着他们作为整体并没有公用的因子，而两两互素代表每两个之间就已经没有公用的因子了**。

### 代数基本定理、LCM

根据上面的观点，我们知道我们研究的是每个数的因数的情况。那么具体来说，每个数里面的因数情况是怎样的呢？

代数基本定理：$\forall x \in Z,\; \exist a_1、a_2、a_3,\;st. \quad x=p_1^{a_1}p_2^{a_2}...p_n^{a_n}$

人话就是：每一个整数x都可以唯一地分解为一些列不同幂次的素数的乘积。

举个例子就是：
$108=2^{2}\times 3^{3}\times 5^{0}\times 7^{0}\dots$
$29=2^{0}\times 3^{0}\dots29^{1}\dots$

那么，我们就可以求证LCM的计算公式了。

$$
由代数基本定理：

\left\{
  \begin{aligned}
    a &= p_1^{c_1} p_2^{c_2} \cdots p_n^{c_n} \\
    b &= p_1^{f_1} p_2^{f_2} \cdots p_n^{f_n}
  \end{aligned}
\right.


\\ \Rightarrow 
\left\{
  \begin{aligned}
    \gcd(a,b) &= p_1^{\min(c_1,f_1)} p_2^{\min(c_2,f_2)} \cdots p_n^{\min(c_n,f_n)} \\
    \operatorname{lcm}(a,b) &= p_1^{\max(c_1,f_1)} p_2^{\max(c_2,f_2)} \cdots p_n^{\max(c_n,f_n)}
  \end{aligned}
\right.


\\ \Rightarrow 

\gcd(a,b) \cdot \operatorname{lcm}(a,b) = ab

$$

所以求$lcm$的时候，直接$lcm=\dfrac{ab}{gcd}$就行了。

### 一些性质

对于GCD与LCM来说，有这个性质：$lcm\% gcd==0$；
理解上用代数基本定理很好理解：gcd有的素数因子lcm都有，gcd没有的lcm也有，所以gcd里面是不存在lcm没有的素数因子的，gcd也就一定能整除lcm。

这个性质可用于hdu4497。
![](../../../asset/docs/algorithm/number-theory/brain-surgen.md/hdu4497.png)

而单对于GCD来说，就是一些公式上的性质：

1. $(a,0)=(a,a)=a$
2. $(a,b)=(a,b+qa)=(a+kb,b)$
3. $(a,b)^n=(a^n,b^n)$
4. $(a_1,a_2,a_3,...,a_{n-1},a_n)=(a_1,(a_2,(a_3,...,(a_{n-1},a_n))))$

下面会用**裴蜀定理**简单证一下性质2，因为它非常有用，而其他比较显然，4也只是一种从两个参数到多个参数的计算方法上的定义。

---

最大公约数还有如下与**互素相关**的性质：

- 排除无关的倍数

$b|ac\;\land\; (a,b)==1\Rightarrow b|c$

- 排除无关的因子

$(a,b)==1 \Rightarrow (a,bc)=(a,b)$

- 有效因子组合（这里的$(a,b)==1$是为了保证a、b乘积比c小）

$b|c\;\land\; a|c\;\land\; (a,b)==1 \Rightarrow ab|c$

- 互素整体乘积仍然互素：

对于数组$a_i$、$b_j$，如果遍历i、j发现$(a_i,b_j)==1$，那么$(\prod_ia_i,\prod_jb_j)=1$

- 互素整数乘积是完美 $m$ 次幂时各因子也分别是完美 $m$ 次幂

如果存在一个整数$v$和一个内部两两互素的数组$(a_i,a_j)=1$，满足$v^m=\prod_i a_i$，那么$\sqrt[m]{a_i}\in Z$（是一个整数）

---

而对于LCM来说呢：

1. $a|b \Rightarrow [a,b]=b$
2. $[a,1]=[a,a]=a$
3. 如果数组$a_i$里面每一个$a_i$都满足$a_i|m$，那么$\Rightarrow [a_1,a_2,...,a_n]|m$
4. $[a,b,c][ab,bc,ac]=[a,b][b,c][a,c]$
5. $[a^n,b^n]=[a,b]^n$

这里用代数基本定理证明一下4。

$$
[a,b,c]=p_1^{\max(a,b,c)}p_2^{\max(a,b,c)}\dots
$$

$$
[ab,bc,ac]=p_1^{\max(ab,bc,ac)}p_2^{\max(ab,bc,ac)}\dots
$$

$$
\begin{align*}
    &\max(a,b,c)\times\max(ab,bc,ac)\\
    &=\max((a,b,c)\times(ab,bc,ac))\\
    &=\max(a^2b,abc,a^2c,ab^2,b^2c,abc,abc,bc^2,ac^2)\\
    &=\max((a,b)(b,c)(a,c))\\
    &=\max(a,b)\max(b,c)\max(a,c)
\end{align*}
$$

这个证明过程有点像 “多项式分解” 了。

---

以及最后一点奇妙公式：

1. $(a,b)[a,b]=ab$ (这个已经证明过了)
2. $(ab,bc,ac)[a,b,c]=|abc|$(这个类比上面去记忆就好了)
3. $\dfrac{(a,b,c)^2}{(a,b)(b,c)(a,c)}=\dfrac{[a,b,c]^2}{[a,b][b,c][a,c]}$

这里证明一下3：

简单来说，假设$a<b<c$，根据代数基本定理的观点，我们会发现：

两个数字之间的gcd以及lcm，基本上就是素数幂次的最大值-最小值；

移动到一边之后，我们会发现有这样的关系：a-b、b-c、a-c（幂次上的关系）

然后我们会发现：a-b+b-c=a-c（还是幂次上的关系）；

那么在这里的a、c其实就可以抽象为三个数字对应素数幂次上最大/最小的情况。

$$
[a,b,c]=p_1^{\max(a,b,c)}p_2^{\max(a,b,c)}\dots \\
(a,b,c)=p_1^{\min(a,b,c)}p_2^{\min(a,b,c)}\dots \\
\begin{align*}
    &\dfrac{(a,b,c)^2[a,b][b,c][a,c]}{[a,b,c]^2(a,b)(b,c)(a,c)}\\
\end{align*}
$$

## GCD的性质探究{.color-orange}

### 欧几里得算法

欧几里得算法是求GCD的一种算法，具体过程如下：

$$
\begin{align}
    a&=bq_1+r_1\\
    b&=r_1q_2+r_2\\
    r_1&=r_2q_3+r_3\\
    \vdots\nonumber\\
    r_{n-2}&=r_{n-1}q_{n}+r_{n}\\
    r_{n-1}&=q_{n}r_{n}
\end{align}
$$

先不问为什么要用除数除余数，先看过程。过程中根据带余除法的性质($r< b$)，我们观察到$0\leq r_{n}<r_{n-1}<r_{n-2}<...<r_{2}<r_{1}$。

这里不难看出，数列$r_n$的极限是0，这里我们令$r_{n+1}=0$，所以最后一个式子没有余数。

基于此，我们发现$r_n$把$r_{n-1}$整除了，而$r_{n-1}$和$r_{n}$又可以表示$r_{n-2}$，$r_{n-2}$和$r_{n-1}$可以表示$r_{n-3}$ …… 

这样递推下去，a、b都可以用$r_{n}$来表示：

$$
a=f(q_1,q_2,\dots,q_n)r_n\\
b=g(q_2,q_3,\dots,q_n)r_n
$$

~~因为量子力学~~，$f\neq g$，所以$r_n$就是$\gcd(a,b)$了。

要是硬想推公式证明 $f\neq g$ 也行，这里就不推了。

### 裴蜀定理 or 贝祖定理

基于欧几里得算法的过程：

$$
\begin{align*}
    a&=bq_1+r_1\\
    b&=r_1q_2+r_2\\
    r_1&=r_2q_3+r_3\\
    \vdots\nonumber\\
    r_{n-2}&=r_{n-1}q_{n}+r_{n}\\
    r_{n-1}&=q_{n}r_{n}
\end{align*}
$$

我们在前面发现：$a$、$b$都可以用$r_{n}$来表示。

那么这里我们从上往下看：第一个式子里面只有一个$r_1$是未知数，$r_1$可以用a、b表示，而第二个式子里面只有$r_2$是未知数，同样的可以用b+$r_1$表示。

……

这是熟悉的味道 —— 我们可以不断地通过如此的替换去用$a$、$b$得到$r_n$的表达式。

具体来说：

$$
\begin{align*}
    a &= bq_{1} + r_{1} \\
    r_{1} &= a - bq_{1} \\
    b &= r_{1}q_{2} + r_{2} \\ \nonumber &= (a - bq_{1})q_{2} + r_{2} \\
    r_{2} &= b - (a - bq_{1})q_{2}\\
    r_{1} &= r_{2}q_{3} + r_{3} \\ \nonumber &= (b - (a - bq_{1})q_{2})q_{3} + r_{3}\\
    \vdots\nonumber \\
    r_{n}&=F(q)a+G(q)b
\end{align*}
$$

因为$gcd(a,b)=r_n$，而且 F(q)、G(q)都是一些具体整数乘算的结果，我们这里令$q=F(q)$、$p=G(q)$；

那么我们便有了这个裴蜀定理：

对于任意正整数a、b，我们都存在整数p、q满足这个式子：$gcd(a,b)=qa+pb$。

### 基于裴蜀定理证明性质

上面我们说：$(a,b)=(a,b+k_1a)=(a+k_2b,b)$。
这个东西对于只是知道“带余除法”的我们，是很不显然的。

那么其实我们可以这样去看：

$$
gcd(a,b)=qa+pb=q_1a+p_1(b+k_1a)=q_2(a+k_2b)+p_2b
$$

省流来说，这里就是把a、b用其他的a、b函数来替代，从而达到一个类似 “向量换底表示” 的效果。

![向量的分解](../../../asset/docs/algorithm/number-theory/brain-surgen.md/image.png)

### 丢番图问题

在学习丢番图方程时，常从线性或简单二次形式入门，再逐步了解更复杂的高次或几何形式。

主要有以下类型：

- 线性丢番图：$ax+by=c$
- 多元线性丢番图：$a_{1}x_{1}+a_{2}x_{2}+a_{3}x_{3}+\cdots+a_{n-1}x_{n-1}+a_{n}x_{n}=c$
- 高次丢番图：$x^{n}+y^{n}=z^{n}$
  - 勾股定理：$x^{2}+y^{2}=z^{2}$
  - 大费马定理：$x^{n}+y^{n}=z^{n}\quad$ when $n>2$ the equation is invalid.
  - Pell方程（一个双曲线）：$x^{2}-Dy^{2}=1$
- 指数丢番图：$a^{x}+b^{y}=c^{z}$

相关问题：
椭圆方程上的有理点构造问题。
扩展欧几里得算法（线性情况）、连分数法（二次Pell方程）、Lattice-based 方法（格上求解）。

同余问题常涉及到二阶丢番图问题。

### 二阶丢番图由特解到通解

对于$ax + by = c$，如果（$\gcd(a,b) \mid c$） （也就是$c \% \gcd(a,b) = 0$）

> 注：这里的c也可能是的负的 …… 因为 …… 

如果我们能得到一个特解$x_{0}$、$y_{0}$，我可以很顺利地得到对应的整数通解，这一点类似微分方程的求法：

$$
\begin{align*}
 x&=x_{0}+\frac{b}{\gcd(a,b)}n\\
 y&=y_{0}-\frac{a}{\gcd(a,b)}n
\end{align*}
$$

这个式子是怎么来的呢？

试想：$x$每增加一个1 ，也即式子$x=x_{0}+n$ ，那么对应到等式中y就需要减少一个$\frac{a}{b}$

那么x每增加一个b，也即式子$x=x_{0}+bn$，那么对应到等式中y就需要减少一个$\frac{ab}{b}=a$

基于此，给x和y的系数同时除以$\gcd$，那么就可以得到**最小步长的通解公式**（因为这样算出来n的系数是最小的，再除别的什么就要出现分数了），保障不会漏掉什么通解。

但要是如果$\gcd(a,b) \nmid c$ （也就是$c \% \gcd(a,b) \neq 0$），那么就不会有任何一个点在格子点上，自然也不会有什么整数解 …… 一个解都没有！

上面的说明对应下面的图解 —— 为什么n前面是那样子系数呢？



<img src="../../../asset/docs/algorithm/number-theory/brain-surgen.md/二阶丢番图.png" 
     alt="二阶丢番图"
     style="display:block; margin:0 auto; width:50vw;" />

### 用欧几里得算法 求 丢番图特解

首先呢，我们知道$(a,b)=(a-b,b)=(a-2b,b)=(a-\lfloor\frac{a}{b}\rfloor b,b)=(b,a\mod b)$

然后结合裴蜀定理，我们知道$(a,b)=xa+yb=(b,a \mod b)=x_1b+y_1(a \mod b)$。

到这里都很丝滑，对吧？

然而，这个问题的“规模”虽然被缩小了，但是我们还是不能一眼看出$x_1$、$y_1$的解。

所以我们继续缩小问题，直到 —— 

$(a,b)=(b,a\mod b)=(a\mod b,b\mod (a\mod b))=...=(num,0)$

在重复计算了n次后，对于最后的结果$(num,0)$，我们写其裴蜀定理：$(num,0)=x_nnum+y_n0$

这个时候，你tm告诉我，$x_n$、$y_n$是多少？

$$
(num,0)=(num,num)=num=x_nnum+y_n0=x_nnum\\
x_n=\frac{num}{num}=1
$$

ok，既然$x_n$、$y_n$都能一眼丁真了，那么通过这个解以及GCD的性质$(a,b)=(b,a\mod b)$，求出式子 $(a,b)=xa+yb$ 里面的$x$、$y$呢？

换句话说，式子 $(a,b)=xa+yb=(b,a \mod b)=x_1b+y_1(a \mod b)$ 里面$x$、$y$、$x_1$、$y_1$ 之间的关系是什么？

$$
\begin{align*}
    &xa+yb=x_1b+y_1(a \mod b)\\
    &xa+yb=x_1b+y_1(a-\lfloor\frac{a}{b}\rfloor b)\\
    &xa+yb=ay_1+x_1b-y_1\lfloor\frac{a}{b}\rfloor b\\
    &xa+yb=ay_1+b(x_1-y_1\lfloor\frac{a}{b}\rfloor)\\
\end{align*}
$$

好了，我们更直接地把整个扩展欧几里得算法的过程写出来。
令$a_1=b,b_1=a\mod b$，随着计算的进行令为$a_2,b_2,a_3,b_3,\dots$ 以此类推。

$$
\begin{align*}
    (a,b)       \quad &(a,b)=xa+yb\\
    (b,a\mod b)\quad &(a_1,b_1)=x_1b+y_1(a\mod b)\\
    \vdots\\
    (num,0)\quad &(a_n,b_n)=x_nnum+y_n0
\end{align*}
$$

而每一层之间的关系是：

$$
xa+yb=ay_1+b(x_1-y_1\lfloor\frac{a}{b}\rfloor)\\
x_1a_1+y_1b_1=a_1y_2+b_1(x_2-y_2\lfloor\frac{a_1}{b_1}\rfloor)\\
\vdots\\
x_{n-1}a_{n-1}+y_{n-1}b_{n-1}=a_{n-1}y_{n}+b_{n-1}(x_{n}-y_{n}\lfloor\frac{a_{n-1}}{b_{n-1}}\rfloor)
$$

这样，我们就能通过递归Coding的方式去最终接触二阶丢番图的解了。

板子代码：

```cpp
using ll = long long ;
ll exgcd(ll a,ll b,ll& x,ll& y)
{
    if(b==0){
        x=1,y=0;
        return a;
    }
    ll d = exgcd(b,a%b,y,x);
    y = y-x*(a/b); //(*) 
    //这一步在n-1层，然后做的操作是 x_n - (a_{n-1}/b_{n-1})y_n
    return d;// 顺便返回公因数 GCD
}
```

求出了特解之后，我们就能按照之前在二阶丢番图那里写的通解公式去求出通解的表达式了。

这个代码也可以用于求余 —— 因为一元同余方程本质上可以写成二阶丢番图方程的。

然后你可能会好奇，**为什么一定是$y=0$呢？其他数行不行了**？
经过作者验证，其实是可以的 —— y=多少只决定了x、y最后算出来的绝对值有多少，y=0算出来的绝对值最小，最不容易溢出。

### 多元丢番图

多元丢番图方程，形如：

$$
a_1x_1+a_2x_2+...+a_nx_n=c
$$

当且仅当$\gcd(a_{1},a_{2},a_{3},\cdots,a_{n-1},a_{n}) \mid c$，这个方程组有tmd无数个解。

然后呢，像下面这样，从后往前依次求解就行了，其中$d_2=\gcd(a_1,a_2)$，其他的以此类推。

$$
\left\{
    \begin{aligned}
        &a_{1}x_{1}+a_{2}x=d_2t_2\\
        &d_{2}t_{2}+a_{2}x=d_3t_3\\
        &\vdots\\
        &d_{n-1}t_{n-1}+a_{n}x=d_nt_n
    \end{aligned}
\right.
$$

### 扩展欧几里得算法*

111





## Reference



![](../../../asset/docs/algorithm/number-theory/brain-surgen.md/6.21.png)
![](../../../asset/docs/algorithm/number-theory/brain-surgen.md/6.16.png)
![](../../../asset/docs/algorithm/number-theory/brain-surgen.md/6.15.png)



