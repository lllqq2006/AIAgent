import matplotlib.pyplot as plt
import random

should_show = True

count = 10
if should_show:
    plt.figure(figsize=(8, count))
    plt.title("Bubble Sort Algorithm")
    plt.xlabel("label")
    plt.ylabel("value")
    plt.grid(axis='y', alpha=0.3)

def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                if should_show:
                    plt.clf()
                    plt.bar(range(len(arr)), arr, color='blue')
                    plt.pause(0.001)
        if not swapped:
            break
    return arr

def insert_sort(arr):
    n = len(arr)
    for i in range(1,n):
        j = i
        while( j - 1 >= 0 and arr[j] < arr[j-1]):
            arr[j], arr[j-1] = arr[j-1], arr[j]
            j -= 1
            if should_show:
                plt.clf()
                plt.bar(range(len(arr)), arr, color='green')
                plt.pause(0.5)
    return arr

if __name__ == "__main__":
    sample = [random.randint(1, count) for _ in range(count)]
    print("Original array:", sample)
    #print(bubble_sort(sample))
    print(insert_sort(sample))
