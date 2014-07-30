# LaTeXMathematica
This extension provides [WolframAlpha](http://wolframalpha.com) calculations inside your LaTeX document.

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

This extension uses the [WolframAlpha API](http://products.wolframalpha.com/api/).

### License
Creative Commons v3.0
[http://creativecommons.org/licenses/by/3.0/](http://creativecommons.org/licenses/by/3.0/)

