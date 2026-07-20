// LeetCode.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <algorithm>
#include "./atoi.h"

int lengthOfLongestSubstring(std::string s) {
    int start = 0, end = 1;
    int maxlength = 0;
    int n = s.length();
	if (s.length() == 0)
	{
		return 0;
	}
	if (s.length() == 1)
	{
		return 1;
	}
    while (end < n)
    {
        if (start == end)
        {
            end++;
            maxlength = std::max(maxlength, end - start);
        }
        else
        {
            for (int i = start; i < end; i++)
            {
                if (s[i] == s[end])
                {
                    start = i + 1;
                    break;
                }
            }
            end++;
            maxlength = std::max(maxlength, end - start);
        }
    }

    return maxlength;
}

int main()
{
    std::cout << myatoi("-23");
    std::cout << "\n";
}



// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
