using namespace std;
#include <string>
#include <iostream>
#include <climits>
#include "atoi.h"

namespace LeetCode
{
	int myatoi(std::string s)
	{
		char array[200] = {-1};

		int step = 0;
		int currentIndex = 0;
		int currentCount = 0;
		for(int i = 0; i < s.length(); i++)
		{
			if(s[i] == ' ')
			{
				continue;
			}
			else
			{
				currentIndex = i;
				break;
			}
		}
		step = 1;

		for (int i = currentIndex; i < s.length(); i++)
		{
			if (step == 1 &&(s[i] == '-' || s[i] == '+'))
			{
				step = 2;
				array[currentCount] = s[i];
				currentCount++;
			}
			else if (s[i] >= '0' && s[i] <= '9')
			{
				if (step == 1)
				{
					step = 2;
				}
				array[currentCount] = s[i];
				currentCount++;
			}
			else
			{
				break;
			}
		}

		for (int i = 0; i < currentCount; i++)
		{
			cout << array[i] << endl;
		}
		
		int sign = 1;
		long long sum = 0;
		bool overlimit = false;
		for (int i = 0; i < currentCount; i++)
		{
			if (array[i] == '-')
			{
				sign = -1;
				continue;
			}
			if (array[i] == '+')
			{
				continue;
			}
			sum = sum * 10 + (array[i] - '0');

			if (sign == 1 && sum > INT_MAX)
			{
				overlimit = true;
				sum = INT_MAX;
				break;
			}
			if (sign == -1 && -sum < INT_MIN)
			{
				overlimit = true;
				sum = INT_MIN;
				break;
			}
		}

		if (overlimit)
		{
			return (int)sum;
		}

		return (int)(sign * sum);
	}

	int atoi(std::string s)
	{
		int cur = 0, sign = 1, res = 0;
		//处理空格
		while( cur < s.length() && s[cur] == ' ')
		{
			cur++;
		}
		//处理符号
		if(cur < s.length() && (s[cur] == '+' || s[cur] == '-'))
		{
			sign = (s[cur] == '-') ? -1 : 1;
			cur++;
		}

		//处理数字
		while(cur < s.length() && isdigit(s[cur]))
		{
			int digit = s[cur] - '0';
			//处理溢出
			if(res > (INT_MAX - digit) / 10)
			{
				return (sign == 1) ? INT_MAX : INT_MIN;
			}
			res = res * 10 + digit;
			cur++;
		}
		return res * sign;

	}

	vector<vector<int>> threeSum(vector<int>& nums) {
        vector<int> temp;
		vector<vector<int>> result;
		temp = nums.sort();
    }
}