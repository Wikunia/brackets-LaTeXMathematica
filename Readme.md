# LaTeXMathematica
This extension provides [WolframAlpha](http://wolframalpha.com) calculations inside your LaTeX document.

It's in a beta phase so there might be bugs parsing the WolframAlpha result into LaTeX code. These errors aren't WolframAlpha errors. If you notice some bug please try [WolframAlpha](http://wolframalpha) and if anything works correct, which should be the average case, it would be great if you can open an issue. Would be great if you can add your LaTeX file or the important part. I will try to solve it as fast as possible to improve this extension.

Thanks for using and testing this extension!

## How to use
Type a calculation inside your LaTeX document, enter a '=' after it and use the Shortcut 'Alt+M'.

i.e. 
```tex
\[
\begin{pmatrix} 2 & 2 \\ 5 & 4 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} = 
\]
\\
\[
\sum_{n=1}^n n =
\]
```
generates: 
```tex
\[
\begin{pmatrix} 2 & 2 \\ 5 & 4 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} = \begin{pmatrix}2 &  0 \\ 5 &  0\end{pmatrix}
\]
\\
\[
\sum_{n=1}^n n = \frac{n}{2}+\frac{n^2}{2}
\]
```

## Changelog
- 0.0.3  

> Generate tables  
> `Table[{x,\sin(x),\cos(x),x^2,x^3},{x,-2\pi,2\pi,\pi/2}] =`  
> ![table](https://cloud.githubusercontent.com/assets/4931746/3771347/26a429e6-18f4-11e4-9a7c-265dca02f0f7.png)


This extension uses the [WolframAlpha API](http://products.wolframalpha.com/api/).

### License
Creative Commons v3.0
[http://creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/)

### Terms of Use
- [WolframAlpha Terms of Use](http://www.wolframalpha.com/termsofuse.html)
- Results and information from this site are not a certified or definitive source of information that can be relied on for legal, financial, medical, life-safety, or any other critical purposes.



