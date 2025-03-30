# Coding Corporation Challenges

## Problem 1: Array Manipulation (C)

### Problem Statement:
Write a function that reverses an array of integers in-place.

### Buggy Code (Fix the errors):
```c
void reverseArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        int temp = arr[i];
        arr[i] = arr[size - i];
        arr[size - i] = temp;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;
    reverseArray(arr, size);
    
    printf("Reversed array: ");
    for (int i = 0; i <= size; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}
```

### Your Solution:
```c
// Write your corrected code here




```

---

## Problem 2: String Processing (Python)

### Problem Statement:
Write a function that counts the frequency of each word in a given string and returns a dictionary with the word counts.

### Buggy Code (Fix the errors):
```python
def word_frequency(text):
    words = text.split()
    frequency = {}
    
    for word in word:
        word = word.lower()
        if words in frequency:
            frequency[word] += 1
        else:
            frequency[word] = 1
    
    return word_frequency

sample_text = "The quick brown fox jumps over the lazy dog. The dog barks."
print(word_frequency(text))
```

### Your Solution:
```python
# Write your corrected code here




```

---

## Problem 3: Linked List Operations (C)

### Problem Statement:
Implement a function to detect if a linked list has a cycle.

### Buggy Code (Fix the errors):
```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

int hasCycle(struct Node* head) {
    if (head = NULL)
        return 0;
    
    struct Node* slow = head;
    struct Node* fast = head;
    
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow = fast)
            return 1;
    }
    
    return 0;
}
```

### Your Solution:
```c
// Write your corrected code here




```

---

## Problem 4: Recursion Challenge (Python)

### Problem Statement:
Write a recursive function to calculate the nth Fibonacci number.

### Buggy Code (Fix the errors):
```python
def fibonacci(n):
    if n = 0:
        return 0
    if n = 1:
        return 1
    
    return fibonacci(n+1) + fibonacci(n+2)

# Test
for i in range(10):
    print(fibonacci(n))
```

### Your Solution:
```python
# Write your corrected code here




```

---

## Problem 5: Sorting Algorithm (C)

### Problem Statement:
Implement the Bubble Sort algorithm to sort an array of integers in ascending order.

### Buggy Code (Fix the errors):
```c
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr);
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    return 0;
}
```

### Your Solution:
```c
// Write your corrected code here




```

---

## Problem 6: File Handling (Python)

### Problem Statement:
Write a program that reads a text file, counts the occurrences of each character, and writes the results to another file.

### Buggy Code (Fix the errors):
```python
def count_characters(filename, output_filename):
    char_count = {}
    
    with open(filename, 'r') as file:
        text = file.read
        for char in text:
            if char in char_count:
                char_count[char] += 1
            else
                char_count[char] = 1
    
    with open(output_filename, 'w') as output:
        for char, count in char_count:
            output.write(f"{char}: {count}\n")

count_characters("input.txt", "output.txt")
```

### Your Solution:
```python
# Write your corrected code here




```

---

## Problem 7: Memory Management (C)

### Problem Statement:
Write a program that dynamically allocates memory for an array of integers, populates it, and then properly frees the memory.

### Buggy Code (Fix the errors):
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int* arr;
    
    arr = malloc(n);
    
    for (int i = 0; i < n; i++) {
        arr[i] = i * 2;
    }
    
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    return 0;
}
```

### Your Solution:
```c
// Write your corrected code here




```

---

## Problem 8: Algorithm Efficiency (Python)

### Problem Statement:
Optimize a function that finds all prime numbers up to n using the Sieve of Eratosthenes algorithm.

### Buggy Code (Fix the errors):
```python
def find_primes(n):
    primes = []
    sieve = [True] * n
    
    for i in range(2, n):
        if sieve[i] == True:
            primes.append(i)
            for j in range(i, n):
                if j % i == 0:
                    sieve[j] = False
    
    return primes

print(find_primes(50))
```

### Your Solution:
```python
# Write your corrected code here




```
