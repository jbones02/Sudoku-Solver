import puzzle
import requests

# Use Dosuku API to generate random puzzle
response = requests.get('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}')
response_puzzle = (response.json().get('newboard').get('grids'))[0].get('value')  # Extract puzzle from response
puzzle_to_solve = puzzle.Puzzle(response_puzzle)

# Print unsolved puzzle
print('Unsolved Puzzle:')
puzzle_to_solve.print()
print()
print('-----------------------------------------------')
print()

puzzle_to_solve.solve()  # Solve Puzzle

# Print Solved Puzzle
print('Solved Puzzle:')
puzzle_to_solve.print()