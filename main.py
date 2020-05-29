import csv


def add():
    with open('new.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        next = True
        while next:
            print("English:")
            vocab = input()
            print("English meaning:")
            eng_m = input()
            print("Chinese meaning:")
            chi_m = input()
            writer.writerow([vocab, eng_m, chi_m])
            next = input() != "q"

def read():
    with open('new.csv', 'r') as csvfile:
        rows = csv.reader(csvfile)
        for each in rows:
            print(each)

add()