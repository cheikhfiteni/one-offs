# somewhat square sudoku

Problem: https://www.janestreet.com/puzzles/current-puzzle/ 

## Helpful Leads

- https://opensourc.es/blog/sudoku/ Gave me the idea to use constraint programming (and not neccessarily a MIP)
- Euclidean Algorithm for fast GCD https://www.geeksforgeeks.org/time-complexity-of-euclidean-algorithm/ 

## Current Solver Optimizations

1. Precompute and cache box solutions (top middle, middle right, bottom left) to reduce search space
2. Constraint program sudoku solving, using python-constraint (Z3 or ortools might be faster?)
3. Skips even numbers and multiples of 5 when calculating GCD between rows
4. TODO: Considering memoization of gcd through union on prime factorization, on each unique row. Weigh worse case memory costs against gcd compute costs.

