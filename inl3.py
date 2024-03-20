import random

guess_list = []

rounds_played = []

marked_numbers = []

points_in_round = []

round_count = 0
def max_boll():
    print("Max gillar att kolla på bollar")


def max_boll():
    print("Max gillar att kolla på bollar")
def main():
    '''Huvudfunktion som kör programmet, användare kan välja mellan att spela bingo, visa statistik eller avsluta i menyn'''
    global round_count
    title("Välkommen till Bingo!")
    while True:
        menu()
        menu_input = input("Ditt val: ")
        if menu_input == "1":
            bingo_board = make_bingo_board()
            while True:
                clear_board()
                bingo_user_guess()
                title("Dragning")
                print_user_numbers(guess_list)
                bingo_draw(bingo_board)
                print_bingo_board(bingo_board)
                round_count += 1
                round_points = compare_numbers()
                print_result(round_points)
                get_rounds()
                guess_clear()
                break         
        elif menu_input == "2":
            statistics()
        elif menu_input == "3":
            break
        else:
            print("Felaktig inmatning, försök igen")



def title(message):
    '''Återanvändbar funktion som skriver ut ett meddelande'''
    print("=" * 40)
    print(message)

def menu():
    print("=" * 40)
    print("Välj ett utav alternativen")
    print("1) Spela Bingo")
    print("2) Statistik")
    print("3) Avsluta")

def make_bingo_board():
    '''Funktion som används för att skicka in bingobrädet när det anropas, särskilt viktig för att rensa brädet inför nytt spel'''
    return [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25]
    ]

def print_bingo_board(bingo_board):
    '''Funktion som skriver ut bingobrädet och stylar det'''
    print("=" * 40)
    print("  B    I    N    G    O")
    for row in bingo_board:
        print("-" * 25)
        for number in row:
            print(f"{number:^5}", end="")
        print("")
    print("-" * 25)


def bingo_user_guess():
    '''Funktion om hämtar in användarens gissade nummer och kontrollerar att inmatningen är godkänd'''
    global guess_list
    print("=" * 40)
    guess_list = []
    while len(guess_list) < 5: 
        user_input = input("Ange 5 siffror [1-25] (avgränsa med ','): ")
        user_digits = user_input.split(',')
        if len(user_digits) != 5:
            print('Var god ange 5 siffror.')
            continue
        
        try:
            user_digits = [int(digit) for digit in user_digits]
        except ValueError:
            print('Alla gissningar ska vara heltal.')
            continue
        
        if any(digit < 1 or digit > 25 for digit in user_digits):
            print('Alla siffror måste vara inom intervallet 1 till 25.')
            continue
        
        if len(set(user_digits)) != 5:
            print('Det får inte finnas dubbletter i dina gissningar.')
            continue
        
        guess_list.extend(user_digits)
        print('Dina gissningar har lagts till.')



def print_user_numbers(guess_list):
    '''Funktion som skriver ut användarens nummer'''
    print("=" * 40)
    print("Dina bingonummer:")       
    for number in guess_list:
        print(number, end=" ")
    print("") 

def bingo_draw(bingo_board):
    '''Funktion som sparar tio slumpade siffror i listan marked_numbers med hjälp av funktionen random_bingo_number'''
    original_board = [row[:] for row in bingo_board]
    while len(marked_numbers) < 10:
        winning_number = random_bingo_number()
        if winning_number not in marked_numbers:
            marked_numbers.append(winning_number)
            mark_number_on_board(winning_number, bingo_board, original_board)


def random_bingo_number():
    '''Slumpar fram en siffra mellan 1 och 25'''
    return random.randint(1, 25)

def mark_number_on_board(number, bingo_board, original_board):
    '''Funktion som lägger till [] på de dragna siffrorna'''
    for row_index, row in enumerate(bingo_board):
        if number in row:
            index = row.index(number)
            original_number = original_board[row_index][index]
            if original_number != "[" + str(number) + "]":
                row[index] = "[" + str(number) + "]"
            break

def compare_numbers():
    '''Funktion som kollar ifall användarens nummer matchar slumpade nummer och sparar antalet poäng för rundan i listan points_in_round'''
    global guess_list
    global marked_numbers
    global points_in_round

    common_numbers = set(guess_list).intersection(set(marked_numbers))
    round_points = len(common_numbers)
    
    points_in_round.append(round_points)
    return round_points

def print_result(round_points):
    '''Skriver ut hur många poäng användaren fick under rundan'''
    if round_points == 5:
        print(f"BINGO! Du fick {round_points} poäng")
    else:
        print (f"Dina poäng: {round_points}")

def get_rounds():
    '''Funktion som sparar antalet rundor som användaren spelat i listan rounds_played'''
    global round_count
    rounds_played.append(round_count)
            
def guess_clear():
    '''Funktion som rensar användarens gissningar efter avslutad runda'''
    guess_list.clear()

def clear_board():
    '''Funktion som rensar bingobrädet inför ny runda'''
    marked_numbers.clear()

def statistics():
    '''Funktion som skriver ut statistiken för varje spelad runda'''
    global points_in_round
    
    print("=" * 40)
    print("Statistik")
    print("=" * 40)
    
    for game_number, points in enumerate(points_in_round, start=1):
        print(f"Spel {game_number}: {points} poäng")

main()