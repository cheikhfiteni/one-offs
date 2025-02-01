from constraint import Problem, AllDifferentConstraint
from functools import reduce
import logging

logging.basicConfig(level=logging.DEBUG)
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

def get_box_solutions(initial_grid, box_row, box_col):
    """Get all valid solutions for a 3x3 box considering the whole board context
    box_row, box_col: 0-2 indicating which box we're solving"""
    
    problem = Problem()
    
    # Create variables for each cell in the box
    for i in range(3):
        for j in range(3):
            cell_name = f'box_{i}_{j}'
            # Get global position
            global_row = box_row * 3 + i
            global_col = box_col * 3 + j
            
            # Check row and column constraints
            forbidden_values = set()
            # Check row
            for k in range(9):
                if k < box_col * 3 or k >= box_col * 3 + 3:  # Outside our box
                    if initial_grid[global_row][k] is not None:
                        forbidden_values.add(initial_grid[global_row][k])
            # Check column
            for k in range(9):
                if k < box_row * 3 or k >= box_row * 3 + 3:  # Outside our box
                    if initial_grid[k][global_col] is not None:
                        forbidden_values.add(initial_grid[k][global_col])
            
            if initial_grid[global_row][global_col] is not None:
                problem.addVariable(cell_name, [initial_grid[global_row][global_col]])
            else:
                allowed_values = [x for x in range(10) if x not in forbidden_values]
                problem.addVariable(cell_name, allowed_values)
    
    # Add AllDifferent constraint for the box
    problem.addConstraint(AllDifferentConstraint(), 
                         [f'box_{i}_{j}' for i in range(3) for j in range(3)])
    
    return problem.getSolutions()

def create_sudoku_solver(initial_grid):
    problem = Problem()
    logger.info("Creating Sudoku solver with 0-9 domain...")
    
    def print_partial(*args):
        # The constraint receives all variables as separate arguments
        if len(args) >= 81:  # We have a full board worth of assignments
            board = [[None]*9 for _ in range(9)]
            for idx, val in enumerate(args[:81]):  # Take first 81 arguments
                i, j = idx // 9, idx % 9
                board[i][j] = val if val is not None else '_'
            logger.info("\nPartial solution attempt:")
            for row in board:
                logger.info(" ".join(str(x) if x is not None else '_' for x in row))
        return True
    
    # First, get all valid solutions for the three independent boxes
    boxes_to_solve = [
        (0, 1),  # top middle
        (1, 2),  # middle right
        (2, 0)   # bottom left
    ]
    
    box_solutions = {}
    for box_row, box_col in boxes_to_solve:
        logger.info(f"Finding solutions for box ({box_row},{box_col})")
        box_solutions[(box_row, box_col)] = get_box_solutions(initial_grid, box_row, box_col)
        logger.info(f"Found {len(box_solutions[(box_row, box_col)])} solutions for box ({box_row},{box_col})")
    
    # Now create variables for the main problem
    for i in range(9):
        for j in range(9):
            if initial_grid[i][j] is not None:
                logger.info(f"Fixed value at ({i},{j}): {initial_grid[i][j]}")
                problem.addVariable(f'cell_{i}_{j}', [initial_grid[i][j]])
            else:
                problem.addVariable(f'cell_{i}_{j}', range(10))

    # Add the printing callback with all variables
    vars_list = [f'cell_{i}_{j}' for i in range(9) for j in range(9)]
    problem.addConstraint(print_partial, vars_list)

    # Add row constraints
    for i in range(9):
        problem.addConstraint(AllDifferentConstraint(), 
                            [f'cell_{i}_{j}' for j in range(9)])

    # Add column constraints  
    for j in range(9):
        problem.addConstraint(AllDifferentConstraint(),
                            [f'cell_{i}_{j}' for i in range(9)])

    # Add constraints for non-independent boxes
    for box_i in range(3):
        for box_j in range(3):
            if (box_i, box_j) not in boxes_to_solve:
                box_vars = []
                for i in range(3):
                    for j in range(3):
                        box_vars.append(f'cell_{box_i*3 + i}_{box_j*3 + j}')
                problem.addConstraint(AllDifferentConstraint(), box_vars)

    # Add constraints for the pre-solved boxes
    def box_constraint(box_row, box_col, *values):
        box_values = []
        for i in range(3):
            for j in range(3):
                box_values.append(values[i*3 + j])
        box_tuple = tuple(box_values)
        valid_solutions = [(tuple(sol[f'box_{i}_{j}'] for i in range(3) for j in range(3))) 
                          for sol in box_solutions[(box_row, box_col)]]
        is_valid = box_tuple in valid_solutions
        logger.debug(f"Box ({box_row},{box_col}) checking {box_tuple} - {'Valid' if is_valid else 'Invalid'} " + 
                    f"(out of {len(valid_solutions)} possibilities)")
        return is_valid

    # Add the pre-solved box constraints
    for box_row, box_col in boxes_to_solve:
        box_vars = []
        for i in range(3):
            for j in range(3):
                box_vars.append(f'cell_{box_row*3 + i}_{box_col*3 + j}')
        problem.addConstraint(lambda *v, r=box_row, c=box_col: box_constraint(r, c, *v), 
                            box_vars)

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

def print_board(board, gcd=None, success=False):
    GREEN = '\033[92m'
    RESET = '\033[0m'
    
    if success:
        print(f"\n{GREEN}Found valid solution with GCD: {gcd}{RESET}")
        print(f"{GREEN}Final board:{RESET}")
        for i, row in enumerate(board):
            if i % 3 == 0 and i != 0:
                print(f"{GREEN}-" * 21 + RESET)
            row_str = ""
            for j, val in enumerate(row):
                if j % 3 == 0 and j != 0:
                    row_str += "| "
                row_str += str(val) + " "
            print(f"{GREEN}{row_str}{RESET}")
    else:
        print("\nPartial board:")
        for i, row in enumerate(board):
            if i % 3 == 0 and i != 0:
                print("-" * 21)
            row_str = ""
            for j, val in enumerate(row):
                if j % 3 == 0 and j != 0:
                    row_str += "| "
                row_str += str(val) + " "
            print(row_str)

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
    board = format_board(best_solution)
    print_board(board, max_gcd, success=True)  # Print the first valid solution in green
    return board, max_gcd

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