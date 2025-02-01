from constraint import Problem, AllDifferentConstraint
from functools import reduce
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def gcd(a, b):
    if a == 0:
        return b
    if b == 0:
        return a
    while b:
        a, b = b, a % b
    return a

def find_gcd_list(numbers):
    return reduce(gcd, numbers)

def create_sudoku_solver(initial_grid):
    problem = Problem()
    logger.info("Creating Sudoku solver with 0-9 domain...")
    
    # Define variables and domains (now 0-9 instead of 1-9)
    for i in range(9):
        for j in range(9):
            if initial_grid[i][j] is not None:
                logger.info(f"Fixed value at ({i},{j}): {initial_grid[i][j]}")
                problem.addVariable(f'cell_{i}_{j}', [initial_grid[i][j]])
            else:
                problem.addVariable(f'cell_{i}_{j}', range(10))  # 0-9 inclusive

    def print_partial(*args):
        # The constraint receives all variables as separate arguments
        if len(args) >= 81:  # We have a full board worth of assignments
            board = [[None]*9 for _ in range(9)]
            for idx, val in enumerate(args[:81]):  # Take first 81 arguments
                i, j = idx // 9, idx % 9
                board[i][j] = val if val is not None else '_'
            logger.info("\nPartial solution attempt:")
            for row in board:
                logger.info(" ".join(str(x) for x in row))
        return True

    logger.info("Adding constraints...")
    # Add row constraints
    for i in range(9):
        problem.addConstraint(AllDifferentConstraint(), 
                            [f'cell_{i}_{j}' for j in range(9)])

    # Add column constraints  
    for j in range(9):
        problem.addConstraint(AllDifferentConstraint(),
                            [f'cell_{i}_{j}' for i in range(9)])

    # Add 3x3 box constraints
    for box_i in range(3):
        for box_j in range(3):
            box_vars = []
            for i in range(3):
                for j in range(3):
                    box_vars.append(f'cell_{box_i*3 + i}_{box_j*3 + j}')
            problem.addConstraint(AllDifferentConstraint(), box_vars)

    # Add the printing callback with all variables
    vars_list = [f'cell_{i}_{j}' for i in range(9) for j in range(9)]
    problem.addConstraint(print_partial, vars_list)

    return problem

def get_row_values(solution, row):
    return [solution[f'cell_{row}_{j}'] for j in range(9)]

def find_best_solution(solutions):
    logger.info(f"Found {len(solutions)} valid solutions")
    max_gcd = 0
    best_board = None
    
    for idx, solution in enumerate(solutions):
        if idx % 100 == 0:
            logger.info(f"Processing solution {idx}")
        
        min_row_gcd = float('inf')
        
        # Find the minimum GCD among all rows
        for i in range(9):
            row_values = get_row_values(solution, i)
            row_gcd = find_gcd_list(row_values)
            min_row_gcd = min(min_row_gcd, row_gcd)
        
        # Update best solution if this one has a higher minimum GCD
        if min_row_gcd > max_gcd:
            max_gcd = min_row_gcd
            best_board = solution
            logger.info(f"New best solution found with GCD: {max_gcd}")

    return best_board, max_gcd

def format_board(solution):
    board = []
    for i in range(9):
        row = []
        for j in range(9):
            row.append(solution[f'cell_{i}_{j}'])
        board.append(row)
    return board

def solve_sudoku(initial_grid):
    logger.info("Starting Sudoku solver...")
    problem = create_sudoku_solver(initial_grid)
    
    logger.info("Finding solutions...")
    solutions = problem.getSolutions()
    
    if not solutions:
        logger.error("No valid solutions found!")
        return None, 0
    
    logger.info("Finding solution with best GCD...")
    best_solution, max_gcd = find_best_solution(solutions)
    return format_board(best_solution), max_gcd

def print_board(board):
    print("\nFinal board:")
    for i, row in enumerate(board):
        if i % 3 == 0 and i != 0:
            print("-" * 21)
        row_str = ""
        for j, val in enumerate(row):
            if j % 3 == 0 and j != 0:
                row_str += "| "
            row_str += str(val) + " "
        print(row_str)

if __name__ == "__main__":
    initial_grid = [
        [None, None, None, None, None, None, None, 2,  None],  # Row 0
        [None, None, None, None, None, None, None, None,  5],  # Row 1
        [None, 2, None, None, None, None, None, None, None],  # Row 2
        [None, None, 0, None, None, None, None, None, None],  # Row 3
        [None, None, None, None, None, None, None, None, None],  # Row 4
        [None, None, 2, None, None, None, None, None, None],  # Row 5
        [None, None, None, None, 0, None, None, None, None],  # Row 6
        [None, None, None, None, None, 2, None, None, None],  # Row 7
        [None, None, None, None, None, None, 5, None, None],     # Row 8
    ]

    solution_board, max_gcd = solve_sudoku(initial_grid)
    
    if solution_board:
        print("Solution with maximum row GCD:")
        print_board(solution_board)
        print(f"\nMaximum GCD across all rows: {max_gcd}")
    else:
        print("No solution exists") 