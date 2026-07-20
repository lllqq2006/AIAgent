using namespace std;
#include <string>
#include <iostream>
#include <algorithm>
#include <vector>
#include "atoi.h"

namespace LeetCode {

	int myatoi(std::string s)
	{
		char array[200] = { -1 };

		int step = 0;
		int currentIndex = 0;
		int currentCount = 0;
		for (int i = 0; i < s.length(); i++)
		{
			if (s[i] == ' ')
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
			if (step == 1 && (s[i] == '-' || s[i] == '+'))
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

		int sum = 0;
		int presum = 0;
		bool overlimit = false;
		for (int i = 0; i < currentCount; i++)
		{
			if ((array[i] == '-' || array[i] == '+'))
			{
				continue;
			}
			sum = sum * 10 + (array[i] - '0');

		}

		return sum;
	}

	vector<vector<int>> threeSum(vector<int>& nums) {
		vector<vector<int>> result;
		std::sort(nums.begin(), nums.end());
		for (int i = 0; i <= nums.size() - 3; i++)
		{
			if (nums[i] > 0)
			{
				break;
			}

			if (i > 0 && nums[i] == nums[i - 1])
			{
				continue;
			}

			int start = i + 1, end = nums.size() - 1;

			while (start < end)
			{
				if (nums[i] + nums[start] + nums[end] == 0)
				{
					vector<int> temp = { nums[i], nums[start], nums[end] };
					result.push_back(temp);
					while (start < end && nums[start] == nums[start + 1])
					{
						start++;
					}
					while (start < end && nums[end] == nums[end - 1])
					{
						end--;
					}
					start++;
					end--;
				}
				else if (nums[i] + nums[start] + nums[end] > 0)
				{
					end--;
				}
				else
				{
					start++;
				}
			}
		}
		return result;

	}

	vector<vector<int>> fourSum(vector<int>& nums, int target) {
		std::sort(nums.begin(), nums.end());

		vector<vector<int>> result;

		for (int i = 0;i < nums.size() -3; i++) {
			if (i > 0 && nums[i] == nums[i - 1])
			{
				continue;
			}
			for (int j = i + 1; j < nums.size() - 2; j++)
			{
				if (j > i + 1 && nums[j] == nums[j - 1])
				{
					continue;
				}

				int start = j + 1, end = nums.size() - 1;
				while (start < end)
				{
					int tempT = target - nums[i] - nums[j];
					int tempSum = nums[start] + nums[end];
					if (tempSum == tempT)
					{
						result.push_back({ nums[i], nums[j], nums[start], nums[end] });
						while (start < end && nums[start] == nums[start + 1])
						{
							start++;
						}
						while (start < end && nums[end] == nums[end - 1])
						{
							end--;
						}
						start++;
						end--;
					}
					else if (tempSum > tempT)
					{
						end--;
					}
					else
					{
						start++;
					}
				}
			}
		}
		return result;
	}
}