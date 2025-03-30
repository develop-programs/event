import { atom } from "jotai";

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  buggyCode: string;
}

export interface Round {
  id: number;
  name: string;
  description: string;
  timeLimit: number; // in minutes
  problems: Problem[];
  isActive: boolean;
}

// Store rounds in an atom
export const roundsAtom = atom<Round[]>([
  {
    id: 1,
    name: "Round 1: Basic Debugging",
    description: "Fix bugs in basic algorithms and data structures",
    timeLimit: 30, // 30 minutes by default
    isActive: true,
    problems: [
      {
        id: 1,
        title: "Find the Maximum Subarray Sum",
        description:
          "Given an integer array, find the contiguous subarray with the largest sum and return its sum.\n\n" +
          "Example:\n" +
          "Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n" +
          "Output: 6\n" +
          "Explanation: The contiguous subarray [4, -1, 2, 1] has the largest sum = 6.",
        difficulty: "Medium",
        language: "C",
        buggyCode: `#include <stdio.h>
#include <limits.h>

int maxSubArray(int nums[], int size) {
    int max_so_far = 0;
    int max_ending_here = 0;
    
    for (int i = 0; i < size; i++) {
        max_ending_here = max_ending_here + nums[i];
        
        if (max_ending_here < 0)
            max_ending_here = 0;
            
        if (max_so_far < max_ending_here)
            max_so_far = max_ending_here;
    }
    
    return max_so_far; // This solution fails for arrays with all negative numbers
}`,
      },
      {
        id: 2,
        title: "Fizz Buzz Implementation",
        description:
          "Print numbers from 1 to n. But for multiples of 3, print 'Fizz' instead of the number, and for multiples of 5, print 'Buzz'. For numbers which are multiples of both 3 and 5, print 'FizzBuzz'.\n\n" +
          "Example output for n=15:\n" +
          "1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz",
        difficulty: "Easy",
        language: "Python",
        buggyCode: `def fizz_buzz(n):
    result = []
    for i in range(1, n+1):
        if i % 3 == 0 and i % 5 == 0:
            result.append("Fizz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizz_buzz(15))`,
      },
      {
        id: 3,
        title: "Binary Search Implementation",
        description:
          "Implement binary search to find the position of a target value within a sorted array.\n\n" +
          "Example:\n" +
          "Input: array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 7\n" +
          "Output: 6 (index of target in the array)",
        difficulty: "Easy",
        language: "Java",
        buggyCode: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length;
        
        while (left < right) {
            int mid = (left + right) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid;
            } else {
                right = mid;
            }
        }
        
        return -1; // Target not found
    }
    
    public static void main(String[] args) {
        int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int target = 7;
        System.out.println(binarySearch(array, target));
    }
}`,
      },
      {
        id: 4,
        title: "Check Palindrome String",
        description:
          "Write a function to check if a given string is a palindrome (reads the same backward as forward).\n\n" +
          "Example:\n" +
          "Input: 'racecar'\n" +
          "Output: true\n\n" +
          "Input: 'hello'\n" +
          "Output: false",
        difficulty: "Easy",
        language: "JavaScript",
        buggyCode: `function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    for (let i = 0; i < cleanStr.length / 2; i++) {
        if (cleanStr[i] !== cleanStr[cleanStr.length - i]) {
            return false;
        }
    }
    
    return true;
}

console.log(isPalindrome('racecar')); // Expected: true
console.log(isPalindrome('hello'));    // Expected: false`,
      },
      {
        id: 5,
        title: "Count Word Frequencies",
        description:
          "Write a function that takes a string of text and returns a map of word frequencies.\n\n" +
          "Example:\n" +
          "Input: 'the quick brown fox jumps over the lazy dog'\n" +
          "Output: {'the': 2, 'quick': 1, 'brown': 1, 'fox': 1, 'jumps': 1, 'over': 1, 'lazy': 1, 'dog': 1}",
        difficulty: "Medium",
        language: "Python",
        buggyCode: `def word_frequency(text):
    words = text.lower().split()
    frequency = {}
    
    for word in words:
        if word in frequency:
            frequency[word] += 1
        
    return frequency

# Test
text = "the quick brown fox jumps over the lazy dog"
print(word_frequency(text))`,
      }
    ],
  },
  {
    id: 2,
    name: "Round 2: Advanced Challenges",
    description: "Tackle more complex debugging scenarios",
    timeLimit: 45,
    isActive: false,
    problems: [
      {
        id: 1,
        title: "Valid Parentheses",
        description:
          "Write a function to determine if a string of parentheses is valid. The function should check if each opening bracket has a corresponding closing bracket in the correct order.\n\n" +
          "Example:\n" +
          "Input: '(())()'\n" +
          "Output: true\n\n" +
          "Input: '(()('\n" +
          "Output: false",
        difficulty: "Medium",
        language: "JavaScript",
        buggyCode: `function isValidParentheses(s) {
    const stack = [];
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            stack.pop();
        }
    }
    
    return stack.length === 0;
}

console.log(isValidParentheses('(())()')); // Should return true
console.log(isValidParentheses('(()('));   // Should return false`,
      },
      {
        id: 2,
        title: "Merge Two Sorted Lists",
        description:
          "Write a function that merges two sorted arrays into a new sorted array.\n\n" +
          "Example:\n" +
          "Input: [1, 3, 5], [2, 4, 6]\n" +
          "Output: [1, 2, 3, 4, 5, 6]",
        difficulty: "Medium",
        language: "C++",
        buggyCode: `#include <iostream>
#include <vector>

std::vector<int> mergeSortedArrays(const std::vector<int>& arr1, const std::vector<int>& arr2) {
    std::vector<int> result;
    int i = 0, j = 0;
    
    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] < arr2[j]) {
            result.push_back(arr1[i]);
            i++;
        } else {
            result.push_back(arr2[j]);
            i++;
        }
    }
    
    // Add remaining elements
    while (i < arr1.size()) {
        result.push_back(arr1[i]);
        i++;
    }
    
    while (j < arr2.size()) {
        result.push_back(arr2[j]);
        j++;
    }
    
    return result;
}

int main() {
    std::vector<int> arr1 = {1, 3, 5};
    std::vector<int> arr2 = {2, 4, 6};
    
    std::vector<int> merged = mergeSortedArrays(arr1, arr2);
    
    for (int num : merged) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
      },
      {
        id: 3,
        title: "First Non-Repeating Character",
        description:
          "Write a function that returns the first non-repeating character in a string.\n\n" +
          "Example:\n" +
          "Input: 'programming'\n" +
          "Output: 'p' (First non-repeating character)",
        difficulty: "Medium",
        language: "Python",
        buggyCode: `def first_non_repeating_character(s):
    char_count = {}
    
    # Count character occurrences
    for char in s:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    
    # Find first non-repeating character
    for char in char_count:
        if char_count[char] == 1:
            return char
            
    return None

# Test
print(first_non_repeating_character("programming"))  # Should return 'p'
print(first_non_repeating_character("aabb"))         # Should return None`,
      },
      {
        id: 4,
        title: "Rotate Array",
        description:
          "Write a function to rotate an array to the right by k steps.\n\n" +
          "Example:\n" +
          "Input: [1, 2, 3, 4, 5, 6, 7], k=3\n" +
          "Output: [5, 6, 7, 1, 2, 3, 4]",
        difficulty: "Medium",
        language: "Java",
        buggyCode: `public class RotateArray {
    public static void rotate(int[] nums, int k) {
        k = k % nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k);
        reverse(nums, k, nums.length - 1);
    }
    
    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end++;
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        rotate(nums, 3);
        for (int num : nums) {
            System.out.print(num + " ");
        }
    }
}`,
      },
      {
        id: 5,
        title: "Group Anagrams",
        description:
          "Write a function to group anagrams together from an array of strings.\n\n" +
          "Example:\n" +
          "Input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']\n" +
          "Output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]",
        difficulty: "Medium",
        language: "JavaScript",
        buggyCode: `function groupAnagrams(strs) {
    const result = {};
    
    for (let str of strs) {
        // Sort characters to use as key
        const sortedStr = str.split('').sort();
        
        // Group strings with same sorted pattern
        if (result[sortedStr]) {
            result[sortedStr].push(str);
        } else {
            result[sortedStr] = [str];
        }
    }
    
    return Object.values(result);
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));`,
      }
    ],
  },
]);

// Keep the original errorProblems atom for backward compatibility
export const errorProblems = atom<Problem[]>((get) => {
  const rounds = get(roundsAtom);
  const activeRound = rounds.find(round => round.isActive);
  return activeRound ? activeRound.problems : [];
});

// Current active round
export const currentRoundAtom = atom<Round | null>((get) => {
  const rounds = get(roundsAtom);
  return rounds.find(round => round.isActive) || null;
});

// Track timer state
export const roundTimerAtom = atom<{
  endTime: number | null;
  timeRemaining: number | null;
  isRunning: boolean;
}>({
  endTime: null,
  timeRemaining: null,
  isRunning: false,
});

// Admin status
export const isAdminAtom = atom<boolean>(false);

// Track answers
export const errorAnswers = atom<{ [key: number]: string }>({});
export const errorSubmitted = atom(false);
export const errorSelectedAnswers = atom<{ [key: number]: string }>({});
