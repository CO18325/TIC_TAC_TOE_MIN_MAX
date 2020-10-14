# TIC TAC TOE
## INDERPREET SINGH
### inderpreet221099@gmail.com

<hr>


## INTRODUCTION

<p>

    Tic-tac-toe, noughts and crosses, or Xs and Os, is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. It is a solved game with a forced draw assuming best play from both players.In order to win the game, a player must place three of their marks in a horizontal, vertical, or diagonal row. Players soon discover that the best play from both parties leads to a draw. Hence, tic-tac-toe is most often played by young children, who often have not yet discovered the optimal strategy.

</p>

## MIN MAX ALGORITHM

<p>
<ol>
    <li>
        Mini-max algorithm is a recursive or backtracking algorithm which is used in decision-making and game theory. It provides an optimal move for the player assuming that opponent is also playing optimally.
    </li>
    <li>
        Mini-Max algorithm uses recursion to search through the game-tree.
    </li>
    <li>
        Min-Max algorithm is mostly used for game playing in AI. Such as Chess, Checkers, tic-tac-toe, go, and various tow-players game. This Algorithm computes the minimax decision for the current state.
    </li>
    <li>
        In this algorithm two players play the game, one is called MAX and other is called MIN.
    </li>
    <li>
        Both the players fight it as the opponent player gets the minimum benefit while they get the maximum benefit.
    </li>
    <li>
        Both Players of the game are opponent of each other, where MAX will select the maximized value and MIN will select the minimized value.
    </li>
    <li>
        The minimax algorithm performs a depth-first search algorithm for the exploration of the complete game tree.
    </li>
    <li>
        The minimax algorithm proceeds all the way down to the terminal node of the tree, then backtrack the tree as the recursion.
    </li>

</ol>
</p>

<hr>

## ALGORITHM

```
function minimax(node, depth, maximizingPlayer) is  
if depth ==0 or node is a terminal node then  
return static evaluation of node  
  
if MaximizingPlayer then      // for Maximizer Player  
maxEva= -infinity            
 for each child of node do  
 eva= minimax(child, depth-1, false)  
maxEva= max(maxEva,eva)        //gives Maximum of the values  
return maxEva  
  
else                         // for Minimizer player  
 minEva= +infinity   
 for each child of node do  
 eva= minimax(child, depth-1, true)  
 minEva= min(minEva, eva)         //gives minimum of the values  
 return minEva  


```