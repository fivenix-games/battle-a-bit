https://chatgpt.com/share/68694433-33e0-8003-a231-8afc29f6012e

Game Step-by-step after players are connected - 
1. Server randomly assigns Attack and Defence phases to the players.
2. 30 second timer starts for both players. This is Setup Phase for the Game. Players cannot see each others Planes or Buildings in this Phase.
3. Attacker - has planes, selects a plane, selects a tile to attack. Defender - has buildings, selects a building, selects a tile to place the building.
4. Both players can select 'Ready' before the timer runs out to indicate they are ready. Once timer runs out, they are ready by force, regardless of their setup.
5. After both players are ready, Action Phase starts for the Game. In Action Phase, the Planes attack. Both Players now can see which Tiles are being attacked.
6. One by one, each plane completes its attack on the designated tile. This can be animated.
7. If an attacked tile has a building, the building takes damage depending on the plane that attacked it. The Building is visible to the Attacker only if he attacks a tile which has a building on it.
8. Once all planes have completed their attacks, all buildings damage is calculated and finalized. Action Phase ends.
9. Player roles switch - Attacker becomes Defender and vice versa.
10. Steps 2 to 9 repeats.
11. This completes a Turn of the Game - A Turn consists of two Setup Phases, each Setup Phase gives the players ability to attack and defend one time. Before next turn begins, Game Over and Game Win logic is checked.
12. Once a Turn is complete, Setup Phase timer reduces to 10 seconds. It will reset to 10 seconds for each Setup Phase here on.
13. After the 1st Turn, the Defender player will always have access to Healers, Turrets and Shields. Only one of them can be used per Turn. These can be used on the buildings to heal, counter-attack or increase strength repsectively. They have to placed on the same tile where a building is already placed. The exact values are to be finalized.
14. The Game will have maximum 10 Turns.
15. The Game is Over if - All Buildings are destroyed for any one of the players.
                        - Turn 10 is finished.
16. A Player Wins the Game if - He destroys opponent's all buildings.
                              - Turn 10 is finished, and opponent's buildings has more damage in total than the player's buildings.
17. The Game is Drawn if - After Turn 10, both players' buildings have the exact same damage in total.
18. Numbers will be rounded to whole numbers, no decimals allowed.